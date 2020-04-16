export const invoiceStatus = [
  {
    slug: "readyToSend",
    name: "Data Trained",
    description: "Ready to Submit to MS Forms Recognizer for Analysis",
  },
  {
    slug: "submitted",
    name: "Submitted for Analysis",
    description:
      "Forms Recognizer confirmed successful submission. Analyzing Invoice",
  },
  {
    slug: "resultsReady",
    name: "Results Ready",
    description: "Results ready.",
  },
];

export const invoices = [
  {
    name: "receipt1",
    url:
      "https://alexformsrecognizer.blob.core.windows.net/alexformscontainer/receipt1.jpg",
    status: 0,
    analysis: {
      apiKey: "",
      data: {},
    },
  },
  {
    name: "receipt2",
    url:
      "https://alexformsrecognizer.blob.core.windows.net/alexformscontainer/receipt2.jpg",
    status: 0,
    analysis: {
      apiKey: "",
      data: {},
    },
  },
  {
    name: "receipt3",
    url:
      "https://alexformsrecognizer.blob.core.windows.net/alexformscontainer/receipt3.png",
    status: 0,
    analysis: {
      apiKey: "",
      data: {},
    },
  },
  {
    name: "receipt4",
    url:
      "https://alexformsrecognizer.blob.core.windows.net/alexformscontainer/receipt4.jpg",
    status: 0,
    analysis: {
      apiKey: "",
      data: {},
    },
  },
  {
    name: "fake receipt",
    url:
      "https://alexformsrecognizer.blob.core.windows.net/alexformscontainer/receiptfake.jpg",
    status: 0,
    analysis: {
      apiKey: "",
      data: {},
    },
  },
];
