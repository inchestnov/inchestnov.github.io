import { jsPDF } from 'jspdf';
import type { ResumeContent, Language, ExperienceJob, ContactInfo } from '../types';
import { formatJobDuration } from './jobDuration';
import { ptSansRegularBase64 } from '../assets/fonts/ptSansRegularBase64';
import { ptSansBoldBase64 } from '../assets/fonts/ptSansBoldBase64';
import photo from '../assets/photo.jpeg';
import { iconMarkup } from '../icons/iconMarkup';

/**
 * Builds a from-scratch PDF (vector text, not a screenshot/print of the DOM)
 * covering the resume's substance — photo, contacts, about, experience/
 * education, tech stack — while intentionally dropping presentation-only
 * elements that don't translate to a static document (the marquee
 * animation, sticky top bar, etc.).
 *
 * Uses PT Sans (OFL, embedded as base64 — see src/assets/fonts) instead of
 * jsPDF's built-in Helvetica/Times/Courier: those standard-14 fonts only
 * cover WinAnsi/Latin-1, so Cyrillic text would render as blank boxes. The
 * font bytes are embedded directly in the JS bundle rather than fetched at
 * render time because the shipped dist/index.html must open via file://,
 * where fetch() of a local file is blocked by the browser.
 */

const FONT_NAME = 'PTSans';
const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 15;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

const COLOR_TEXT: [number, number, number] = [26, 30, 38];
const COLOR_MUTED: [number, number, number] = [100, 107, 120];
const COLOR_ACCENT: [number, number, number] = [37, 99, 199];
const COLOR_RULE: [number, number, number] = [210, 214, 220];

const AVATAR_SIZE = 22;

interface Cursor {
  y: number;
}

function registerFonts(doc: jsPDF): void {
  doc.addFileToVFS('PTSans-Regular.ttf', ptSansRegularBase64);
  doc.addFont('PTSans-Regular.ttf', FONT_NAME, 'normal');
  doc.addFileToVFS('PTSans-Bold.ttf', ptSansBoldBase64);
  doc.addFont('PTSans-Bold.ttf', FONT_NAME, 'bold');
}

/**
 * Rasterizes the same photo the live site uses onto an offscreen canvas —
 * cropped to a circle and scaled/centered like CSS `object-fit: cover`, to
 * match the site's circular `.hero-avatar-wrapper` — so it can be embedded
 * in the PDF via jsPDF's addImage. Vite inlines this file as a data: URI at
 * build time (small enough to be under its default inlining threshold), so
 * loading it here is not a network/file fetch that would break under the
 * shipped dist/index.html's file:// usage.
 */
function loadAvatarPngDataUrl(): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const resolution = 400;
      const canvas = document.createElement('canvas');
      canvas.width = resolution;
      canvas.height = resolution;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas 2D context unavailable'));
        return;
      }

      ctx.beginPath();
      ctx.arc(resolution / 2, resolution / 2, resolution / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      // 1.2x beyond a plain "cover" fit — zooms in toward the center so the
      // subject isn't dwarfed by the wide landscape shot's background.
      const scale = Math.max(resolution / image.naturalWidth, resolution / image.naturalHeight) * 1.2;
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      ctx.drawImage(image, (resolution - drawWidth) / 2, (resolution - drawHeight) / 2, drawWidth, drawHeight);

      resolve(canvas.toDataURL('image/png'));
    };
    image.onerror = () => reject(new Error('Failed to load avatar image'));
    image.src = photo;
  });
}

const ACCENT_HEX = '#2563c7';

/**
 * Rasterizes one of the site's existing inline-SVG glyphs (from
 * iconMarkup.ts) to a small PNG so it can sit next to a contact link.
 * jsPDF has no SVG renderer, so — same trick as the avatar photo — this
 * draws the markup via an offscreen `<img>` + `<canvas>` rather than
 * hand-translating path data into jsPDF's own drawing API. `currentColor`
 * is substituted for a literal hex first, since a standalone rasterized
 * image has no surrounding CSS `color` to inherit from. An explicit
 * `xmlns` is also injected — iconMarkup's strings omit it since they're
 * normally inlined into the HTML document via dangerouslySetInnerHTML
 * (where the HTML parser doesn't require it), but a standalone
 * `data:image/svg+xml` document is parsed as XML and silently fails to
 * load (a bare `img.onerror`, no useful message) without it.
 */
