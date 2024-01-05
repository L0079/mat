import styled from "styled-components";

function Home() {
  const Container = styled.div`
    display: flex;
    justify-content: center;
  `;
  const ImageContainer = styled.div`
    max-width: 43%;
    height: auto;
  `;
  const IMG = styled.img`
    height: auto;
    display: block;
    margin-left: auto;
    margin-right: auto;
  `;

  return (
    <Container>
      <ImageContainer>
        <IMG src="/WhiteLogo_noBackground.svg" alt="MAT" />
      </ImageContainer>
    </Container>
  );
}

export default Home;
