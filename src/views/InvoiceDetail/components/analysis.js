/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import classnames from "classnames";
import { get } from "lodash";
import { InvoiceDetailStore } from "../context/InvoiceDetail";

import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { CircularProgress } from "@material-ui/core";

import Fields from "./Fields";
import PhysicalDetails from "./Cards/PhysicalDetails";
import TotalConfidence from "./Cards/TotalConfidence";
import DocType from "./Cards/DocType";

const analysisComponent = () => {
  const { invoiceState, invoiceDispatch } = useContext(InvoiceDetailStore);
  const { invoice } = invoiceState;

  // Sanity Check
  if (!invoice) {
    return null;
  }
  const { analysis } = invoice;
  const [activeTab, setActiveTab] = useState("1");
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [analysisData, setAnalysisData] = useState(false);
  let data = get(invoice, "analysis.data", false);
  if (data !== analysisData) {
    setAnalysisData(data);
  }

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const getCreationTime = () => {
    if (!isDataLoaded) {
      return "";
    }

    return analysis.data.createdDateTime;
  };

  const getUpdatedTime = () => {
    if (!isDataLoaded) {
      return "";
    }

    return analysis.data.lastUpdatedDateTime;
  };

  useEffect(() => {
    if (
      invoice.analysis &&
      invoice.analysis.data &&
      invoice.analysis.data.status
    ) {
      setDataLoaded(true);
    }
  }, [invoice]);

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === "1",
            })}
            onClick={() => {
              toggle("1");
            }}
          >
            Data
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === "2",
            })}
            onClick={() => {
              toggle("2");
            }}
          >
            Raw Data
          </NavLink>
        </NavItem>
      </Nav>
      <Row>
        <Col sm="4">
          <Card body>
            {isDataLoaded && analysis.data.status !== "succeeded" && (
              <ProgressWrapper>
                <CircularProgress />
              </ProgressWrapper>
            )}
            <CardTitle>Status From MS Forms Recognizer</CardTitle>
            <CardText tag="h4">
              {isDataLoaded && analysis.data.status ? analysis.data.status : ""}
            </CardText>
          </Card>
        </Col>
        <Col sm="4">
          <Card body>
            <CardTitle>Creation Time</CardTitle>
            <CardText tag="h4">{getCreationTime()}</CardText>
          </Card>
        </Col>
        <Col sm="4">
          <Card body>
            <CardTitle>Last Updated</CardTitle>
            <CardText tag="h4">{getUpdatedTime()}</CardText>
          </Card>
        </Col>
      </Row>
      {analysisData &&
        analysisData.status &&
        analysisData.status === "succeeded" && (
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <TotalConfidence />
                <PhysicalDetails />
                <DocType />
              </Row>
              <Row>
                <Fields />
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <Card>
                    <CardTitle>Card Data</CardTitle>
                    <CardBody>
                      <CardText>
                        {JSON.stringify(invoice.analysis.data, undefined, 4)}
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        )}
    </div>
  );
};

export const ProgressWrapper = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
`;

export default analysisComponent;
