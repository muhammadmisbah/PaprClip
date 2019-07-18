import React from 'react';
import { connect } from 'react-redux';
import * as Permissions from 'expo-permissions';
import { Container, Fab, List } from '@common';
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
  _handleOpenFileReader = source => {
    const { navigation } = this.props;
    navigation.navigate('FileReader', { source });
  };

  render() {
    const { receipts } = this.props;
    return (
      <Container>
        <List
          padding={20}
          data={receipts}
          keyExtractor="_id"
          renderItem={({ item }) => (
            <ReceiptListItem
              data={item}
              onReceiptOpen={this._handleOpenFileReader}
            />
          )}
        />
        <Fab onPress={this._moveToBarCoderScanner} />
      </Container>
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
