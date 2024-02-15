'use client'
import React from 'react'
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';


const pdfViewer = ({fileName,pageNumber}) => {
    return (
        <>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer fileUrl={`/documents/${fileName}`} initialPage={pageNumber-1} />;
            </Worker>
        </>
    )
}

export default pdfViewer