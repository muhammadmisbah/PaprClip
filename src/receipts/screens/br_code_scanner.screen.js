import React from 'react';
import { connect } from 'react-redux';
import { Image, StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Div, CustomText, FlatButton } from 'common';
import QRImage from './img/qr_code.png';
import { addReceipt } from '../receipts.actions';
const { height, width } = Dimensions.get("window")

/* =============================================================================
<BarCodeScannerComponent />
============================================================================= */
let api = "http://http-test.000webhostapp.com/pin.php?code=";

class BarCodeScannerComponent extends React.Component {
  /**
   * When user scanned the qr code
   */
  constructor() {
    super()
    this.state = {
      pin: "",
      error: "",
      loader: false
    }
  }

  _handleBarCodeScanned = () => {
    this.setState({ error: "", loader: true })

    const { pin } = this.state
    const { addNewReceipt, navigation } = this.props;
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

    fetch(`${api}${pin}`)
      .then(res => res.text())
      .then(res => {
        console.log(res)
        if (!regex.test(res)) {
          this.setState({ error: "Please enter correct pin number", loader: false })
        }
        else {
          let url = res.slice(res.indexOf('url=') + 4, res.lastIndexOf('"'));
          console.log(url)
          addNewReceipt(url).then((uri) => {
            this.setState({ pin: "", error: "", loader: false })
            navigation.navigate('FileReader', { source: { uri } });
          })
        }
      })
      .catch(err => {
        console.log(err)
        this.setState({ error: err.message, loader: false })
      })
  };

  _moveBackToReceiptsPage = () => {
    const { navigation } = this.props;
    navigation.navigate('Receipts');
  };

  render() {
    const { loader, pin, error } = this.state;
    return (
      // <QRCodeScanner
      //   showMarker
      //   containerStyle={styles.BarCodeStyle}
      //   cameraStyle={styles.BarCodeStyle}
      //   onRead={this._handleBarCodeScanned}
      //   customMarker={
      //     <Div center>
      //       <CustomText color="#FFF" fontSize={40} marginVertical={20}>
      //         PaprClip
      //       </CustomText>
      //       <Image style={styles.QRImageStyle} source={QRImage} />
      //       {loader ? (
      //         <CustomText color="#FFF" fontSize={25} marginVertical={20}>
      //           Processing ...
      //         </CustomText>
      //       ) : (
      //         <FlatButton
      //           bold
      //           color="#FFF"
      //           title="Cancel"
      //           onPress={this._moveBackToReceiptsPage}
      //         />
      //       )}
      //     </Div>
      //   }
      // />
      <View style={{ flex: 1, width: "100%" }}>
        <ScrollView contentContainerStyle={{ justifyContent: "center", alignItems: "center" }} style={{ width: "100%" }}>
          <View style={{ height: height - 100, width: "100%", justifyContent: "center", alignItems: "center" }}>
            <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>

              <View style={{ marginBottom: 30 }}>
                <Text style={{ fontSize: 40 }}>PaprClip</Text>
              </View>

              <View style={{ width: "80%", marginVertical: 20, borderBottomWidth: 1, borderBottomColor: loader ? "lightgray" : "#04A5CF" }}>
                <TextInput
                  editable={!loader}
                  value={pin}
                  onChangeText={(pin) => {
                    if (error) {
                      this.setState({ error: "" })
                    }
                    this.setState({ pin })
                  }}
                  placeholder="Enter PIN"
                  placeholderTextColor="lightgray"
                  keyboardType="numeric"
                  selectionColor="#04A5CF"
                  style={{ width: "100%", fontSize: 25, textAlign: "center", color: "#04A5CF" }}
                  autoFocus
                />
              </View>

              {loader ?
                <ActivityIndicator size="large" color="black" />
                :
                <View style={{ width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center", marginVertical: 10 }}>
                  <TouchableOpacity onPress={this._handleBarCodeScanned} style={{ marginHorizontal: 10, padding: 10 }}>
                    <Text style={{ fontSize: 20 }}>Submit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this._moveBackToReceiptsPage} style={{ marginHorizontal: 10, padding: 10 }}>
                    <Text style={{ fontSize: 20 }}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              }

              <Text style={{ paddingTop: 10, fontSize: 15, color: "red" }}>{error}</Text>

            </View>
          </View>
        </ScrollView>
      </View>
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