function loadIconPngDataUrl(iconId: keyof typeof iconMarkup): Promise<string> {
  return new Promise((resolve, reject) => {
    const coloredMarkup = iconMarkup[iconId]
      .replace(/currentColor/g, ACCENT_HEX)
      .replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
    const image = new Image();
    image.onload = () => {
      const resolution = 64;
      const canvas = document.createElement('canvas');
      canvas.width = resolution;
      canvas.height = resolution;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas 2D context unavailable'));
        return;
      }
      ctx.drawImage(image, 0, 0, resolution, resolution);
      resolve(canvas.toDataURL('image/png'));
    };
    image.onerror = () => reject(new Error(`Failed to load icon: ${iconId}`));
    image.src = `data:image/svg+xml;base64,${btoa(coloredMarkup)}`;
  });
}

function ensureSpace(doc: jsPDF, cursor: Cursor, needed: number): void {
  if (cursor.y + needed > PAGE_HEIGHT - MARGIN) {
    doc.addPage();
    cursor.y = MARGIN;
  }
}

function writeHeading(doc: jsPDF, cursor: Cursor, text: string): void {
  // Reserve room for the heading itself plus its first line of content, so
  // a heading never ends up as a "widow" alone at the bottom of a page.
  ensureSpace(doc, cursor, 20);
  cursor.y += 2;
  doc.setFont(FONT_NAME, 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...COLOR_ACCENT);
  doc.text(text.toUpperCase(), MARGIN, cursor.y);
  cursor.y += 2;
  doc.setDrawColor(...COLOR_RULE);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, cursor.y, PAGE_WIDTH - MARGIN, cursor.y);
  cursor.y += 3.8;
}

function writeParagraph(
  doc: jsPDF,
  cursor: Cursor,
  text: string,
  options: { size?: number; bold?: boolean; color?: [number, number, number]; indent?: number; lineHeight?: number } = {}
): void {
  const size = options.size ?? 9.5;
  const color = options.color ?? COLOR_TEXT;
  const indent = options.indent ?? 0;
  const lineHeight = options.lineHeight ?? size * 0.42;

  doc.setFont(FONT_NAME, options.bold ? 'bold' : 'normal');
  doc.setFontSize(size);
  doc.setTextColor(...color);

  const lines = doc.splitTextToSize(text, CONTENT_WIDTH - indent) as string[];
  for (const line of lines) {
    ensureSpace(doc, cursor, lineHeight);
    doc.text(line, MARGIN + indent, cursor.y);
    cursor.y += lineHeight;
  }
}

function writeBullets(doc: jsPDF, cursor: Cursor, points: string[]): void {
  const size = 9.2;
  const lineHeight = 3.85;
  const indent = 4;
  doc.setFont(FONT_NAME, 'normal');
  doc.setFontSize(size);
  doc.setTextColor(...COLOR_TEXT);

  for (const point of points) {
    const lines = doc.splitTextToSize(point, CONTENT_WIDTH - indent) as string[];
    lines.forEach((line, index) => {
      ensureSpace(doc, cursor, lineHeight);
      if (index === 0) {
        doc.text('•', MARGIN, cursor.y);
      }
      doc.text(line, MARGIN + indent, cursor.y);
      cursor.y += lineHeight;
    });
  }
}

/**
 * Measures every entry's period string at the font/size writeEntry renders
 * it in, and returns the x position that right-aligns only the widest one
 * against the page margin — every other (shorter) period is drawn starting
 * at that same x instead of being individually right-aligned. This keeps
 * the whole date column sharing one left edge (same trick as
 * writeContactsColumn's right-aligned-as-a-block link list) instead of a
 * ragged left edge where each period starts wherever its own width happens
 * to land it.
 */
function computePeriodColumnX(doc: jsPDF, periods: string[]): number {
  doc.setFont(FONT_NAME, 'normal');
  doc.setFontSize(9);
  const maxWidth = Math.max(...periods.map((period) => doc.getTextWidth(period)));
  return PAGE_WIDTH - MARGIN - maxWidth;
}

function writeEntry(
  doc: jsPDF,
  cursor: Cursor,
  entry: { heading: string; subheading: string; period: string; points: string[]; technologiesLine?: string },
  periodX: number
): void {
  // Reserve room for the heading/period/role rows plus at least one bullet,
  // so the entry's heading never gets stranded alone at the page bottom.
  ensureSpace(doc, cursor, 18);
  doc.setFont(FONT_NAME, 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...COLOR_TEXT);
  doc.text(entry.heading, MARGIN, cursor.y);

  doc.setFont(FONT_NAME, 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...COLOR_MUTED);
  doc.text(entry.period, periodX, cursor.y);
  cursor.y += 4.2;

  doc.setFont(FONT_NAME, 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...COLOR_ACCENT);
  doc.text(entry.subheading, MARGIN, cursor.y);
  cursor.y += 4.4;

  writeBullets(doc, cursor, entry.points);

  if (entry.technologiesLine) {
    cursor.y += 0.8;
    writeParagraph(doc, cursor, entry.technologiesLine, { size: 8.3, color: COLOR_MUTED, lineHeight: 3.6 });
  }

  cursor.y += 2.4;
}

