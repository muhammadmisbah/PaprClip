// @flow

import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon, {
  type MaterialIconsGlyphs,
} from 'react-native-vector-icons/MaterialIcons';

/* Flow types 
============================================================================= */
type Props = {
  activeOpacity?: number,
  onPress: Function,
  backgroundColor?: string,
  xPosition?: string,
  yPosition?: string,
  icon?: MaterialIconsGlyphs,
  iconColor?: string,
};

/* =============================================================================
<Fab />
============================================================================= */
export const Fab = ({
  activeOpacity,
  onPress,
  backgroundColor,
  xPosition,
  yPosition,
  icon,
  iconColor,
}: Props) => (
  <TouchableOpacity
    activeOpacity={activeOpacity}
    onPress={onPress}
    style={{
      position: 'absolute',
      left: xPosition === 'left' ? 30 : null,
      right: xPosition === 'right' ? 30 : null,
      top: yPosition === 'top' ? 80 : null,
      bottom: yPosition === 'bottom' ? 30 : null,
      width: 56,
      height: 56,
      borderRadius: 28,
      padding: 10,
      zIndex: 1,
      backgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#1E1E1E',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.5,
      elevation: 3,
    }}
  >
    {icon && <Icon name={icon} size={25} color={iconColor} />}
  </TouchableOpacity>
);

/* Default Props 
============================================================================= */
Fab.defaultProps = {
  activeOpacity: 0.8,
  backgroundColor: '#FFFFFF',
  xPosition: 'right',
  yPosition: 'bottom',
  icon: 'add',
  iconColor: '#030b1c',
};
