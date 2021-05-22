import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './block.reducer';
import { IBlock } from 'app/shared/model/block.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBlockProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Block = (props: IBlockProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { blockList, match, loading } = props;
  return (
    <div>
      <h2 id="block-heading">
        Blocks
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Block
        </Link>
      </h2>
      <div className="table-responsive">
        {blockList && blockList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Options</th>
                <th>Order</th>
                <th>Page Draft</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {blockList.map((block, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${block.id}`} color="link" size="sm">
                      {block.id}
                    </Button>
                  </td>
                  <td>{block.type}</td>
                  <td>{block.options}</td>
                  <td>{block.order}</td>
                  <td>{block.pageDraftId ? <Link to={`page-draft/${block.pageDraftId}`}>{block.pageDraftId}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${block.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${block.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${block.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Blocks found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ block }: IRootState) => ({
  blockList: block.entities,
  loading: block.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Block);
