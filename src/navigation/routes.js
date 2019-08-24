import React from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  HeaderBackButton,
} from 'react-navigation';
import { FlatButton } from 'common';
import { AuthLoadingScreen, SignInScreen, RegistrationScreen } from 'auth';
import {
  ReceiptsScreen,
  BarCodeScannerScreen,
  FileReaderScreen,
} from 'receipts';
import { ProfileScreen, PasswordChangeScreen } from 'profile';

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
  },
  {
    headerMode: 'none',
  }
);

/* =============================================================================
<AppStack />
============================================================================= */
const AppStack = createStackNavigator({
  Receipts: {
    screen: ReceiptsScreen,
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
  BarCodeScanner: {
    screen: BarCodeScannerScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
  FileReader: {
    screen: FileReaderScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Receipts',
      headerLeft: (
        <HeaderBackButton
          onPress={() => {
            navigation.navigate('Receipts');
          }}
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
  PasswordChange: {
    screen: PasswordChangeScreen,
    navigationOptions: () => ({
      title: 'Password change',
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
