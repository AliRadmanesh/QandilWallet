import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  I18nManager
} from "react-native";
import { Container, Content, Text, Spinner, Button } from "native-base";
import { NavigationActions } from "react-navigation";
import axios from "axios";
import TimerCountdown from "react-native-timer-countdown";

import ModalHelp from "./ModalHelp";
import ModalResponseError from "./ModalResponseError";
import ModalServerError from "../../Modals/ModalServerError";

import { onSignedIn } from "../../../boot/initialConfigs";
import I18n from "../../../utils/i18n";

import CustomIcon from "../../../utils/customIcons";
import styles from "./styles";
import colors from "../../../utils/colors";
import strings from "../../../utils/strings";

const HEADER_IMAGE =
  "../../../../assets/Icons/Login/LoginPage1/Header/Header.png";
const IQ_LOGO = "../../../../assets/Icons/Login/FirstPage/Logo/logo.png";

class SMSEntry extends Component {
  constructor(props) {
    super(props);
    const { phoneNumber, codeNumber } = this.props.navigation.state.params;

    this.state = {
      codeInput: "",
      codeInputError: false,
      phoneNumber,
      codeNumber,
      isPressed: false,
      isCodeExpired: false,
      isHelpModalVisible: false,
      isModalResponseErrorVisible: false,
      isModalServerErrorVisible: false,
      responseTitle: "",
      responseBody: ""
    };

    this.remainingTimeMS = 120 * 1000; // 120 s = 2 min
  }

  signInAsync = async (index, username, cardNumber, PhoneNumber, userToken) => {
    if (index === 1) {
      // New user
      this.goToNextScreen(
        "CardInformation",
        userToken,
        username,
        cardNumber,
        PhoneNumber
      );
    } else if (index === 2) {
      // First have to check whether we saved user name or NOT!
      // If yes, we can retreive it and go to Main Screen
      // If NOT, we must go to EnterNamePass Screen
      if (username !== null) {
        // Registered successfully before
        await AsyncStorage.setItem("userToken", userToken);
        await AsyncStorage.setItem("userName", username);
        await AsyncStorage.setItem("userCardNum", cardNumber);

        if (PhoneNumber.length === 10) {
          const zero = 0;
          const phoneWithZero = zero.toString() + PhoneNumber;
          await AsyncStorage.setItem("userPhoneNum", phoneWithZero);
        } else {
          await AsyncStorage.setItem("userPhoneNum", PhoneNumber);
        }
        onSignedIn().then(() =>
          this.goToNextScreen(
            "Home",
            userToken,
            username,
            cardNumber,
            PhoneNumber
          )
        );
        // this.goToNextScreen("Drawer", Token, cardnum, PhoneNumber);
      } else {
        // User registered before but doesn't has name and pass
        this.goToNextScreen(
          "CardInformation",
          userToken,
          username,
          cardNumber,
          PhoneNumber
        );
      }
    }
  };

  goToNextScreen(targetRoute, userToken, username, cardNumber, phoneNumber) {
    const navigateAction = NavigationActions.navigate({
      routeName: targetRoute,
      params: {
        userToken,
        username,
        cardNumber,
        phoneNumber
      }
    });
    this.props.navigation.dispatch(navigateAction);
  }

  checkValidity(input) {
    const patternPositiveNaturalNumber = /^[+]?\d+?$/;
    const checkCodePositivity = input.match(patternPositiveNaturalNumber);

    if (checkCodePositivity !== null && input >= 111111 && input <= 999999) {
      this.sendCodeToServer(input);
      // this.signInAsync(
      //   1,
      //   "name",
      //   "1234123412341234",
      //   "09159619974",
      //   "access_token"
      // );
    } else {
      this.setState({ codeInputError: true });
    }
  }

