import styled from "styled-components";
//import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Home() {
  const IMG = styled.img`
    max-width: 60%;
    height: auto;
    display: block;
    margin-left: auto;
    margin-right: auto;
  `;

  return (
    <>
      <Row type="horizontal">
        <IMG src="/WhiteLogo_noBackground.svg" alt="MAT" />
      </Row>
    </>
  );
}

export default Home;
