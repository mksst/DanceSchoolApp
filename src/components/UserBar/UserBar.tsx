import { Avatar, Menu } from "antd";
import React, { VFC } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useMainStore } from "../../hooks/useMainStore";
import { DropDown } from "../DropDown";

const StyledContainer = styled.div`
  float: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  height: inherit;
`;

const StyledName = styled.span`
  font-size: 2rem;
  color: white;
`;

const UserMenu = (): React.ReactElement => {
  const navigate = useNavigate();
  const { clearConfig } = useMainStore();

  const handleSettings = () => navigate("/settings");
  const handleLogOut = () => {
    clearConfig();
    navigate("/login");
  };

  return (
    <Menu>
      <Menu.Item onClick={handleSettings}>Настройки</Menu.Item>
      <Menu.Item onClick={handleLogOut}>Выход</Menu.Item>
    </Menu>
  );
};

export const UserBar: VFC = () => {
  const { userConfig } = useMainStore();

  return (
    <DropDown overlay={UserMenu()}>
      <StyledContainer>
        <Avatar size="large" />
        <StyledName>{userConfig.name}</StyledName>
      </StyledContainer>
    </DropDown>
  );
};
