import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './block.reducer';
import { IBlock } from 'app/shared/model/block.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

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
          <dt>Page Draft</dt>
          <dd>{blockEntity.pageDraft ? blockEntity.pageDraft.id : ''}</dd>
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