function jobToEntry(job: ExperienceJob, language: Language) {
  const duration = formatJobDuration(job.startDate, job.endDate, language);
  return {
    heading: job.company,
    subheading: job.role,
    period: duration ? `${job.period} (${duration})` : job.period,
    points: job.points,
    technologiesLine: job.technologies.length > 0 ? job.technologies.map((tech) => tech.name).join(' • ') : undefined
  };
}

/** Strips the scheme/www./trailing-slash noise so the link reads as a plain,
 *  typeable URL (e.g. "linkedin.com/in/inchestnov") — someone reading a
 *  printed copy without a clickable link shouldn't have to guess or type
 *  "https://www." by hand. */
function formatDisplayUrl(href: string): string {
  return href
    .replace(/^mailto:/, '')
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '');
}

type ContactIconId = 'website' | 'telegram' | 'linkedin' | 'github' | 'email';

/** Renders each contact on its own line, at the photo's vertical level. The
 *  whole block (icon + text) sits flush against the page's right margin,
 *  but the lines themselves are left-aligned to each other (against the
 *  block's own left edge, sized to the widest line) rather than
 *  right-aligned individually — a ragged-right block would leave every
 *  short line's start floating. Each link is underlined to read clearly as
 *  a link, with its brand/website icon to the left. Returns the y position
 *  just below the last line. */
function writeContactsColumn(
  doc: jsPDF,
  y: number,
  content: ResumeContent,
  icons: Partial<Record<ContactIconId, string>>
): number {
  const siteContact: ContactInfo = {
    label: 'Site',
    value: 'inchestnov.github.io',
    href: 'https://inchestnov.github.io'
  };
  const rows: { contact: ContactInfo; iconId?: ContactIconId }[] = [
    { contact: siteContact, iconId: 'website' },
    { contact: content.hero.contacts.telegram, iconId: 'telegram' },
    { contact: content.hero.contacts.linkedin, iconId: 'linkedin' },
    { contact: content.hero.contacts.github, iconId: 'github' },
    { contact: content.hero.contacts.email, iconId: 'email' }
  ];
  const lineHeight = 4.5;
  const fontSize = 9;
  const iconSize = 3.2;
  const iconGap = 1.8;

  doc.setFont(FONT_NAME, 'normal');
  doc.setFontSize(fontSize);

  const labels = rows.map((row) => formatDisplayUrl(row.contact.href));
  const textBlockWidth = Math.max(...labels.map((label) => doc.getTextWidth(label)));
  const textX = PAGE_WIDTH - MARGIN - textBlockWidth;
  const iconX = textX - iconGap - iconSize;

  let lineY = y;
  rows.forEach((row, index) => {
    const label = labels[index] ?? '';
    const iconDataUrl = row.iconId ? icons[row.iconId] : undefined;
    if (iconDataUrl) {
      doc.addImage(iconDataUrl, 'PNG', iconX, lineY - 2.9, iconSize, iconSize);
    }
    doc.setTextColor(...COLOR_ACCENT);
    doc.textWithLink(label, textX, lineY, { url: row.contact.href });
    doc.setDrawColor(...COLOR_ACCENT);
    doc.setLineWidth(0.2);
    doc.line(textX, lineY + 0.8, textX + doc.getTextWidth(label), lineY + 0.8);
    lineY += lineHeight;
  });

  return lineY;
}

/**
 * Renders the tech stack as a table (formally — one column per roadmap
 * category, a header row of category names, each category's technologies
 * stacked as rows underneath) but without any drawn borders/dividers: just
 * the column layout itself, no ruled lines.
 */
