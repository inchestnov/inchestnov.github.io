import { useEffect } from 'react';

interface PdfPreviewModalProps {
  dataUri: string;
  fileName: string;
  downloadLabel: string;
  onClose: () => void;
}

export function PdfPreviewModal({ dataUri, fileName, downloadLabel, onClose }: PdfPreviewModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="pdf-preview-backdrop" onClick={onClose}>
      <div className="pdf-preview-panel" onClick={(event) => event.stopPropagation()}>
        <div className="pdf-preview-header">
          <span className="pdf-preview-filename">{fileName}</span>
          <div className="pdf-preview-actions">
            {/* The `download` attribute guarantees this exact file name is
                used, regardless of how the browser's own embedded PDF
                viewer names things when saved via its own toolbar. */}
            <a className="pdf-preview-download" href={dataUri} download={fileName}>
              {downloadLabel}
            </a>
            <button type="button" className="pdf-preview-close" onClick={onClose} aria-label="Close">
              ✕
            </button>
          </div>
        </div>
        <iframe className="pdf-preview-frame" src={dataUri} title={fileName} />
      </div>
    </div>
  );
}
