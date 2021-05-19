import React, {
  useState,
  useEffect,
  FC,
} from 'react';

import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Row, Col, Button, CustomInput, Container } from 'reactstrap';

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { handleRegister as handleRegisterAction, reset as resetAction } from './register.reducer';
import { login as loginAction } from "app/shared/reducers/authentication";
import styled from "styled-components";
export type IRegisterProps = DispatchProps;

const Wrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  padding: 24px 0;
`;

const CreatorCheck = styled(AvField)`
  align-items: center;
  display: flex;
  font-size: 16px;
`;

const RegisterButton = styled(Button)`
  margin-top: 36px;
`;

export const RegisterPage: FC<IRegisterProps> = ({ handleRegister, reset }) => {
  const [password, setPassword] = useState('');
  const history = useHistory();


  useEffect(
    () => () => {
      reset();
    },
    [],
  );

  const handleValidSubmit = (event, values) => {
    handleRegister(values.username, values.email, values.firstPassword, 'en', values.isCreator);
    history.push('/login');
    event.preventDefault();
  };

  const updatePassword = event => setPassword(event.target.value);

  return (
    <Wrapper>
      <Row className="justify-content-center">
        <Col md="8">
          <h1 id="register-title">Registration</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <AvForm id="register-form" onValidSubmit={handleValidSubmit}>
            <AvField
              name="username"
              label="Username"
              placeholder={'Your username'}
              validate={{
                required: { value: true, errorMessage: 'Your username is required.' },
                pattern: {
                  value: '^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$',
                  errorMessage: 'Your username is invalid.',
                },
                minLength: { value: 1, errorMessage: 'Your username is required to be at least 1 character.' },
                maxLength: { value: 50, errorMessage: 'Your username cannot be longer than 50 characters.' },
              }}
            />
            <AvField
              name="email"
              label="Email"
              placeholder={'Your email'}
              type="email"
              validate={{
                required: { value: true, errorMessage: 'Your email is required.' },
                minLength: { value: 5, errorMessage: 'Your email is required to be at least 5 characters.' },
                maxLength: { value: 254, errorMessage: 'Your email cannot be longer than 50 characters.' },
              }}
            />
            <AvField
              name="firstPassword"
              label="New password"
              placeholder={'New password'}
              type="password"
              onChange={updatePassword}
              validate={{
                required: { value: true, errorMessage: 'Your password is required.' },
                minLength: { value: 4, errorMessage: 'Your password is required to be at least 4 characters.' },
                maxLength: { value: 50, errorMessage: 'Your password cannot be longer than 50 characters.' },
              }}
            />
            <PasswordStrengthBar password={password} />
            <AvField
              name="secondPassword"
              label="New password confirmation"
              placeholder="Confirm the new password"
              type="password"
              validate={{
                required: { value: true, errorMessage: 'Your confirmation password is required.' },
                minLength: { value: 4, errorMessage: 'Your confirmation password is required to be at least 4 characters.' },
                maxLength: { value: 50, errorMessage: 'Your confirmation password cannot be longer than 50 characters.' },
                match: { value: 'firstPassword', errorMessage: 'The password and its confirmation do not match!' },
              }}
            />
            <CreatorCheck tag={CustomInput} type="checkbox" name="isCreator" label="Are you a creator?" />
            <RegisterButton id="register-submit" color="primary" type="submit">
              Register
            </RegisterButton>
          </AvForm>
        </Col>
      </Row>
    </Wrapper>
  );
};

const mapDispatchToProps = {
  handleRegister: handleRegisterAction,
  login: loginAction,
  reset: resetAction,
};
type DispatchProps = typeof mapDispatchToProps;

export default connect(null, mapDispatchToProps)(RegisterPage);
