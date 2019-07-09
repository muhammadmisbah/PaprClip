// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import SnackBar from 'react-native-snackbar-component';
import { hideSnack } from './snack.actions';

/* Flow types
============================================================================= */
type Props = {
  visible: boolean,
  message: string,
  type: string,
  action: string,
  close: Function,
};

/* =============================================================================
<SnackComponent />
============================================================================= */
class SnackComponent extends React.PureComponent<Props> {
  constructor(props: any) {
    super(props);
    const { action, close } = this.props;
    if (!action) {
      setTimeout(() => {
        close();
      }, 5000);
    }
  }

  render() {
    const { visible, message, type, action, close } = this.props;
    const color = type === 'error' ? '#CD3228' : '#3DBA81';
    if (visible) {
      return (
        <SnackBar
          visible={visible}
          textMessage={message}
          backgroundColor={color}
          messageColor="#FFFFFF"
          actionHandler={close}
          actionText={action}
          accentColor="#FFFFFF"
        />
      );
    }
    return null;
  }
}

/* map state to props
============================================================================= */
const mapStateToProps = ({ Snack: SnackReducer }) => ({
  visible: SnackReducer.visible,
  message: SnackReducer.message,
  type: SnackReducer.type,
  action: SnackReducer.action,
});

/* map dispatch to props
============================================================================= */
const mapDispatchToProps = dispatch => ({
  close: () => dispatch(hideSnack()),
});

/* Export
============================================================================= */
export const Snack = connect(
  mapStateToProps,
  mapDispatchToProps
)(SnackComponent);
