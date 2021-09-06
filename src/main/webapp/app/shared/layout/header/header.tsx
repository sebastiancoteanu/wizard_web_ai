import './header.scss';
import React, { FC } from 'react';
import LoadingBar from 'react-redux-loading-bar';
import { IRootState } from "app/shared/reducers";
import { hasAnyAuthority } from "app/shared/auth/private-route";
import { AUTHORITIES } from "app/config/constants";
import { connect } from "react-redux";
import AdminNavigation from "app/shared/layout/header/AdminNavigation";
import Navigation from "app/shared/layout/header/Navigation";
import styled from "styled-components";

const Wrapper = styled.div`
`;

export interface IHeaderProps {
  isAdmin: boolean;
  isCreator: boolean;
}

const Header: FC<IHeaderProps> = ({
  isAdmin,
}) => {

  return (
    <Wrapper id="app-header">
      <LoadingBar className="loading-bar" />
      {isAdmin ? (
        <AdminNavigation />
      ) : (
        <Navigation />
      )}
    </Wrapper>
  );
};

const mapStateToProps = ({ authentication }: IRootState) => ({
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  isCreator: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.CREATOR]),
});

export default connect(mapStateToProps)(Header);
