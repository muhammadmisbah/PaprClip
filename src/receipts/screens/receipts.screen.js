import React from 'react';
import { connect } from 'react-redux';
// import * as Permissions from 'expo-permissions';
import { View, Text } from "react-native"
import { Container, Fab, List } from 'common';
import { ReceiptListItem } from './components';

import Swipeout from 'rc-swipeout/lib';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Share from "react-native-share"
import { from } from 'rxjs';
import { deleteReceipt } from '../receipts.actions';
/* =============================================================================
<Receipts />
============================================================================= */
class Receipts extends React.Component {
  state = { hasCameraPermission: true };

  componentDidMount() {
    this._getPermissionsAsync();
  }

  // asking camera permission
  _getPermissionsAsync = async () => {
    // const { status } = await Permissions.askAsync(Permissions.CAMERA);
    // this.setState({ hasCameraPermission: status === 'granted' });
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

  isSwipeout(item) {
    const { receipts, deleteReceipts } = this.props;
    return [
      {
        text: <View style={{ flex: 1, paddingHorizontal: 4, justifyContent: "center", alignItems: "center" }}>
          <Icon name={"share"} size={25} color={"#04A5CF"} />
          <Text>Share</Text>
        </View>
        ,
        onPress: () => {
          Share.open({ message: item.uri })
            .then((res) => { console.log(res) })
            .catch((err) => { err && console.log(err); });
        },
      },
      {
        text: <View style={{ flex: 1, paddingHorizontal: 4, justifyContent: "center", alignItems: "center" }}>
          <Icon name={"delete"} size={25} color={"red"} />
          <Text>Delete</Text>
        </View>
        ,
        onPress: () => {
          deleteReceipts({
            list: receipts,
            index: item.index
          })
        },
      }
    ]
  }

  render() {
    const { receipts } = this.props;
    return (
      <Container>
        <List
          padding={20}
          data={receipts}
          keyExtractor="_id"
          renderItem={({ item, index }) => (
            <Swipeout
              style={{ backgroundColor: "#fff" }}
              autoClose={true}
              right={this.isSwipeout({ ...item, index })}>
              <ReceiptListItem
                data={item}
                onReceiptOpen={this._handleOpenFileReader}
              />
            </Swipeout>
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
const mapDispatchToProps = dispatch => ({
  deleteReceipts: payload => dispatch(deleteReceipt(payload)),
});

/* Export
============================================================================= */
export const ReceiptsScreen = connect(mapStateToProps, mapDispatchToProps)(Receipts);
