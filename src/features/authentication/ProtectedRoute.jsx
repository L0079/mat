//import { getCurrentUser } from "../../services/apiAuth";
import PropTypes from "prop-types";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useGetCurrentUser } from "./useGetUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated } = useGetCurrentUser();
  const navigate = useNavigate();
  useEffect(
    function () {
      //      console.log("ProtectedRoute", isLoading, isAuthenticated);
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthenticated) return children;
}

ProtectedRoute.propTypes = { children: PropTypes.any };
export default ProtectedRoute;