  sendCodeToServer(codeNumber) {
    const { phoneNumber } = this.props.navigation.state.params;

    this.setState({ isPressed: true });

    axios({
      method: "post",
      url: strings.API_VERIFY_CODE,
      timeout: 1000 * 10, // Wait for 10 seconds
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        id: phoneNumber,
        code: codeNumber
      }
    })
      .then(response => {
        // console.log(response.data);
        this.setState({ isPressed: false });
        const serverResponse = response.data;
        const { status, name, cardnum, access_token, desc } = serverResponse;

        switch (status) {
          case 0: {
            // Code is wrong!
            this.setState({
              responseTitle: I18n.t("Login2.modalResponseWrongCodeErrorTitle"),
              responseBody: I18n.t("Login2.modalResponseWrongCodeErrorBody"),
              isModalResponseErrorVisible: true
            });
            break;
          }
          case 1:
          // New user -> get card number and go to enter Name & Pass
          // It has the same code as "case 2"
          case 2: {
            // Registered user -> get card number and Name and go to Home Page
            this.signInAsync(status, name, cardnum, phoneNumber, access_token);
            break;
          }
          case 3: {
            // Too many tries!
            this.setState({
              responseTitle: I18n.t("Login2.modalResponseManyTriesErrorTitle"),
              responseBody: I18n.t("Login2.modalResponseManyTriesErrorBody"),
              isModalResponseErrorVisible: true
            });
            break;
          }
          case 4: {
            // Code is expired
            this.setState({
              responseTitle: I18n.t("Login2.modalResponseExpireCodeErrorTitle"),
              responseBody: I18n.t("Login2.modalResponseExpireCodeErrorBody"),
              isModalResponseErrorVisible: true
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

  setRemainingTime(secondsRemaining) {
    this.remainingTimeMS = secondsRemaining;
  }

  isButtonDisabled() {
    if (this.state.codeInputError || this.state.isCodeExpired) return true;
    return false;
  }

  showErrorInput = input => {
    const { codeInput, codeInputError } = this.state;

    if (input == codeInput && codeInputError) {
      return (
        <Text allowFontScaling={false} style={styles.errorText}>
          {I18n.t("Login2.codeInputErrorText")}
        </Text>
      );
    }
  };

  showHintText = () => {
    const { isCodeExpired } = this.state;
    if (isCodeExpired)
      return (
        <Text style={styles.expiredText} allowFontScaling={false}>
          {I18n.t("Login2.expireText")}
        </Text>
      );
  };

  onModalButtonPressed = modalType => {
    const {
      isHelpModalVisible,
      isModalResponseErrorVisible,
      isModalServerErrorVisible
    } = this.state;
    switch (modalType) {
      case modalType === isHelpModalVisible: {
        this.setState({ isHelpModalVisible: false });
        break;
      }
      case modalType === isModalResponseErrorVisible: {
        this.setState({ isModalResponseErrorVisible: false });
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
        <ModalResponseError
          isVisible={this.state.isModalResponseErrorVisible}
          onPressReturn={() =>
            this.onModalButtonPressed(this.state.isModalResponseErrorVisible)
          }
          messageTitle={this.state.responseTitle}
          messageBody={this.state.responseBody}
        />
        <ModalServerError
          isVisible={this.state.isModalServerErrorVisible}
          onPressReturn={() =>
            this.onModalButtonPressed(this.state.isModalServerErrorVisible)
          }
        />

        <Content>
          <Image source={require(HEADER_IMAGE)} style={styles.headerImage} />

          <TouchableOpacity
            onPress={() => this.setState({ isHelpModalVisible: true })}
            style={styles.helpIcon}
          >
            <CustomIcon name="help" size={24} color={colors.WHITE} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={styles.backIcon}
          >
            <CustomIcon
              name="arrow-left"
              size={24}
              color={colors.WHITE}
              style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}
            />
          </TouchableOpacity>

          <Image source={require(IQ_LOGO)} style={styles.logoIcon} />

          <Text style={styles.middleTextStyle} allowFontScaling={false}>
            {I18n.t("Login2.bodyText")}
          </Text>

          <View style={styles.form}>
            <Text style={styles.phoneNumberText} allowFontScaling={false}>
              {I18n.t("Login2.phoneNumberText")}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.plusContainer}>
                <Text style={styles.plus} allowFontScaling={false}>
                  +
                </Text>
              </View>
              <View>
                <TextInput
                  value={this.state.codeNumber}
                  style={styles.codeNumber}
                  underlineColorAndroid="transparent"
                  editable={false}
                />
                <View style={styles.fieldBorderCode} />
              </View>

              <View>
                <TextInput
                  value={this.state.phoneNumber}
                  style={styles.phoneNumber}
                  underlineColorAndroid="transparent"
                  editable={false}
                />
                <View style={styles.fieldBorder} />
              </View>
            </View>

            <TextInput
              keyboardType="numeric"
              maxLength={6}
              value={this.state.codeInput}
              style={styles.verificationCode}
              underlineColorAndroid="transparent"
              allowFontScaling={false}
              placeholderTextColor={colors.LIGHTER_BLACK}
              placeholder={I18n.t("Login2.verificationPlaceholder")}
              onChangeText={codeInput => this.setState({ codeInput })}
              onFocus={() => this.setState({ codeInputError: false })}
            />
            <View style={styles.fieldBorderVerificationCode} />
            {this.showErrorInput(this.state.codeInput)}
          </View>

          <View style={styles.timerContainer}>
            <TimerCountdown
              initialSecondsRemaining={this.remainingTimeMS}
              onTick={secondsRemaining =>
                this.setRemainingTime(secondsRemaining)
              }
              onTimeElapsed={() => this.setState({ isCodeExpired: true })}
              allowFontScaling
              style={styles.timer}
              allowFontScaling={false}
            />
            {this.showHintText()}
          </View>

          <View style={styles.continueButtonContainer}>
            <Button
              style={
                this.isButtonDisabled()
                  ? styles.continueButtonDisabled
                  : styles.continueButtonEnabled
              }
              onPress={() => this.checkValidity(this.state.codeInput)}
              disabled={this.isButtonDisabled()}
            >
              {this.state.isPressed ? (
                <Spinner color={colors.LIGHT_WHITE} />
              ) : (
                <Text
                  uppercase={false}
                  style={
                    this.isButtonDisabled()
                      ? styles.continueButtonTextDisabled
                      : styles.continueButtonTextEnabled
                  }
                  allowFontScaling={false}
                >
                  {I18n.t("Login1.continueButton")}
                </Text>
              )}
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default SMSEntry;
