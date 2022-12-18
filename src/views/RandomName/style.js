import { Button } from "antd";
import styled from "styled-components";

const ResultBox = styled.div`
  min-width: 180px;
  min-height: 48px;
  padding: 2px;
  box-sizing: border-box;
  background-color: #aef062;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

const HoverButton = styled(Button)`
  :hover::after {
    position: absolute;
    left: 50px;
    top: -40px;
    padding: 5px;
    background-color: #0095ff;
    border-radius: 5px;
    color: #fff;
    content: attr(title);
    z-index: 2;
    width: 120px;
  }
`;

export { HoverButton, ResultBox };
