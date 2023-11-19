import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  return (
    <StyledLogo onClick={() => navigate("/")}>
      {isDarkMode ? (
        <Img src="/WhiteLogo_noBackground.svg" alt="Logo" />
      ) : (
        <Img src="/ColorLogo_noBackground.svg" alt="Logo" />
      )}
    </StyledLogo>
  );
}

export default Logo;
