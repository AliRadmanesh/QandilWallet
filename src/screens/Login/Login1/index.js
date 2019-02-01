import React, { Component } from "react";
import {
  View,
  Image,
  TextInput,
  NetInfo,
  TouchableOpacity
} from "react-native";
import { Container, Content, Button, Text, Spinner, Icon } from "native-base";
import { NavigationActions } from "react-navigation";
import axios from "axios";

import ModalHelp from "./ModalHelp";
import ModalRequestError from "../../Modals/ModalRequestError";
import ModalServerError from "../../Modals/ModalServerError";

import I18n from "../../../utils/i18n";

import styles from "./styles";
import CustomIcon from "../../../utils/customIcons";
import colors from "../../../utils/colors";
import strings from "../../../utils/strings";

const LOGIN_HEADER =
  "../../../../assets/Icons/Login/LoginPage1/Header/Header.png";
const IQ_LOGO = "../../../../assets/Icons/Login/FirstPage/Logo/logo.png";

class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeInput: "98",
      phoneInput: "",
      isPressed: false,
      errorAlert: false,
      errorConnectionAlert: false,
      notifToken: "",
      isConnected: true,
      codeInputError: false,
      phoneInputError: false,
      isHelpModalVisible: false,
      isModalRequestErrorVisible: false,
      isModalServerErrorVisible: false
    };

    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
  }

  componentDidMount() {
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

  checkValidity(phoneNumber, countryCode) {
    const patternPositiveNaturalNumber = /^[+]?\d+?$/;
    const checkPhonePositivity = phoneNumber.match(
      patternPositiveNaturalNumber
    );
    const pattern10To11Number = /^[0-9]{10,11}$/;
    const check10To11Number = phoneNumber.match(pattern10To11Number);

    if (checkPhonePositivity === null || check10To11Number === null) {
      // if value is not positive OR is not 10 digit
      this.setState({ phoneInputError: true });
    } else {
      this.getMessageCode(phoneNumber, countryCode);
      // this.goToNextScreen("09159619974", "98");
    }
  }

  async getMessageCode(phoneNumber, codeNumber) {
    this.setState({
      isPressed: true
    });

    axios({
      method: "post",
      url: strings.API_SMS_LOGIN_CODE,
      timeout: 1000 * 10, // Wait for 10 seconds
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        id: phoneNumber.trim()
      }
    })
      .then(response => {
        console.log(response.data);
        const serverResponse = response.data;

        switch (serverResponse.status) {
          case 1: {
            // Code Sent!
            this.goToNextScreen(phoneNumber, codeNumber);
            break;
          }
          case 5: {
            // 2 Minutes Later
            this.setState({
              isPressed: false,
              message: I18n.t("Login1.2MinutesLaterText"),
              isModalRequestErrorVisible: true
            });
            break;
          }
          case 6: {
            // 12 Hours Later
            this.setState({
              isPressed: false,
              message: I18n.t("Login1.12HoursLaterBody"),
              messageTitle: I18n.t("Login1.12HoursLaterTitle"),
              isModalRequestErrorVisible: true
            });
            break;
          }
          case 7: {
            // Invalid Phone Number
            this.setState({
              isPressed: false,
              message: I18n.t("Login1.invalidPhoneNumberText"),
              isModalRequestErrorVisible: true
            });
            break;
          }
        }
      })
      .catch(error => {
        this.setState({
          isPressed: false,
          isModalServerErrorVisible: true
        });
      });
  }

  goToNextScreen(phoneNumber, codeNumber) {
    this.setState({ isPressed: false });

    const navigateAction = NavigationActions.navigate({
      routeName: "SMSCode",
      params: {
        phoneNumber,
        codeNumber
      }
    });
    this.props.navigation.dispatch(navigateAction);
  }

  isButtonDisabled() {
    if (this.state.phoneInput === "") return true;
    return false;
  }

  showErrorInput = input => {
    const {
      codeInput,
      phoneInput,
      codeInputError,
      phoneInputError
    } = this.state;

    if (input == codeInput && codeInputError) {
      return (
        <Text allowFontScaling={false} style={styles.errorText}>
          {I18n.t("Login1.codeInputErrorText")}
        </Text>
      );
    } else if (input == phoneInput && phoneInputError) {
      return (
        <Text allowFontScaling={false} style={styles.errorText}>
          {I18n.t("Login1.phoneInputErrorText")}
        </Text>
      );
    }
  };

  onModalButtonPressed = modalType => {
    const {
      isHelpModalVisible,
      isModalRequestErrorVisible,
      isModalServerErrorVisible
    } = this.state;
    switch (modalType) {
      case modalType === isHelpModalVisible: {
        this.setState({ isHelpModalVisible: false });
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
        <ModalHelp
          isVisible={this.state.isHelpModalVisible}
          onPressReturn={() =>
            this.onModalButtonPressed(this.state.isHelpModalVisible)
          }
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

        <Content>
          <Image source={require(LOGIN_HEADER)} style={styles.headerImage} />

          <TouchableOpacity
            onPress={() => this.setState({ isHelpModalVisible: true })}
            style={styles.helpIcon}
          >
            <CustomIcon name="help" size={24} color={colors.WHITE} />
          </TouchableOpacity>

          <Image source={require(IQ_LOGO)} style={styles.logoIcon} />

          <Text style={styles.middleTextStyle} allowFontScaling={false}>
            {I18n.t("Login1.bodyText")}
          </Text>

          <View style={styles.form}>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.plusContainer}>
                <Text style={styles.plus} allowFontScaling={false}>
                  +
                </Text>
              </View>
              <View>
                <TextInput
                  keyboardType="numeric"
                  value={this.state.codeInput}
                  maxLength={3}
                  style={styles.codeNumber}
                  underlineColorAndroid="transparent"
                  allowFontScaling={false}
                  blurOnSubmit={false}
                  onChangeText={codeInput => this.setState({ codeInput })}
                  onSubmitEditing={() => this.focusNextField("two")}
                  returnKeyType={"next"}
                />
                <View
                  style={
                    this.state.codeInputError
                      ? styles.fieldBorderErrorCode
                      : styles.fieldBorderCode
                  }
                />
              </View>

              <View>
                <TextInput
                  keyboardType="numeric"
                  value={this.state.numberInput}
                  maxLength={11}
                  placeholder={I18n.t("Login1.textInputPlaceholder")}
                  placeholderTextColor={colors.LIGHTER_BLACK}
                  style={styles.phoneNumber}
                  underlineColorAndroid="transparent"
                  allowFontScaling={false}
                  ref={input => (this.inputs["two"] = input)}
                  returnKeyType={"done"}
                  onChangeText={phoneInput => this.setState({ phoneInput })}
                  onFocus={() => this.setState({ phoneInputError: false })}
                />
                <View
                  style={
                    this.state.phoneInputError
                      ? styles.fieldBorderError
                      : styles.fieldBorder
                  }
                />
              </View>
            </View>
            {this.showErrorInput(this.state.codeInput)}
            {this.showErrorInput(this.state.phoneInput)}
          </View>
        </Content>
        <View style={styles.continueButtonContainer}>
          <Button
            style={
              this.isButtonDisabled()
                ? styles.continueButtonDisabled
                : styles.continueButtonEnabled
            }
            onPress={() =>
              this.checkValidity(this.state.phoneInput, this.state.codeInput)
            }
            disabled={this.isButtonDisabled()}
          >
            {this.state.isPressed ? (
              <Spinner color={colors.LIGHT_WHITE} />
            ) : (
              <Text
                uppercase={false}
                allowFontScaling={false}
                style={
                  this.isButtonDisabled()
                    ? styles.continueButtonTextDisabled
                    : styles.continueButtonTextEnabled
                }
              >
                {I18n.t("Login1.continueButton")}
              </Text>
            )}
          </Button>
        </View>
      </Container>
    );
  }
}

export default SignInScreen;
