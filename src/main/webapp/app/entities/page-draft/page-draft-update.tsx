import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPage } from 'app/shared/model/page.model';
import { getEntities as getPages } from 'app/entities/page/page.reducer';
import { getEntity, updateEntity, createEntity, reset } from './page-draft.reducer';
import { IPageDraft } from 'app/shared/model/page-draft.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPageDraftUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PageDraftUpdate = (props: IPageDraftUpdateProps) => {
  const [pageId, setPageId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { pageDraftEntity, pages, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/page-draft');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPages();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...pageDraftEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="teachersUixApp.pageDraft.home.createOrEditLabel">Create or edit a PageDraft</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : pageDraftEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="page-draft-id">ID</Label>
                  <AvInput id="page-draft-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup check>
                <Label id="isPublishedLabel">
                  <AvInput id="page-draft-isPublished" type="checkbox" className="form-check-input" name="isPublished" />
                  Is Published
                </Label>
              </AvGroup>
              <AvGroup>
                <Label for="page-draft-page">Page</Label>
                <AvInput id="page-draft-page" type="select" className="form-control" name="page.id">
                  <option value="" key="0" />
                  {pages
                    ? pages.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/page-draft" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  pages: storeState.page.entities,
  pageDraftEntity: storeState.pageDraft.entity,
  loading: storeState.pageDraft.loading,
  updating: storeState.pageDraft.updating,
  updateSuccess: storeState.pageDraft.updateSuccess,
});

const mapDispatchToProps = {
  getPages,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PageDraftUpdate);
