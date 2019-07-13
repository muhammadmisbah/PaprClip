import React from 'react';
import { connect } from 'react-redux';
import { Image, StyleSheet } from 'react-native';
import * as GoogleSignIn from 'expo-google-sign-in';
import * as Facebook from 'expo-facebook';
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
import LogoImage from './img/logo.png';

import { login, facebookLogin } from '../auth.actions';
import { showSnack } from '@snack';

/* =============================================================================
<SignIn />
============================================================================= */
class SignIn extends React.Component {
  inputText1 = null;

  inputText2 = null;

  state = { email: '', password: '' };

  /**
   * when user login with email
   */
  _handleLogin = async () => {
    const { email, password } = this.state;
    const { userLogin, showError, navigation } = this.props;
    // eslint-disable-next-line no-useless-escape
    const filter = /^\w+([\.-]?\ w+)*@\w+([\.-]?\ w+)*(\.\w{2,3})+$/;
    if (filter.test(email) && password.length >= 6) {
      const exitCode = await userLogin({ email, password });
      if (exitCode) navigation.navigate('App');
    } else if (!email) {
      showError('Please enter email');
    } else if (!filter.test(email)) {
      showError('Enter enter valid email');
    } else if (!password) {
      showError('Please enter password');
    } else if (password.length < 6) {
      showError('Password length must be 6 digits');
    } else {
      showError('Something went wrong');
    }
  };

  /**
   * when user login with facebook
   */
  _handleFaceBookLogin = async () => {
    const { userFacebookLogin, showError, navigation } = this.props;
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        '2064932817149430',
        {
          permissions: ['public_profile', 'email'],
        }
      );
      if (type === 'success') {
        const exitCode = await userFacebookLogin(token);
        if (exitCode) navigation.navigate('App');
      } else {
        showError('Cancel facebook login');
      }
    } catch ({ message }) {
      // eslint-disable-next-line no-alert
      alert(message);
    }
  };

  /**
   * when user login with google
   */
  _handleGoogleLogin = async () => {
    // const { showError } = this.props;
    try {
      await GoogleSignIn.initAsync({
        clientId:
          '675137037686-gp498c2rmu967roou71cs42m0u6qv749.apps.googleusercontent.com',
      });
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        alert(`user ${JSON.stringify(user)}`);
      }
    } catch ({ message }) {
      alert(message);
    }
  };

  /**
   *  when user change the text input
   */
  _handleInputText = (name, value) => {
    this.setState({ [name]: value });
  };

  /**
   *  when user want to move registration page
   */
  _moveToRegistration = () => {
    const { navigation } = this.props;
    navigation.navigate('Registration');
  };

  render() {
    const { email, password } = this.state;
    const { loginLoader, facebookLoader } = this.props;
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
              value={email}
              placeholder="Email"
              returnKeyType="next"
              reference={input => {
                this.inputText1 = input;
              }}
              onChangeText={text => this._handleInputText('email', text)}
              onSubmitEditing={() => {
                this.inputText2.focus();
              }}
            />
            <CustomInputText
              secureTextEntry
              value={password}
              placeholder="Password"
              returnKeyType="next"
              reference={input => {
                this.inputText2 = input;
              }}
              onChangeText={text => this._handleInputText('password', text)}
            />
            <Button
              title="SignIn with email"
              width="100%"
              marginVertical={15}
              backgroundColor="#04A5CF"
              loader={loginLoader}
              onPress={this._handleLogin}
            />
          </Div>
          <Div width="100%">
            <Button
              bold
              width="100%"
              iconName="facebook"
              title="SignIn with facebook"
              color="#FFF"
              backgroundColor="#4267B2"
              marginVertical={10}
              loader={facebookLoader}
              onPress={this._handleFaceBookLogin}
            />
            <Button
              bold
              width="100%"
              iconName="google"
              iconColor="#CD3228"
              title="SignIn with google"
              color="#75758E"
              marginVertical={10}
              backgroundColor="#FFF"
              onPress={this._handleGoogleLogin}
            />
          </Div>
          <Span>
            <CustomText>Don&apos;t have account?</CustomText>
            <FlatButton
              title="Register"
              color="#04A5CF"
              marginVertical={20}
              onPress={this._moveToRegistration}
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

/* map state to props
============================================================================= */
const mapStateToProps = ({ Auth }) => ({
  loginLoader: Auth.loginLoader,
  facebookLoader: Auth.facebookLoader,
});

/* map dispatch to props
============================================================================= */
const mapDispatchToProps = dispatch => ({
  userLogin: user => dispatch(login(user)),
  userFacebookLogin: token => dispatch(facebookLogin(token)),
  showError: msg => dispatch(showSnack(msg)),
});

/* Export
============================================================================= */
export const SignInScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
