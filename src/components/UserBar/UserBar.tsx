import { Avatar, Menu } from "antd";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useMainStore } from "../../hooks/useMainStore";
import { DropDown } from "../DropDown";

const StyledContainer = styled.div`
  float: left;
  width: auto;
  height: 100%;
  margin: 0 1rem 0 0;
`;

const StyledName = styled.span`
  font-size: 1rem;
  color: white;
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  & > span {
    padding: 0 1rem;
  }
`;

const UserMenu: FC = () => {
  const navigate = useNavigate();
  const { clearConfig } = useMainStore();

  //const handleSettings = () => navigate("/settings");
  const handleLogOut = () => {
    clearConfig();
    navigate("/login");
  };

  return (
    <Menu>
      {/* <Menu.Item onClick={handleSettings}>Настройки</Menu.Item> */}
      <Menu.Item onClick={handleLogOut}>Выход</Menu.Item>
    </Menu>
  );
};

export const UserBar: FC = () => {
  const { userConfig } = useMainStore();

  return (
    <StyledContainer>
      <DropDown overlay={<UserMenu />}>
        <StyledWrapper>
          <Avatar size="large" />
          <StyledName>{userConfig.name}</StyledName>
        </StyledWrapper>
      </DropDown>
    </StyledContainer>
  );
};
