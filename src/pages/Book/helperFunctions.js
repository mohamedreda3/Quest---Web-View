import { URIAction } from "pspdfkit";

async function loadPDF({ PSPDFKit, container, document, s, XFDF }) {
  const instance = await PSPDFKit.load({
    // autoSaveMode: PSPDFKit.AutoSaveMode.INTELLIGENT,

    XFDF: XFDF,
    // Container where PSPDFKit should be mounted.
    // licenseKey:
    //   "hjCG4Oy9Go9L4b6QSdXOSExoHGjzpmK9PKPiE_HNXgIGUr_aVPajD5BhL7lpsNpPaKSktjADGHnhwk6a7KDSBOl4YKw1AS6mDyhbyUOJDjYtdWrfx2qjjNn2G9pho1sfOG6PKntRJO5tIBCKSOpiek6k3dzdHSfHFvlPAa5d4jJ-UpHyNfTzVtM70fvoZ0HwriWHHEJXEcDa4Ie9",
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
      format: "plain",
      value: "Welcome to\nPSPDFKit",
    }, // Text to embed.
    font: "Helvetica",
    isBold: true,
    horizontalAlign: "center", // Align your annotation to the center of the box.
    boundingBox: new PSPDFKit.Geometry.Rect({
      // Position of this annotation.
      left: 50,
      top: 200,
      width: 100,
      height: 80,
    }),
    // fontColor: PSPDFKit.Color.GREEN, // color of the text
  });

  // Attach this annotation to your PDF:
  const createdAnnotation = await instance.create(annotation);
  const [savedAnnotation] = await instance.ensureChangesSaved(
    createdAnnotation
  );
  return createdAnnotation;
}

async function createSoundAnnotation({ PSPDFKit, instance, voiceNoteUrl }) {
  const soundAnnotation = new PSPDFKit.Annotations.SoundAnnotation({
    pageIndex: 0,
    boundingBox: new PSPDFKit.Geometry.Rect({
      left: 50,
      top: 300,
      width: 100,
      height: 80,
    }),
    // URL to the voice note file
    url: voiceNoteUrl,
    // Optional: specify the icon type
    icon: "Speaker",
  });

  // Attach the sound annotation to your PDF:
  const createdSoundAnnotation = await instance.create(soundAnnotation);
  return createdSoundAnnotation;
}

// Export functions
export { createTextAnnotation, createSoundAnnotation, loadPDF };
