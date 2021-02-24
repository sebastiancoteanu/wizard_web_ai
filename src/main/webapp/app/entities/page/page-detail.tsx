import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './page.reducer';
import { IPage } from 'app/shared/model/page.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPageDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PageDetail = (props: IPageDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { pageEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Page [<b>{pageEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="url">Url</span>
          </dt>
          <dd>{pageEntity.url}</dd>
          <dt>
            <span id="isRestricted">Is Restricted</span>
          </dt>
          <dd>{pageEntity.isRestricted ? 'true' : 'false'}</dd>
          <dt>Website</dt>
          <dd>{pageEntity.website ? pageEntity.website.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/page" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/page/${pageEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ page }: IRootState) => ({
  pageEntity: page.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PageDetail);
