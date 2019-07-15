import React from 'react';
import { connect } from 'react-redux';
import * as Permissions from 'expo-permissions';
import { Content, Fab } from '@common';
import { ReceiptListItem } from './components';

/* =============================================================================
<Receipts />
============================================================================= */
class Receipts extends React.Component {
  state = { hasCameraPermission: null };

  componentDidMount() {
    this._getPermissionsAsync();
  }

  // asking camera permission
  _getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  /**
   * when user open bar code scanner
   */
  _moveToBarCoderScanner = () => {
    const { hasCameraPermission } = this.state;
    const { navigation } = this.props;
    if (hasCameraPermission) {
      navigation.navigate('BarCodeScanner');
    }
  };

  /**
   * when user want to see the file in pdf reader
   */
  _handleOpenFileReader = uri => {
    const { navigation } = this.props;
    navigation.navigate('FileReader', { source: { uri } });
  };

  render() {
    const { receipts } = this.props;
    return (
      <Content padding={20}>
        {receipts.map(item => (
          <ReceiptListItem
            data={item}
            key={item.url}
            onReceiptOpen={this._handleOpenFileReader}
          />
        ))}
        <Fab onPress={this._moveToBarCoderScanner} />
      </Content>
    );
  }
}

/* map state to props
============================================================================= */
const mapStateToProps = ({ Receipts: ReceiptsReducer }) => ({
  receipts: ReceiptsReducer.list,
  loader: ReceiptsReducer.loader,
});

/* Export
============================================================================= */
export const ReceiptsScreen = connect(mapStateToProps)(Receipts);
