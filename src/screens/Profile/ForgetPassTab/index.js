import React, { Component } from "react";
import { View, TextInput, NetInfo, AsyncStorage } from "react-native";
import { Container, Content, Text, Button, Spinner } from "native-base";
import axios from "axios";

import I18n from "../../../utils/i18n";

import styles from "./styles";
import colors from "../../../utils/colors";
import strings from "../../../utils/strings";

import ModalSuccess from "../../Modals/ModalSuccess";
import ModalRequestError from "../../Modals/ModalRequestError";
import ModalServerError from "../../Modals/ModalServerError";

class ForgetPassTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: "",
      userName: "",
      userCardNum: "",
      userPhoneNum: "",
      tempPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      isConnected: true,
      isPressed: false,
      errorTempPass: false,
      errorNewPass: false,
      errorConfirmPass: false,
      isModalSuccessVisible: false,
      isModalRequestErrorVisible: false,
      isModalServerErrorVisible: false
    };

    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
  }

  componentDidMount() {
    // Get Token, Name, Card number and Phone number from AsyncStorage
    this.bootstrapAsync();

    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
  }

  handleConnectivityChange = isConnected => {
    this.setState({ isConnected });
  };

  focusNextField(id) {
    this.inputs[id].focus();
  }

  bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    const userName = await AsyncStorage.getItem("userName");
    const userCardNum = await AsyncStorage.getItem("userCardNum");
    const userPhoneNum = await AsyncStorage.getItem("userPhoneNum");

    this.setState({
      userToken,
      userName,
      userCardNum,
      userPhoneNum
    });
  };

  sendLog(type) {
    const { isConnected, userPhoneNum, userToken } = this.state;
    if (isConnected) {
      axios({
        method: "post",
        url: strings.API_SEND_LOG,
        timeout: 1000 * 10, // Wait for 10 seconds
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`
        },
        data: {
          type,
          mobile: userPhoneNum
        }
      })
        .then(response => {
          // console.log("response.data", response.data);
        })
        .catch(error => {
          // console.log("error", error);
        });
    }
  }

  showErrorInput = index => {
    const { errorTempPass, errorNewPass, errorConfirmPass } = this.state;

    if (index === 1 && errorTempPass) {
      // console.log("errorTempPass");
      return (
        <Text allowFontScaling={false} style={styles.errorText}>
          {I18n.t("Profile.forgetPassTab.tempPasswordErrorText")}
        </Text>
      );
    } else if (index === 2 && errorNewPass) {
      // console.log("errorNewPass");
      return (
        <Text allowFontScaling={false} style={styles.errorText}>
          {I18n.t("Profile.changePassTab.newPasswordErrorText")}
        </Text>
      );
    } else if (index === 3 && errorConfirmPass) {
      // console.log("errorConfirmPass");
      return (
        <Text allowFontScaling={false} style={styles.errorText}>
          {I18n.t("Profile.changePassTab.confirmNewPasswordErrorText")}
        </Text>
      );
    }
  };

  async checkValidity(type, value) {
    const pattern4To8Number = /^[0-9]{4,8}$/;
    const check4To8Pass = value.match(pattern4To8Number);

    if (type === 0) {
      // Temp Password
      if (check4To8Pass == null) {
        this.setState({ errorTempPass: true });
      }
    }
    if (type === 1) {
      // New Password
      if (check4To8Pass == null) {
        this.setState({ errorNewPass: true });
      }
    }
    if (type === 2) {
      // Confirm Password
      if (check4To8Pass == null || value !== this.state.newPassword) {
        this.setState({ errorConfirmPass: true });
      }
    }
  }

  checkInputs(tempPassword, newPassword, confirmNewPassword) {
    this.sendLog(42);
    this.checkValidity(0, tempPassword);
    this.checkValidity(1, newPassword);
    this.checkValidity(2, confirmNewPassword).then(() => {
      const { errorTempPass, errorNewPass, errorConfirmPass } = this.state;
      if (!errorTempPass && !errorNewPass && !errorConfirmPass) {
        this.sendToServer();
      }
    });
    // if (tempPassword === "") {
    //   this.setState({ errorTempPass: true });
    // } else if (newPassword === "") {
    //   this.setState({ errorNewPass: true });
    // } else if (confirmNewPassword !== newPassword) {
    //   this.setState({ errorConfirmPass: true });
    // } else {
    //   this.sendToServer();
    // }
  }

  async sendToServer() {
    const {
      userCardNum,
      userToken,
      userPhoneNum,
      tempPassword,
      newPassword,
      confirmNewPassword,
      isConnected
    } = this.state;
    this.setState({ isPressed: true });

    if (isConnected) {
      axios({
        method: "post",
        url: strings.API_FORGET_PASSWORD,
        timeout: 1000 * 10, // Wait for 10 seconds
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`
        },
        data: {
          id: userCardNum,
          tpass: tempPassword,
          npass: newPassword,
          cpass: confirmNewPassword,
          mobile: userPhoneNum
        }
      })
        .then(response => {
          // console.log(response.data);
          this.setState({ isPressed: false });
          const serverResponse = response.data;

          switch (serverResponse) {
            case 0: {
              // Temporary password is not correct!
              this.setState({ isModalRequestErrorVisible: true });
              break;
            }
            case 1: {
              // Password changed successfully!
              this.setState({ isModalSuccessVisible: true });
              break;
            }
            case 2: {
              // New and Repeat password does not match!
              this.setState({ isModalRequestErrorVisible: true });
              break;
            }
          }
        })
        .catch(error => {
          // console.log("error", error);
          this.setState({
            isPressed: false,
            isModalServerErrorVisible: true
          });
        });
    }
  }

  onModalButtonPressed = modalType => {
    const {
      isModalSuccessVisible,
      isModalRequestErrorVisible,
      isModalServerErrorVisible
    } = this.state;
    switch (modalType) {
      case modalType === isModalSuccessVisible: {
        this.setState({ isModalSuccessVisible: false });
        break;
      }
      case modalType === isModalRequestErrorVisible: {
        this.setState({ isModalRequestErrorVisible: false });
        break;
      }
      case modalType === isModalServerErrorVisible: {
        this.setState({ isModalServerErrorVisible: false });
        break;
      }
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <ModalSuccess
          isVisible={this.state.isModalSuccessVisible}
          onPressReturn={() =>
            this.onModalButtonPressed(this.state.isModalSuccessVisible)
          }
          messageTitle={I18n.t("Profile.changePassTab.modalSuccessTitle")}
          messageBody={I18n.t("Profile.changePassTab.modalSuccessBody")}
        />
        <ModalRequestError
          isVisible={this.state.isModalRequestErrorVisible}
          onPressReturn={() =>
            this.onModalButtonPressed(this.state.isModalRequestErrorVisible)
          }
          messageTitle={I18n.t("Login1.modalRequestErrorTitle")}
          messageBody={I18n.t("Login1.modalRequestErrorBody")}
        />
        <ModalServerError
          isVisible={this.state.isModalServerErrorVisible}
          onPressReturn={() =>
            this.onModalButtonPressed(this.state.isModalServerErrorVisible)
          }
        />

        <Content padder>
          <View style={styles.lastPasswordContainer}>
            <TextInput
              value={this.state.tempPassword}
              style={styles.lastPasswordInput}
              underlineColorAndroid="transparent"
              placeholder={I18n.t("Profile.forgetPassTab.tempPassword")}
              secureTextEntry
              keyboardType="numeric"
              maxLength={8}
              onChangeText={tempPassword => this.setState({ tempPassword })}
              onSubmitEditing={() =>
                this.checkValidity(0, this.state.tempPassword)
              }
              onEndEditing={() =>
                this.checkValidity(0, this.state.tempPassword)
              }
              onFocus={() => this.setState({ errorTempPass: false })}
            />
            <View
              style={
                this.state.errorTempPass
                  ? styles.inputBorderError
                  : styles.inputBorder
              }
            />
            {this.showErrorInput(1)}
          </View>

          <View style={styles.newPasswordContainer}>
            <TextInput
              value={this.state.newPassword}
              style={styles.newPasswordInput}
              underlineColorAndroid="transparent"
              placeholder={I18n.t("Profile.forgetPassTab.newPassword")}
              secureTextEntry
              keyboardType="numeric"
              maxLength={8}
              onChangeText={newPassword => this.setState({ newPassword })}
              onFocus={() => this.setState({ errorNewPass: false })}
              onSubmitEditing={() =>
                this.checkValidity(1, this.state.newPassword)
              }
              onEndEditing={() => this.checkValidity(1, this.state.newPassword)}
            />
            <View
              style={
                this.state.errorNewPass
                  ? styles.inputBorderError
                  : styles.inputBorder
              }
            />
            {this.showErrorInput(2)}
          </View>

          <View style={styles.confirmNewPasswordContainer}>
            <TextInput
              value={this.state.confirmNewPassword}
              style={styles.confirmNewPasswordInput}
              underlineColorAndroid="transparent"
              placeholder={I18n.t("Profile.forgetPassTab.confirmPassword")}
              secureTextEntry
              keyboardType="numeric"
              maxLength={8}
              onFocus={() => this.setState({ errorConfirmPass: false })}
              onChangeText={confirmNewPassword =>
                this.setState({ confirmNewPassword })
              }
              onSubmitEditing={() =>
                this.checkValidity(2, this.state.confirmNewPassword)
              }
              onEndEditing={() =>
                this.checkValidity(2, this.state.confirmNewPassword)
              }
            />
            <View
              style={
                this.state.errorConfirmPass
                  ? styles.inputBorderError
                  : styles.inputBorder
              }
            />
            {this.showErrorInput(3)}
          </View>

          <View style={styles.buttonContainer}>
            <Button
              block
              style={styles.applyButton}
              onPress={() =>
                this.checkInputs(
                  this.state.tempPassword.trim(),
                  this.state.newPassword.trim(),
                  this.state.confirmNewPassword.trim()
                )
              }
              disabled={this.state.isPressed}
            >
              {this.state.isPressed ? (
                <Spinner color={colors.LIGHT_WHITE} />
              ) : (
                <Text
                  allowFontScaling={false}
                  uppercase={false}
                  style={styles.buttonText}
                >
                  {I18n.t("Profile.forgetPassTab.changePassword")}
                </Text>
              )}
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default ForgetPassTab;
