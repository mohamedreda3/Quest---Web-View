async function loadPDF({ PSPDFKit, container, document }) {
	const instance = await PSPDFKit.load({
		// Container where PSPDFKit should be mounted.
		container,
		// The document to open.
		document,
		// Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
		baseUrl: `${window.location.protocol}//${window.location.host}/book`,
	});
	return instance;
}
export { loadPDF }; // Export this method so you can use it in your project.