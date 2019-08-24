import React from 'react';
import { connect } from 'react-redux';
import { Image, StyleSheet, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { CustomText, FlatButton } from '@common';
import QRImage from './img/qr_code.png';

import { addReceipt } from '../receipts.actions';

/* =============================================================================
<BarCodeScannerComponent />
============================================================================= */
class BarCodeScannerComponent extends React.Component {
  state = { scanned: false };

  /**
   * When user scanned the qr code
   */
  _handleBarCodeScanned = async ({ data }) => {
    const { addNewReceipt, navigation } = this.props;
    this.setState({ scanned: true });
    const base64 = await addNewReceipt(data);
    if (base64) navigation.navigate('FileReader', { source: { uri: base64 } });
  };

  _moveBackToReceiptsPage = () => {
    const { navigation } = this.props;
    navigation.navigate('Receipts');
  };

  render() {
    const { scanned } = this.state;
    const { loader } = this.props;
    return (
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : this._handleBarCodeScanned}
        style={styles.BarCodeStyle}
      >
        <CustomText color="#FFF" fontSize={40} marginVertical={20}>
          PaprClip
        </CustomText>
        <Image style={styles.QRImageStyle} source={QRImage} />
        {loader ? (
          <CustomText color="#FFF" fontSize={25} marginVertical={20}>
            Processing ...
          </CustomText>
        ) : (
          <FlatButton
            bold
            color="#FFF"
            title="Cancel"
            onPress={this._moveBackToReceiptsPage}
          />
        )}
      </BarCodeScanner>
    );
  }
}
/* Styles
============================================================================= */
const styles = StyleSheet.create({
  BarCodeStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height + 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  QRImageStyle: {
    width: 300,
    height: 300,
    resizeMode: 'stretch',
    marginVertical: 20,
  },
});

/* map state to props
============================================================================= */
const mapStateToProps = ({ Receipts }) => ({
  loader: Receipts.addLoader,
});

/* map dispatch to props
============================================================================= */
const mapDispatchToProps = dispatch => ({
  addNewReceipt: uri => dispatch(addReceipt(uri)),
});

/* Export
============================================================================= */
export const BarCodeScannerScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(BarCodeScannerComponent);
