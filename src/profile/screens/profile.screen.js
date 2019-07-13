import React from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Content,
  Div,
  CustomInputText,
  Button,
  FlatButton,
} from '@common';

import { updateProfile } from '../profile.actions';
import { logout } from '@auth';
import { showSnack } from '@snack';

/* =============================================================================
<Profile />
============================================================================= */
class Profile extends React.Component {
  inputText1 = null;

  inputText2 = null;

  inputText3 = null;

  state = { firstName: '', lastName: '', email: '' };

  componentDidMount() {
    const { user } = this.props;
    if (user) {
      this.setState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
  }

  /**
   * when user Profile update
   */
  _handleUpdateProfile = () => {
    const { firstName, lastName, email } = this.state;
    const { updateUserProfile, showError } = this.props;
    // eslint-disable-next-line no-useless-escape
    const filter = /^\w+([\.-]?\ w+)*@\w+([\.-]?\ w+)*(\.\w{2,3})+$/;
    if (firstName && lastName && filter.test(email)) {
      updateUserProfile({ firstName, lastName, email });
    } else if (!firstName) {
      showError('Please enter first name');
    } else if (!lastName) {
      showError('Please enter last name');
    } else if (!email) {
      showError('Please enter email');
    } else if (!filter.test(email)) {
      showError('Enter enter valid email');
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
   * when user move to password change screen
   */
  _moveToPasswordChange = () => {
    const { navigation } = this.props;
    navigation.navigate('PasswordChange');
  };

  /**
   * when user logout
   */
  _handleLogout = async () => {
    const { userLogout, navigation } = this.props;
    const exitCode = await userLogout();
    if (exitCode) navigation.navigate('Auth');
  };

  render() {
    const { firstName, lastName, email } = this.state;
    const { loader, user } = this.props;
    const disable = !(user && (user.facebookUser || user.googleUser));
    return (
      <Container>
        <Content
          padding={20}
          alignItems="center"
          justifyContent="space-between"
        >
          <Div flex={1} center width="100%">
            <CustomInputText
              value={firstName}
              editable={disable}
              placeholder="First name"
              returnKeyType="next"
              reference={input => {
                this.inputText1 = input;
              }}
              onChangeText={text => this._handleInputText('firstName', text)}
              onSubmitEditing={() => {
                this.inputText2.focus();
              }}
            />
            <CustomInputText
              value={lastName}
              editable={disable}
              placeholder="Last name"
              returnKeyType="next"
              reference={input => {
                this.inputText2 = input;
              }}
              onChangeText={text => this._handleInputText('lastName', text)}
              onSubmitEditing={() => {
                this.inputText3.focus();
              }}
            />
            <CustomInputText
              value={email}
              editable={disable}
              placeholder="Email"
              returnKeyType="next"
              reference={input => {
                this.inputText3 = input;
              }}
              onChangeText={text => this._handleInputText('email', text)}
            />
            <Button
              title="Update Profile"
              width="100%"
              marginVertical={15}
              backgroundColor="#04A5CF"
              loader={loader}
              disabled={!disable}
              onPress={this._handleUpdateProfile}
            />
            {disable ? (
              <Div center margin={20}>
                <FlatButton
                  title="Change Password"
                  onPress={this._moveToPasswordChange}
                />
              </Div>
            ) : null}
          </Div>
          <Div width="100%">
            <Button
              title="Logout"
              width="100%"
              marginVertical={15}
              backgroundColor="#CD3228"
              onPress={this._handleLogout}
            />
          </Div>
        </Content>
      </Container>
    );
  }
}
/* map state to props
============================================================================= */
const mapStateToProps = ({ Auth, Profile: ProfileReducer }) => ({
  user: Auth.user,
  loader: ProfileReducer.profileLoader,
});

/* map dispatch to props
============================================================================= */
const mapDispatchToProps = dispatch => ({
  userLogout: () => dispatch(logout()),
  updateUserProfile: data => dispatch(updateProfile(data)),
  showError: msg => dispatch(showSnack(msg)),
});

/* Export
============================================================================= */
export const ProfileScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
