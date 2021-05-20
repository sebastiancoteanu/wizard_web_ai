import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IWebsite } from 'app/shared/model/website.model';
import { getEntities as getWebsites } from 'app/entities/website/website.reducer';
import { getEntity, updateEntity, createEntity, reset } from './page.reducer';
import { IPage } from 'app/shared/model/page.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPageUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PageUpdate = (props: IPageUpdateProps) => {
  const [websiteId, setWebsiteId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { pageEntity, websites, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/page');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getWebsites();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...pageEntity,
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
          <h2 id="teachersUixApp.page.home.createOrEditLabel">Create or edit a Page</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : pageEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="page-id">ID</Label>
                  <AvInput id="page-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="urlLabel" for="page-url">
                  Url
                </Label>
                <AvField
                  id="page-url"
                  type="text"
                  name="url"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="isRestrictedLabel">
                  <AvInput id="page-isRestricted" type="checkbox" className="form-check-input" name="isRestricted" />
                  Is Restricted
                </Label>
              </AvGroup>
              <AvGroup>
                <Label for="page-website">Website</Label>
                <AvInput id="page-website" type="select" className="form-control" name="websiteId">
                  <option value="" key="0" />
                  {websites
                    ? websites.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/page" replace color="info">
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
  websites: storeState.website.entities,
  pageEntity: storeState.page.entity,
  loading: storeState.page.loading,
  updating: storeState.page.updating,
  updateSuccess: storeState.page.updateSuccess,
});

const mapDispatchToProps = {
  getWebsites,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PageUpdate);
