import React from 'react';
import { connect } from 'react-redux';
import { Container, Content, Div, CustomInputText, Button } from '@common';
import { showSnack } from '@snack';

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
  _handlePasswordChange = () => {
    const { oldPassword, newPassword, confirmPassword } = this.state;
    const { showError } = this.props;
    // eslint-disable-next-line no-useless-escape
    if (oldPassword && newPassword && newPassword === confirmPassword) {
      showError('okay');
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
              onChange={text => this._handleInputText('oldPassword', text)}
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
              onChange={text => this._handleInputText('newPassword', text)}
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
              onChange={text => this._handleInputText('confirmPassword', text)}
            />
            <Button
              title="Change password"
              width="100%"
              marginVertical={15}
              backgroundColor="#04A5CF"
              onPress={this._handlePasswordChange}
            />
          </Div>
        </Content>
      </Container>
    );
  }
}

/* map dispatch to props
============================================================================= */
const mapDispatchToProps = dispatch => ({
  showError: msg => dispatch(showSnack(msg)),
});

/* Export
============================================================================= */
export const PasswordChangeScreen = connect(
  null,
  mapDispatchToProps
)(PasswordChange);
