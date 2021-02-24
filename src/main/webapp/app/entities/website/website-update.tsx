import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IAppUser } from 'app/shared/model/app-user.model';
import { getEntities as getAppUsers } from 'app/entities/app-user/app-user.reducer';
import { getEntity, updateEntity, createEntity, reset } from './website.reducer';
import { IWebsite } from 'app/shared/model/website.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IWebsiteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const WebsiteUpdate = (props: IWebsiteUpdateProps) => {
  const [creatorId, setCreatorId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { websiteEntity, appUsers, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/website');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getAppUsers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...websiteEntity,
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
          <h2 id="teachersUixApp.website.home.createOrEditLabel">Create or edit a Website</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : websiteEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="website-id">ID</Label>
                  <AvInput id="website-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="urlLabel" for="website-url">
                  Url
                </Label>
                <AvField
                  id="website-url"
                  type="text"
                  name="url"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="themeLabel" for="website-theme">
                  Theme
                </Label>
                <AvInput
                  id="website-theme"
                  type="select"
                  className="form-control"
                  name="theme"
                  value={(!isNew && websiteEntity.theme) || 'LIGHT'}
                >
                  <option value="LIGHT">LIGHT</option>
                  <option value="DARK">DARK</option>
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/website" replace color="info">
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
  appUsers: storeState.appUser.entities,
  websiteEntity: storeState.website.entity,
  loading: storeState.website.loading,
  updating: storeState.website.updating,
  updateSuccess: storeState.website.updateSuccess,
});

const mapDispatchToProps = {
  getAppUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WebsiteUpdate);
