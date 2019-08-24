import React from 'react';
import { connect } from 'react-redux';
import { Container, Content, Div, CustomInputText, Button } from 'common';

import { updatePassword } from '../profile.actions';
import { showSnack } from 'snack';

/* =============================================================================
<PasswordChange />
============================================================================= */
class PasswordChange extends React.Component {
  inputText1 = null;

  inputText2 = null;

  inputText3 = null;

  state = { oldPassword: '', newPassword: '', confirmPassword: '' };

  /**
   * when user password change
   */
  _handlePasswordChange = async () => {
    const { oldPassword, newPassword, confirmPassword } = this.state;
    const { updateUserPassword, showError, navigation } = this.props;
    // eslint-disable-next-line no-useless-escape
    if (oldPassword && newPassword && newPassword === confirmPassword) {
      const exitCode = await updateUserPassword({
        oldPassword,
        newPassword,
        confirmPassword,
      });
      if (exitCode) navigation.navigate('Dashboard');
    } else if (!oldPassword) {
      showError('Please enter old password');
    } else if (!newPassword) {
      showError('Please enter new password');
    } else if (newPassword !== confirmPassword) {
      showError('Mismatch confirm password');
    } else {
      showError('Something went wrong');
    }
  };

  /**
   *  when user change the text input
   */
  _handleInputText = (name, value) => {
    this.setState({ [name]: value });
  };

  render() {
    const { oldPassword, newPassword, confirmPassword } = this.state;
    const { loader } = this.props;
    return (
      <Container>
        <Content padding={20} center>
          <Div width="100%">
            <CustomInputText
              secureTextEntry
              value={oldPassword}
              placeholder="Old password"
              returnKeyType="next"
              reference={input => {
                this.inputText1 = input;
              }}
              onChangeText={text => this._handleInputText('oldPassword', text)}
              onSubmitEditing={() => {
                this.inputText2.focus();
              }}
            />
            <CustomInputText
              secureTextEntry
              value={newPassword}
              placeholder="New password"
              returnKeyType="next"
              reference={input => {
                this.inputText2 = input;
              }}
              onChangeText={text => this._handleInputText('newPassword', text)}
              onSubmitEditing={() => {
                this.inputText3.focus();
              }}
            />
            <CustomInputText
              secureTextEntry
              value={confirmPassword}
              placeholder="Confirm password"
              returnKeyType="go"
              reference={input => {
                this.inputText3 = input;
              }}
              onChangeText={text =>
                this._handleInputText('confirmPassword', text)
              }
            />
            <Button
              title="Change password"
              width="100%"
              marginVertical={15}
              backgroundColor="#04A5CF"
              loader={loader}
              onPress={this._handlePasswordChange}
            />
          </Div>
        </Content>
      </Container>
    );
  }
}

/* map state to props
============================================================================= */
const mapStateToProps = ({ Profile }) => ({
  loader: Profile.passwordLoader,
});

/* map dispatch to props
============================================================================= */
const mapDispatchToProps = dispatch => ({
  updateUserPassword: data => dispatch(updatePassword(data)),
  showError: msg => dispatch(showSnack(msg)),
});

/* Export
============================================================================= */
export const PasswordChangeScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordChange);
