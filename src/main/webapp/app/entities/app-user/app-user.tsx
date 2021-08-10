import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './app-user.reducer';

export interface IAppUserProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const AppUser = (props: IAppUserProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { appUserList, match, loading } = props;
  return (
    <div>
      <h2 id="app-user-heading">
        App Users
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new App User
        </Link>
      </h2>
      <div className="table-responsive">
        {appUserList && appUserList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Website</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {appUserList.map((appUser, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${appUser.id}`} color="link" size="sm">
                      {appUser.id}
                    </Button>
                  </td>
                  <td>{appUser.userId ? appUser.userId : ''}</td>
                  <td>{appUser.websiteId ? <Link to={`website/${appUser.websiteId}`}>{appUser.websiteId}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${appUser.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${appUser.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${appUser.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No App Users found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ appUser }: IRootState) => ({
  appUserList: appUser.entities,
  loading: appUser.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AppUser);
