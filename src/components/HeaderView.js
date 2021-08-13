import { Header } from "antd/lib/layout/layout";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderView = () => {
  return (
    <Container>
      <Header>
        <Wrapper>
          <Places to="/">Home</Places>
          <Places to="/post">Post</Places>
          <Places to="/youtube">You Home</Places>
          <Places to="/youPost">You Post</Places>
          <Places to="/myPost">My Post</Places>
          <Places to="/sign">Sign Up</Places>
          {/* <Places to="/detail">Post</Places> */}
        </Wrapper>
      </Header>
    </Container>
  );
};

export default HeaderView;
const Container = styled.div`
  width: 100%;
  position: fixed;
  z-index: 1000;
`;
const Wrapper = styled.div`
  width: 100%;
  color: white;
  display: flex;
`;
const Places = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: 500;
  text-transform: uppercase;
  margin-right: 20px;
  font-size: small;

  &:hover {
    color: #fd6805;
  }
`;
