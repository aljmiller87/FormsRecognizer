import styled, { css } from "styled-components";
import { lighten, darken } from "polished";

const blue = "rgba(79,192,210,1)";
// const green = "rgba(82,210,154,1)";
// const yellow = "rgba(231,196,104,0.7)";
const orange = "rgba(235,118,85,1)";
// const darkBg = "rgba(0,0,0,0.9)";
const lightBg = "rgba(255,255,255,0.1)";
const text = "rgba(255,255,255,0.9)";

const row = css`
  box-sizing: content-box !important;
  padding: 20px 0;
  height: 30px;
  font-size: 0;
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease-out;
  /* border-top: 1px solid darken(${lightBg}, 100%); */
  ul {
    margin: 0;
    padding: 0;
    li {
      margin: 0;
      padding: 5px 10px;
      font-size: 16px;
      font-weight: normal;
      list-style: none;
      display: inline-block;
      width: 20%;
      box-sizing: border-box;
      @media only screen and (max-width: 767px) and (min-width: 480px) {
        font-size: 13px;
      }
      @media only screen and (max-width: 479px) {
        font-size: 13px;
      }
    }
  }
`;

const title = css`
  height: 45px;
  font-size: 0;
  border-left: 3px solid ${lighten(0.2, lightBg)};
  ul {
    li {
      padding: 15px 13px;
    }
  }
`;

export const Highlight = styled.span``;

export const Wrapper = styled.section`
  box-sizing: content-box !important;
  width: 100%;
  max-width: 100%;
  margin: 20px auto 0 auto;
  padding: 0;
  color: ${text};
  overflow: hidden;
  position: relative;
  a {
    text-decoration: none;
    transition: color 0.2s ease-out;
  }
`;

export const Row = styled.div`
  ${row}
  border-left: 3px solid ${darken(0.2, blue)};
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
   background: #1e1e2f;
   border-left: 3px solid ${blue};
  }

  ${Highlight} {
   color: ${blue};
  }

  &.isNotAnalyzed {
   border-left: 3px solid ${darken(0.2, orange)};
   &:hover {
    border-left: 3px solid ${orange};
   }
   ${Highlight} {
   color: ${orange};
  }
  }
`;

export const TableHeader = styled.div`
  ${row}
  ${title}
`;
