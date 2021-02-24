import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './page.reducer';
import { IPage } from 'app/shared/model/page.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPageProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Page = (props: IPageProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { pageList, match, loading } = props;
  return (
    <div>
      <h2 id="page-heading">
        Pages
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Page
        </Link>
      </h2>
      <div className="table-responsive">
        {pageList && pageList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Url</th>
                <th>Is Restricted</th>
                <th>Website</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {pageList.map((page, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${page.id}`} color="link" size="sm">
                      {page.id}
                    </Button>
                  </td>
                  <td>{page.url}</td>
                  <td>{page.isRestricted ? 'true' : 'false'}</td>
                  <td>{page.website ? <Link to={`website/${page.website.id}`}>{page.website.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${page.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${page.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${page.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Pages found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ page }: IRootState) => ({
  pageList: page.entities,
  loading: page.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Page);
