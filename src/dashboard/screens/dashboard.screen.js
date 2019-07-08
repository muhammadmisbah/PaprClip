import React from 'react';
import { Content, CustomText, Button } from '@common';

/* =============================================================================
<Dashboard />
============================================================================= */
class Dashboard extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <Content center>
        <CustomText>Dashboard Screen</CustomText>
        <Button
          title="Profile"
          onPress={() => navigation.navigate('Profile')}
        />
      </Content>
    );
  }
}

/* Export
============================================================================= */
export const DashboardScreen = Dashboard;