function writeTechTable(doc: jsPDF, cursor: Cursor, content: ResumeContent): void {
  const groups = content.roadmap.groups;
  const columnCount = groups.length;
  const columnWidth = CONTENT_WIDTH / columnCount;
  const cellPadding = 3;
  const rowHeight = 4.0;
  const headerHeight = 6.2;

  const columnLines = groups.map((group) =>
    group.items.map((item) => doc.splitTextToSize(item.name, columnWidth - cellPadding * 2) as string[]).flat()
  );
  const bodyRowCount = Math.max(...columnLines.map((lines) => lines.length));
  const tableHeight = headerHeight + bodyRowCount * rowHeight;

  ensureSpace(doc, cursor, tableHeight + 2);
  const top = cursor.y;

  doc.setFont(FONT_NAME, 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...COLOR_ACCENT);
  groups.forEach((group, index) => {
    const x = MARGIN + index * columnWidth;
    doc.text(group.name, x + cellPadding, top + 5.5);
  });

  doc.setFont(FONT_NAME, 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...COLOR_TEXT);
  columnLines.forEach((lines, index) => {
    const x = MARGIN + index * columnWidth;
    lines.forEach((line, rowIndex) => {
      doc.text(line, x + cellPadding, top + headerHeight + rowIndex * rowHeight + 3.5);
    });
  });

  cursor.y = top + tableHeight + 3.5;
}

export async function generateResumePdf(content: ResumeContent, language: Language): Promise<jsPDF> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  // Sets the PDF's own /Title metadata — without this, a PDF viewer's
  // "Save As" dialog has nothing sensible to suggest and falls back to a
  // random-looking name, regardless of what the wrapper page/tab is titled.
  doc.setProperties({ title: content.pdfExport.documentTitle });
  registerFonts(doc);
  doc.setFont(FONT_NAME, 'normal');

  const cursor: Cursor = { y: MARGIN };

  try {
    const avatarDataUrl = await loadAvatarPngDataUrl();
    doc.addImage(avatarDataUrl, 'PNG', MARGIN, cursor.y - 2, AVATAR_SIZE, AVATAR_SIZE);
  } catch {
    // Falls back to a text-only header if the avatar can't be rasterized
    // (e.g. an exotic browser without canvas support) — non-fatal.
  }

  const textX = MARGIN + AVATAR_SIZE + 6;
  doc.setFont(FONT_NAME, 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...COLOR_TEXT);
  doc.text(content.hero.name, textX, cursor.y + 5.5);

  doc.setFont(FONT_NAME, 'normal');
  doc.setFontSize(11);
  doc.setTextColor(...COLOR_ACCENT);
  doc.text(content.hero.role, textX, cursor.y + 11.5);

  // Contacts are stacked one per line against the page's right edge, at the
  // photo's vertical level, rather than a single joined line below the name.
  const contactIconIds: ContactIconId[] = ['website', 'telegram', 'linkedin', 'github', 'email'];
  const contactIconEntries = await Promise.all(
    contactIconIds.map(async (id) => [id, await loadIconPngDataUrl(id).catch(() => undefined)] as const)
  );
  const contactIcons = Object.fromEntries(contactIconEntries.filter(([, url]) => url !== undefined)) as Partial<
    Record<ContactIconId, string>
  >;
  const contactsBottom = writeContactsColumn(doc, cursor.y + 2, content, contactIcons);
  cursor.y = Math.max(cursor.y + AVATAR_SIZE + 2, contactsBottom) + 4;

  for (const paragraph of content.about.paragraphs) {
    writeParagraph(doc, cursor, paragraph, { size: 9.2, color: COLOR_TEXT, lineHeight: 4.0 });
    cursor.y += 1.2;
  }
  cursor.y += 0.5;

  const jobEntries = content.experience.jobs.map((job) => jobToEntry(job, language));
  const education = content.education;
  // Shared across both the experience and education entries so the date
  // column reads as one continuous alignment down the whole page, not just
  // within the experience section.
  const periodColumnX = computePeriodColumnX(doc, [...jobEntries.map((entry) => entry.period), education.period]);

  writeHeading(doc, cursor, content.experience.title);
  for (const entry of jobEntries) {
    writeEntry(doc, cursor, entry, periodColumnX);
  }

  writeHeading(doc, cursor, education.dividerLabel);
  writeEntry(
    doc,
    cursor,
    {
      heading: education.institution,
      subheading: education.degree,
      period: education.period,
      points: education.description
    },
    periodColumnX
  );

  writeHeading(doc, cursor, content.roadmap.title);
  writeTechTable(doc, cursor, content);

  const copyrightText = content.footer.copyrightText.replace('{year}', String(new Date().getFullYear()));
  doc.setFont(FONT_NAME, 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...COLOR_MUTED);
  doc.text(copyrightText, PAGE_WIDTH / 2, PAGE_HEIGHT - 10, { align: 'center' });

  return doc;
}
