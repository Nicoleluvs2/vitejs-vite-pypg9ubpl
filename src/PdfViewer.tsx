import React from 'react';

type PdfViewerProps = {
  file: string;
};

const PdfViewer: React.FC<PdfViewerProps> = ({ file }) => {
  return (
    <div style={{ border: '1px solid black', padding: '5px', margin: '5px 0' }}>
      <p>PDF Viewer Placeholder</p>
      <p>File: {file}</p>
      {/* Later: Integrate pdf.js for actual PDF rendering */}
    </div>
  );
};

export default PdfViewer;
