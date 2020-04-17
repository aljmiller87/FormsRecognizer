export const fetchInvoiceIndexByName = (invoicesArr, invoiceName) => {
  if (!invoicesArr || !invoicesArr.length) {
    return {};
  }
  const foundIndex = invoicesArr.findIndex(
    (invoice) => invoice.name === invoiceName
  );
  const foundInvoice = invoicesArr[foundIndex];
  return { foundInvoice, foundIndex };
};

export const isResponseValid = (resp) => {
  return (
    typeof resp === "object" &&
    resp.status &&
    resp.status === 200 &&
    resp.data &&
    resp.data.status
  );
};
