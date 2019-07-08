import { NavigationActions } from 'react-navigation';

let _navigator;

/**
 * set top level navigator ref
 */
export function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

/**
 * move to another screen
 * @param {string} routeName
 * @param {object} params
 */
export function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}
