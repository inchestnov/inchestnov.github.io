import { useCallback, useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { generateResumePdf } from '../../utils/generateResumePdf';
import { Icon } from '../Icon';
import { PdfPreviewModal } from './PdfPreviewModal';

interface PdfPreview {
  dataUri: string;
  fileName: string;
}

export function PdfExportButton() {
  const { content, language } = useLanguage();
  const [preview, setPreview] = useState<PdfPreview | null>(null);

  const handleClick = useCallback(() => {
    generateResumePdf(content, language).then((doc) => {
      const dataUri = doc.output('datauristring', { filename: content.pdfExport.fileName });
      setPreview({ dataUri, fileName: content.pdfExport.fileName });
    });
  }, [content, language]);

  return (
    <>
      <button type="button" className="pdf-export-button" onClick={handleClick}>
        <Icon id="pdf-file" className="pdf-export-icon" />
        <span>{content.pdfExport.buttonLabel}</span>
      </button>
      {preview && (
        <PdfPreviewModal
          dataUri={preview.dataUri}
          fileName={preview.fileName}
          downloadLabel={content.pdfExport.downloadLabel}
          onClose={() => setPreview(null)}
        />
      )}
    </>
  );
}
