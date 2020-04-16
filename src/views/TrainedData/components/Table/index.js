import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Wrapper, Row, TableHeader, Highlight } from "./styles";

import { InvoiceStore } from "../../../../context/invoices";
const index = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { state } = useContext(InvoiceStore);

  return (
    <Wrapper>
      {/* <!-- Row title --> */}
      <TableHeader>
        <ul>
          <li>Name</li>
          <li>Status</li>
        </ul>
      </TableHeader>

      {state.invoices.map((invoice, index) => {
        const name = invoice.name.toLocaleUpperCase();
        return (
          <Row
            key={`${invoice.name}${index}`}
            className={invoice.status === 2 ? "" : "isNotAnalyzed"}
          >
            <Link to={`/admin/invoices/${invoice.name}`}>
              <ul>
                <li>
                  <Highlight>{name}</Highlight>
                </li>
                <li>{state.invoiceStatus[invoice.status].name}</li>
                <li>Click to view</li>
              </ul>
            </Link>
          </Row>
        );
      })}
    </Wrapper>
  );
};

export default index;
