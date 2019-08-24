import React from 'react';
import { connect } from 'react-redux';
import { Image, StyleSheet } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Div, CustomText, FlatButton } from 'common';
import QRImage from './img/qr_code.png';

import { addReceipt } from '../receipts.actions';

/* =============================================================================
<BarCodeScannerComponent />
============================================================================= */
class BarCodeScannerComponent extends React.Component {
  /**
   * When user scanned the qr code
   */
  _handleBarCodeScanned = async ({ data }) => {
    const { addNewReceipt, navigation } = this.props;
    const base64 = await addNewReceipt(data);
    if (base64) navigation.navigate('FileReader', { source: { uri: base64 } });
  };

  _moveBackToReceiptsPage = () => {
    const { navigation } = this.props;
    navigation.navigate('Receipts');
  };

  render() {
    const { loader } = this.props;
    return (
      <QRCodeScanner
        showMarker
        containerStyle={styles.BarCodeStyle}
        cameraStyle={styles.BarCodeStyle}
        onRead={this._handleBarCodeScanned}
        customMarker={
          <Div center>
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
          </Div>
        }
      />
    );
  }
}
/* Styles
============================================================================= */
const styles = StyleSheet.create({
  BarCodeStyle: {
    flex: 1,
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
