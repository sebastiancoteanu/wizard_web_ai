import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './block.reducer';

export interface IBlockDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BlockDetail = (props: IBlockDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { blockEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Block [<b>{blockEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="type">Type</span>
          </dt>
          <dd>{blockEntity.type}</dd>
          <dt>
            <span id="options">Options</span>
          </dt>
          <dd>{blockEntity.options}</dd>
          <dt>
            <span id="order">Order</span>
          </dt>
          <dd>{blockEntity.order}</dd>
          <dt>Page Draft</dt>
          <dd>{blockEntity.pageDraftId ? blockEntity.pageDraftId : ''}</dd>
        </dl>
        <Button tag={Link} to="/block" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/block/${blockEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ block }: IRootState) => ({
  blockEntity: block.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BlockDetail);
