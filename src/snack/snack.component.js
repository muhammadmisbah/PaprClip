// @flow

import * as React from 'react';
import SnackBar from 'react-native-snackbar-component';

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
<Snack />
============================================================================= */
class Snack extends React.PureComponent<Props> {
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
    const color = type === 'error' ? '#E74C3C' : '#3DBA81';
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

/* Exports
============================================================================= */
export default Snack;
