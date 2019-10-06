import React from 'react';
import { connect } from 'react-redux';
import { Image, StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView, Dimensions, ActivityIndicator, Keyboard } from 'react-native';
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
      loader: false,
      code1: '',
      code2: '',
      code3: '',
      code4: '',
    }
    this.code = {}
  }
  backspace = (key, name) => {

    let { code2, code3, code4 } = this.state;

    if (key.nativeEvent.key === "Backspace") {
      if (name == "code2") {
        if (code2.length == 0) {
          this.setState({ code1: "" })
          this.code["code1"].focus();
        }
        else this.code["code2"].focus()
      }

      else if (name == "code3") {
        if (code3.length == 0) {
          this.setState({ code2: "" })
          this.code["code2"].focus();
        }
        else this.code["code3"].focus()
      }

      else if (name == "code4") {
        if (code4.length == 0) {
          this.setState({ code3: "" })
          this.code["code3"].focus();
        }
        else this.code["code4"].focus()
      }
    }
  }
  clearCode = () => {
    ///////////// Temporary Code /////////////
    let url = "https://bill321.s3.us-east-2.amazonaws.com/MyStore/MyStore_147.00_18-17-51__18-09-2019_.pdf";
    let fileNameValues = (url.slice(url.lastIndexOf("/") + 1)).split("_");
    let fileValues = {
      name: fileNameValues[0],
      total: fileNameValues[1],
      _id: fileNameValues[2],
      date: fileNameValues[fileNameValues.length - 2],
      uri: url
    }

    this.props.addNewReceipt(fileValues).then((uri) => {
      this.setState({ pin: "", error: "", loader: false })
      this.props.navigation.navigate('FileReader', { source: { uri } });
    })
    /////////////////////////////////////////////

    this.code["code1"].focus()
    this.setState({
      code1: '',
      code2: '',
      code3: '',
      code4: '',
    })
  }
  onChangeCode = (name, text) => {

    let { code1, code2, code3, code4 } = this.state;
    const textLength = text.length
    this.setState({
      [name]: text,
    })

    if (name == "code1") {
      code1 = text
      if (textLength == 0) this.code["code1"].focus()
      else this.code["code2"].focus()
    }

    else if (name == "code2") {
      code2 = text
      if (textLength == 0) this.code["code2"].focus()
      else this.code["code3"].focus()
    }

    else if (name == "code3") {
      code3 = text
      if (textLength == 0) this.code["code3"].focus()
      else this.code["code4"].focus()
    }

    else if (name == "code4") {
      code4 = text
      if (textLength == 0) this.code["code4"].focus()
    }

    const code = code1 + code2 + code3 + code4;

    if (code.length == 4) {
      Keyboard.dismiss()
      this._handleBarCodeScanned(code);
    }

  }


  _handleBarCodeScanned = (pin) => {
    this.setState({ error: "", loader: true })

    // const { pin } = this.state
    const { addNewReceipt, navigation } = this.props;
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

    fetch(`${api}${pin}`)
      .then(res => res.text())
      .then(res => {
        console.log(res)
        if (!regex.test(res)) {
          this.setState({ error: "Please enter correct pin number", loader: false })
          this.code["code4"].focus()
        }
        else {
          let url = res.slice(res.indexOf('url=') + 4, res.lastIndexOf('"'));
          console.log(url)

          let fileNameValues = (url.slice(url.lastIndexOf("/") + 1)).split("_");
          let fileValues = {
            name: fileNameValues[0],
            total: fileNameValues[1],
            _id: fileNameValues[2],
            date: fileNameValues[fileNameValues.length - 2],
            uri: url
          }

          addNewReceipt(fileValues).then((uri) => {
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
    const { loader, pin, error, code1, code2, code3, code4 } = this.state;
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
        <ScrollView keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" contentContainerStyle={{ justifyContent: "center", alignItems: "center" }} style={{ width: "100%" }}>
          <View style={{ height: height - 100, width: "100%", justifyContent: "center", alignItems: "center" }}>
            <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>

              <View style={{ marginBottom: 30 }}>
                <Text style={{ fontSize: 40 }}>PaprClip</Text>
              </View>

              <View style={{ width: "80%", marginVertical: 20, borderBottomColor: loader ? "lightgray" : "#04A5CF", justifyContent: "space-between", flexDirection: "row" }}>
                {/* <TextInput
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
                /> */}
                <TextInput onKeyPress={(key) => { this.backspace(key, 'code1') }} editable={!loader} ref={ref => { this.code['code1'] = ref }} value={code1} onChangeText={(text) => { this.onChangeCode("code1", text) }} style={{ fontSize: 25, textAlign: "center", color: "#04A5CF", width: "15%", height: "100%", borderBottomColor: loader ? "lightgray" : code1 ? "#04A5CF" : "lightgray", borderBottomWidth: 1 }} keyboardType="number-pad" maxLength={1} selectionColor={"#04A5CF"} autoFocus />
                <TextInput onKeyPress={(key) => { this.backspace(key, 'code2') }} editable={!loader} ref={ref => { this.code['code2'] = ref }} value={code2} onChangeText={(text) => { this.onChangeCode("code2", text) }} style={{ fontSize: 25, textAlign: "center", color: "#04A5CF", width: "15%", height: "100%", borderBottomColor: loader ? "lightgray" : code2 ? "#04A5CF" : "lightgray", borderBottomWidth: 1 }} keyboardType="number-pad" maxLength={1} selectionColor={"#04A5CF"} />
                <TextInput onKeyPress={(key) => { this.backspace(key, 'code3') }} editable={!loader} ref={ref => { this.code['code3'] = ref }} value={code3} onChangeText={(text) => { this.onChangeCode("code3", text) }} style={{ fontSize: 25, textAlign: "center", color: "#04A5CF", width: "15%", height: "100%", borderBottomColor: loader ? "lightgray" : code3 ? "#04A5CF" : "lightgray", borderBottomWidth: 1 }} keyboardType="number-pad" maxLength={1} selectionColor={"#04A5CF"} />
                <TextInput onKeyPress={(key) => { this.backspace(key, 'code4') }} editable={!loader} ref={ref => { this.code['code4'] = ref }} value={code4} onChangeText={(text) => { this.onChangeCode("code4", text) }} style={{ fontSize: 25, textAlign: "center", color: "#04A5CF", width: "15%", height: "100%", borderBottomColor: loader ? "lightgray" : code4 ? "#04A5CF" : "lightgray", borderBottomWidth: 1 }} keyboardType="number-pad" maxLength={1} selectionColor={"#04A5CF"} />
              </View>

              {loader ?
                <ActivityIndicator size="large" color="lightgray" />
                :
                <View style={{ width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center", marginVertical: 10 }}>
                  <TouchableOpacity onPress={this.clearCode} style={{ marginHorizontal: 10, padding: 10 }}>
                    <Text style={{ fontSize: 20 }}>Clear</Text>
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
  addNewReceipt: payload => dispatch(addReceipt(payload)),
});

/* Export
============================================================================= */
export const BarCodeScannerScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(BarCodeScannerComponent);
