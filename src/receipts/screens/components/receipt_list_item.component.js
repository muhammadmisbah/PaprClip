import React from 'react';
import { StyleSheet } from 'react-native';
import { Div, Touchable, CustomText } from '@common';

/* =============================================================================
<ReceiptListItem />
============================================================================= */
export const ReceiptListItem = ({ data, onReceiptOpen }) => {
  const { name, date, total, url } = data;
  return (
    <Touchable style={styles.ListItem} onPress={() => onReceiptOpen(url)}>
      <Div>
        <CustomText>{name}</CustomText>
        <CustomText>{date}</CustomText>
      </Div>
      <Div>
        <CustomText>Total ${total}</CustomText>
      </Div>
    </Touchable>
  );
};
/* Styles
============================================================================= */
const styles = StyleSheet.create({
  ListItem: {
    marginVertical: 10,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: '#CECECE',
  },
});
