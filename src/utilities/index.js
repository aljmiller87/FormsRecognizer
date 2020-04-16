import axios from "axios";

const getKey = (str) => {
  const stringSections = str.split("/");
  return stringSections[stringSections.length - 1];
};

export const analyzeInvoice = (invoice) => {
  console.log(
    "process.env.REACT_APP_AZURE_SAS",
    process.env.REACT_APP_AZURE_SAS
  );
  return axios({
    method: "post",
    url:
      "https://alex-miller-form-recognizer-resource.cognitiveservices.azure.com/formrecognizer/v2.0-preview/prebuilt/receipt/analyze",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key":
        process.env.REACT_APP_OCP_APIM_SUBSCRIPTION_KEY,
    },
    data: {
      url: `${invoice.url + process.env.REACT_APP_AZURE_SAS}`,
    },
  })
    .then(function (response) {
      if (response.status === 202) {
        const headerResponse = response.headers["operation-location"];
        const formsRecognizerKey = getKey(headerResponse);
        invoice.analysis.apiKey = formsRecognizerKey;
        invoice.status = invoice.status + 1;
        return invoice;
      }
    })
    .catch(function (error) {
      console.warn("Caught Error:", error.message);
      const exception = `Error: ${error.message}`;
      return exception;
    });
};

export const fetchInvoiceResults = (invoice) => {
  console.log("getting here", invoice.analysis.apiKey);
  const key = invoice.analysis.apiKey;
  return axios({
    method: "get",
    url: `https://alex-miller-form-recognizer-resource.cognitiveservices.azure.com/formrecognizer/v2.0-preview/prebuilt/receipt/analyzeResults/${key}`,
    headers: {
      "Ocp-Apim-Subscription-Key": "e696e165fcfc4a3d9e2d8c5379bcf5d3",
    },
  }).catch(function (error) {
    console.warn("Caught Error:", error.message);
    const exception = `Error: ${error.message}`;
    return exception;
  });
};
