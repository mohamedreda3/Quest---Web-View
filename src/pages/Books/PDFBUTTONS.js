export const PDFButtons = [
    {
        "type": "sidebar-thumbnails"
    },
    {
        "type": "sidebar-document-outline"
    },
    {
        "type": "sidebar-annotations"
    },
    {
        "type": "sidebar-bookmarks"
    },
    {
        "type": "sidebar-signatures"
    },
    {
        "type": "sidebar-layers"
    },
    {
        "type": "pager"
    },
    {
        "type": "multi-annotations-selection"
    },
    {
        "type": "pan"
    },
    {
        "type": "zoom-out"
    },
    {
        "type": "zoom-in"
    },
    {
        "type": "zoom-mode"
    },
    {
        "type": "spacer"
    },
    {
        "type": "annotate"
    },
    {
        "type": "ink"
    },
    {
        "type": "highlighter"
    },
    {
        "type": "text-highlighter"
    },
    {
        "type": "ink-eraser"
    },
    {
        "type": "signature"
    },
    {
        "type": "image"
    },
    {
        "type": "stamp"
    },
    {
        "type": "note"
    },
    {
        "type": "text"
    },
    {
        "type": "callout"
    },
    {
        "type": "line"
    },
    {
        "type": "link"
    },
    {
        "type": "arrow"
    },
    {
        "type": "rectangle"
    },
    {
        "type": "ellipse"
    },
    {
        "type": "polygon"
    },
    {
        "type": "cloudy-polygon"
    },
    {
        "type": "polyline"
    },
    {
        "type": "document-editor"
    },
    {
        "type": "document-crop"
    },
    {
        "type": "search"
    },
    {
        "type": "export-pdf"
    },
    {
        "type": "debug"
    }
].filter(item => item?.type != "print" && item?.type != "export-pdf")