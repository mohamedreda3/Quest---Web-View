import { useEffect, useRef } from 'react';
import { loadPDF } from './helper.js'; // Import the `loadPDF` function.
function PDFViewer(props) {
	const containerRef = useRef(null); // Will serve as your container to render the document.
	useEffect(() => {
		let PSPDFKit;
		const container = containerRef.current;
		(async function () {
			PSPDFKit = await import('pspdfkit');

			PSPDFKit.unload(container); // Ensure that there's only one PSPDFKit instance.

			const instance = await loadPDF({
				// Invoke the `loadPDF` function.
				PSPDFKit,
				container,
				document: props.document, //get the document location from the prop.
			});
		})();
		// When the user closes the app, remove the PDF from RAM.
		// This prevents memory leaks.
		return () => PSPDFKit && PSPDFKit.unload(container);
	}, []);
	// Your PDF will be rendered within this PDF.
	return (
		<div
			ref={containerRef}
			style={{ width: '100%', height: '100vh' }}
		/>
	);
}
export default PDFViewer;