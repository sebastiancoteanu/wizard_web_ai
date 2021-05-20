import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './page-draft.reducer';
import { IPageDraft } from 'app/shared/model/page-draft.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPageDraftDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PageDraftDetail = (props: IPageDraftDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { pageDraftEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          PageDraft [<b>{pageDraftEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="isPublished">Is Published</span>
          </dt>
          <dd>{pageDraftEntity.isPublished ? 'true' : 'false'}</dd>
          <dt>Page</dt>
          <dd>{pageDraftEntity.pageId ? pageDraftEntity.pageId : ''}</dd>
        </dl>
        <Button tag={Link} to="/page-draft" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/page-draft/${pageDraftEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ pageDraft }: IRootState) => ({
  pageDraftEntity: pageDraft.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PageDraftDetail);
