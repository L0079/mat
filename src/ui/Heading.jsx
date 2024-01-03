import styled, { css } from "styled-components";

// se come property si usa "as" viene passato anche l'elemento html da utilizzare. Ovvero quelli sotto riportati risulteranno essere rispettivamente <h1>, <h2> ed <h3>
const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      line-height: 1.4;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
      line-height: 1.2;
    `}

    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
      line-height: 1;
    `}


    ${(props) =>
    props.type === "tableHeader" &&
    css`
      margin-top: 30px;
    `}
`;

export default Heading;
