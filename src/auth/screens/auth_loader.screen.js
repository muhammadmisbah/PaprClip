import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { Div } from 'common';
import { loginStatus } from '../auth.actions';

/* =============================================================================
<AuthLoading />
============================================================================= */
class AuthLoading extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // check user login then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const { userLoginStatus, navigation } = this.props;
    const isAuthenticated = await userLoginStatus();

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    navigation.navigate(isAuthenticated ? 'App' : 'Auth');
  };

  render() {
    return (
      <Div flex={1} center>
        <ActivityIndicator size="large" color="#3d6ddd" />
      </Div>
    );
  }
}
/* map dispatch to props
============================================================================= */
const mapDispatchToProps = dispatch => ({
  userLoginStatus: () => dispatch(loginStatus()),
});

/* Export
============================================================================= */
export const AuthLoadingScreen = connect(
  null,
  mapDispatchToProps
)(AuthLoading);
