import type { Language } from '../types';

function monthIndex(isoYearMonth: string): number {
  const parts = isoYearMonth.split('-');
  const year = Number(parts[0]);
  const month = Number(parts[1]);
  return year * 12 + (month - 1);
}

function currentMonthIndex(): number {
  const now = new Date();
  return now.getFullYear() * 12 + now.getMonth();
}

function pluralizeRu(count: number, one: string, few: string, many: string): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}

function formatRu(years: number, months: number): string {
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${pluralizeRu(years, 'год', 'года', 'лет')}`);
  if (months > 0) parts.push(`${months} ${pluralizeRu(months, 'месяц', 'месяца', 'месяцев')}`);
  return parts.join(' ');
}

function formatEn(years: number, months: number): string {
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? 'month' : 'months'}`);
  return parts.join(' ');
}

/** Formats the tenure between startDate and endDate (or now, if ongoing) as whole years/months. */
export function formatJobDuration(startDate: string, endDate: string | null, language: Language): string {
  const start = monthIndex(startDate);
  const end = endDate ? monthIndex(endDate) : currentMonthIndex();
  const totalMonths = Math.max(0, end - start);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  return language === 'en' ? formatEn(years, months) : formatRu(years, months);
}
