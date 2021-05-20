import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './page-draft.reducer';
import { IPageDraft } from 'app/shared/model/page-draft.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPageDraftProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PageDraft = (props: IPageDraftProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { pageDraftList, match, loading } = props;
  return (
    <div>
      <h2 id="page-draft-heading">
        Page Drafts
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Page Draft
        </Link>
      </h2>
      <div className="table-responsive">
        {pageDraftList && pageDraftList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Is Published</th>
                <th>Page</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {pageDraftList.map((pageDraft, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${pageDraft.id}`} color="link" size="sm">
                      {pageDraft.id}
                    </Button>
                  </td>
                  <td>{pageDraft.isPublished ? 'true' : 'false'}</td>
                  <td>{pageDraft.pageId ? <Link to={`page/${pageDraft.pageId}`}>{pageDraft.pageId}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${pageDraft.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${pageDraft.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${pageDraft.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Page Drafts found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ pageDraft }: IRootState) => ({
  pageDraftList: pageDraft.entities,
  loading: pageDraft.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PageDraft);
