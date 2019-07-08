import React from 'react';
import { connect } from 'react-redux';
import { Image, StyleSheet } from 'react-native';
import {
  Container,
  Content,
  Div,
  Span,
  CustomText,
  CustomInputText,
  Button,
  FlatButton,
} from '@common';
import { showSnack } from '@snack';
import LogoImage from './img/logo.png';

/* =============================================================================
<Registration />
============================================================================= */
class Registration extends React.Component {
  inputText1 = null;

  inputText2 = null;

  inputText3 = null;

  inputText4 = null;

  inputText5 = null;

  inputText6 = null;

  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  /**
   * when user registration
   */
  _handleRegistration = () => {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = this.state;
    const { showError } = this.props;
    // eslint-disable-next-line no-useless-escape
    const filter = /^\w+([\.-]?\ w+)*@\w+([\.-]?\ w+)*(\.\w{2,3})+$/;
    if (
      firstName &&
      lastName &&
      filter.test(email) &&
      password.length > 6 &&
      password === confirmPassword
    ) {
      showError('okay');
    } else if (!firstName) {
      showError('Please enter first name');
    } else if (!lastName) {
      showError('Please enter last name');
    } else if (!email) {
      showError('Please enter email');
    } else if (!filter.test(email)) {
      showError('Enter enter valid email');
    } else if (!password) {
      showError('Please enter password');
    } else if (password.length < 6) {
      showError('Password length must be 6 digits');
    } else if (password !== confirmPassword) {
      showError('Mismatch confirm password');
    } else {
      showError('Something went wrong');
    }
  };

  /**
   *  when user change the text input
   */
  _handleInputText = (name, value) => {
    this.setState({ [name]: value });
  };

  /**
   *  when user want to move sign page
   */
  _moveToSignIn = () => {
    const { navigation } = this.props;
    navigation.navigate('SignIn');
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = this.state;
    return (
      <Container>
        <Content
          padding={20}
          alignItems="center"
          justifyContent="space-between"
        >
          <Div center>
            <Image source={LogoImage} style={styles.LogoImageStyle} />
          </Div>
          <Div width="100%">
            <CustomInputText
              value={firstName}
              placeholder="First name"
              returnKeyType="next"
              reference={input => {
                this.inputText1 = input;
              }}
              onChange={text => this._handleInputText('firstName', text)}
              onSubmitEditing={() => {
                this.inputText2.focus();
              }}
            />
            <CustomInputText
              value={lastName}
              placeholder="Last name"
              returnKeyType="next"
              reference={input => {
                this.inputText2 = input;
              }}
              onChange={text => this._handleInputText('lastName', text)}
              onSubmitEditing={() => {
                this.inputText3.focus();
              }}
            />
            <CustomInputText
              value={email}
              placeholder="Email"
              returnKeyType="next"
              reference={input => {
                this.inputText3 = input;
              }}
              onChange={text => this._handleInputText('email', text)}
              onSubmitEditing={() => {
                this.inputText4.focus();
              }}
            />
            <CustomInputText
              secureTextEntry
              value={password}
              placeholder="Password"
              returnKeyType="next"
              reference={input => {
                this.inputText4 = input;
              }}
              onChange={text => this._handleInputText('password', text)}
              onSubmitEditing={() => {
                this.inputText5.focus();
              }}
            />
            <CustomInputText
              secureTextEntry
              value={confirmPassword}
              placeholder="Confirm password"
              returnKeyType="next"
              reference={input => {
                this.inputText5 = input;
              }}
              onChange={text => this._handleInputText('confirmPassword', text)}
              onSubmitEditing={this._handleRegistration}
            />
            <Button
              title="Register"
              width="100%"
              marginVertical={15}
              backgroundColor="#04A5CF"
              onPress={this._handleRegistration}
            />
          </Div>
          <Span>
            <CustomText>Have already account?</CustomText>
            <FlatButton
              title="SignIn"
              color="#04A5CF"
              marginVertical={20}
              onPress={this._moveToSignIn}
            />
          </Span>
        </Content>
      </Container>
    );
  }
}

/* Styles
============================================================================= */
const styles = StyleSheet.create({
  LogoImageStyle: {
    width: 150,
    height: 150,
    resizeMode: 'stretch',
    marginVertical: 30,
  },
});

/* map dispatch to props
============================================================================= */
const mapDispatchToProps = dispatch => ({
  showError: msg => dispatch(showSnack(msg)),
});

/* Export
============================================================================= */
export const RegistrationScreen = connect(
  null,
  mapDispatchToProps
)(Registration);
