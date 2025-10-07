async function loadPDF({ PSPDFKit, container, document }) {
	const instance = await PSPDFKit.load({
		// Container where PSPDFKit should be mounted.
		container,
		// The document to open.
		document,
		// Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
		baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
	});
	return instance;
}

async function createTextAnnotation({ PSPDFKit, instance }) {
	const annotation = new PSPDFKit.Annotations.TextAnnotation({
		pageIndex: 0, // Which page number should have this annotation.
		text: {
			format: 'plain',
			value: 'Welcome to\nPSPDFKit',
		}, // Text to embed.
		font: 'Helvetica',
		isBold: true,
		horizontalAlign: 'center', // Align your annotation to the center of the box.
		boundingBox: new PSPDFKit.Geometry.Rect({
			// Position of this annotation.
			left: 50,
			top: 200,
			width: 100,
			height: 80,
		}),
        
		fontColor: PSPDFKit.Color.GREEN, // color of the text
	});

	// Attach this annotation to your PDF:
	const createdAnnotation = await instance.create(annotation);
	return createdAnnotation;
}
export { createTextAnnotation, loadPDF }; // Finally, export this function.