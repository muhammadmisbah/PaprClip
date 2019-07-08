import React from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import { FlatButton } from '@common';
import {
  AuthLoadingScreen,
  SignInScreen,
  RegistrationScreen,
  ForgotPasswordScreen,
} from '@auth';
import { DashboardScreen } from '@dashboard';
import { ProfileScreen } from '@profile';

/* =============================================================================
<AuthStack />
============================================================================= */
const AuthStack = createStackNavigator(
  {
    SignIn: {
      screen: SignInScreen,
    },
    Registration: {
      screen: RegistrationScreen,
    },
    ForgotPassword: {
      screen: ForgotPasswordScreen,
    },
  },
  {
    headerMode: 'none',
  }
);

/* =============================================================================
<AppStack />
============================================================================= */
const AppStack = createStackNavigator({
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Home',
      headerRight: (
        <FlatButton
          color="#04A5CF"
          title="Profile"
          onPress={() => navigation.navigate('Profile')}
        />
      ),
    }),
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      title: 'Profile',
    }),
  },
});

/* =============================================================================
<MainStack />
============================================================================= */
const MainStack = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    App: AppStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
/* Export appContainer
============================================================================= */
export const AppContainer = createAppContainer(MainStack);
