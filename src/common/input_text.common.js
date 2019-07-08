// @flow

import * as React from 'react';
import { View, Text, TextInput } from 'react-native';
import Icon, {
  type MaterialIconsGlyphs,
} from 'react-native-vector-icons/MaterialIcons';

/* FLow Types
============================================================================= */
type State = {
  active: boolean,
};

type KeyboardType = 'default' | 'email-address' | 'numeric' | 'phone-pad';
type KeyboardTypeIOS =
  | 'ascii-capable'
  | 'numbers-and-punctuation'
  | 'url'
  | 'number-pad'
  | 'name-phone-pad'
  | 'decimal-pad'
  | 'twitter'
  | 'web-search';
type KeyboardTypeAndroid = 'visible-password';
type KeyboardTypeOptions = KeyboardType | KeyboardTypeAndroid | KeyboardTypeIOS;

type ReturnKeyType =
  // Cross Platform
  | 'done'
  | 'go'
  | 'next'
  | 'search'
  | 'send'
  // Android-only
  | 'none'
  | 'previous'
  // iOS-only
  | 'default'
  | 'emergency-call'
  | 'google'
  | 'join'
  | 'route'
  | 'yahoo';

type Props = {
  marginVertical?: number,
  labelSize: number,
  labelColor?: string,
  label?: ?string,
  backgroundColor?: string,
  iconName?: ?MaterialIconsGlyphs,
  reference?: ?Function,
  placeholder?: string,
  placeholderTextColor: string,
  value?: ?string,
  onChange: Function,
  onChangeText: Function,
  onSubmitEditing?: Function,
  secureTextEntry?: boolean,
  multiline?: boolean,
  editable?: boolean,
  returnKeyType?: ReturnKeyType,
  keyboardType?: KeyboardTypeOptions,
  color: string,
};

/* =============================================================================
<CustomInputText />
============================================================================= */
export class CustomInputText extends React.PureComponent<Props, State> {
  /**
   * Default Props
   */
  static defaultProps = {
    marginVertical: 5,
    labelColor: '#CECECE',
    backgroundColor: 'transparent',
    label: null,
    iconName: '',
    reference: null,
    placeholder: '',
    value: '',
    onSubmitEditing: () => {},
    secureTextEntry: false,
    multiline: false,
    editable: true,
    returnKeyType: 'default',
    keyboardType: 'default',
  };

  /**
   * State Here
   */
  state = { active: false };

  /**
   * Start render method
   */
  render() {
    const { active } = this.state;
    const {
      marginVertical,
      labelSize,
      labelColor,
      label,
      backgroundColor,
      iconName,
      reference,
      placeholder,
      placeholderTextColor,
      value,
      onChange,
      onChangeText,
      onSubmitEditing,
      secureTextEntry,
      multiline,
      editable,
      returnKeyType,
      keyboardType,
      color,
    } = this.props;
    return (
      <View style={{ marginVertical }}>
        {label ? (
          <Text style={{ fontSize: labelSize, color: labelColor }}>
            {label}
          </Text>
        ) : null}
        <View
          style={{
            backgroundColor: editable ? backgroundColor : '#CECECE',
            borderWidth: 1,
            borderRadius: 5,
            borderColor: active ? '#04A5CF' : '#CECECE',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {iconName ? (
            <View
              style={{
                padding: 8,
                paddingLeft: 15,
              }}
            >
              <Icon name={iconName} style={{ fontSize: 20, color }} />
            </View>
          ) : null}
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              paddingHorizontal: 5,
            }}
          >
            <TextInput
              ref={reference}
              placeholder={placeholder}
              placeholderTextColor={editable ? placeholderTextColor : '#CECECE'}
              value={value}
              onChange={onChange}
              onChangeText={onChangeText}
              onSubmitEditing={onSubmitEditing}
              onFocus={() => this.setState({ active: true })}
              onBlur={() => this.setState({ active: false })}
              autoCorrect={false}
              secureTextEntry={secureTextEntry}
              underlineColorAndroid="transparent"
              multiline={multiline}
              editable={editable}
              returnKeyType={returnKeyType}
              keyboardType={keyboardType}
              style={{ fontSize: 17, color, paddingVertical: 10 }}
            />
          </View>
        </View>
      </View>
    );
  }
}
