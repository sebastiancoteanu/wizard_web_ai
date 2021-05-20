import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPageDraft } from 'app/shared/model/page-draft.model';
import { getEntities as getPageDrafts } from 'app/entities/page-draft/page-draft.reducer';
import { getEntity, updateEntity, createEntity, reset } from './block.reducer';
import { IBlock } from 'app/shared/model/block.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBlockUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BlockUpdate = (props: IBlockUpdateProps) => {
  const [pageDraftId, setPageDraftId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { blockEntity, pageDrafts, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/block');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPageDrafts();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...blockEntity,
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
          <h2 id="teachersUixApp.block.home.createOrEditLabel">Create or edit a Block</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : blockEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="block-id">ID</Label>
                  <AvInput id="block-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="typeLabel" for="block-type">
                  Type
                </Label>
                <AvInput
                  id="block-type"
                  type="select"
                  className="form-control"
                  name="type"
                  value={(!isNew && blockEntity.type) || 'PARAGRAPH'}
                >
                  <option value="PARAGRAPH">PARAGRAPH</option>
                  <option value="HEADER">HEADER</option>
                  <option value="IMAGE">IMAGE</option>
                  <option value="THREE_IMAGE_LIST">THREE_IMAGE_LIST</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="optionsLabel" for="block-options">
                  Options
                </Label>
                <AvField
                  id="block-options"
                  type="text"
                  name="options"
                  validate={{
                    maxLength: { value: 2000, errorMessage: 'This field cannot be longer than 2000 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="block-pageDraft">Page Draft</Label>
                <AvInput id="block-pageDraft" type="select" className="form-control" name="pageDraftId">
                  <option value="" key="0" />
                  {pageDrafts
                    ? pageDrafts.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/block" replace color="info">
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
  pageDrafts: storeState.pageDraft.entities,
  blockEntity: storeState.block.entity,
  loading: storeState.block.loading,
  updating: storeState.block.updating,
  updateSuccess: storeState.block.updateSuccess,
});

const mapDispatchToProps = {
  getPageDrafts,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BlockUpdate);
