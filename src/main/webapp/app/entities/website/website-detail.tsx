import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './website.reducer';
import { IWebsite } from 'app/shared/model/website.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IWebsiteDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const WebsiteDetail = (props: IWebsiteDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { websiteEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Website [<b>{websiteEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="url">Url</span>
          </dt>
          <dd>{websiteEntity.url}</dd>
          <dt>
            <span id="theme">Theme</span>
          </dt>
          <dd>{websiteEntity.theme}</dd>
        </dl>
        <Button tag={Link} to="/website" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/website/${websiteEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ website }: IRootState) => ({
  websiteEntity: website.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WebsiteDetail);
