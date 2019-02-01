import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  AsyncStorage
} from "react-native";
import { Container, Content, Text, Button, Spinner } from "native-base";
import { NavigationActions } from "react-navigation";
import axios from "axios";

import ModalHelp from "./ModalHelp";
import ModalRequestError from "../../Modals/ModalRequestError";
import ModalServerError from "../../Modals/ModalServerError";

import I18n from "../../../utils/i18n";

import CustomIcon from "../../../utils/customIcons";
import styles from "./styles";
import colors from "../../../utils/colors";
import strings from "../../../utils/strings";

const LOGIN_HEADER =
  "../../../../assets/Icons/Login/LoginPage4/Header/Header.png";
const IQ_LOGO = "../../../../assets/Icons/Login/FirstPage/Logo/logo.png";

class EnterCardDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameInput: "",
      passInput: "",
      confirmPassInput: "",
      isPressed: false,
      nameInputError: false,
      passInputError: false,
      confirmPassInputError: false,
      isHelpModalVisible: false,
      isModalRequestErrorVisible: false,
      isModalServerErrorVisible: false
    };

    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
  }

  focusNextField(id) {
    this.inputs[id].focus();
  }

  checkValidity() {
    const { nameInput, passInput, confirmPassInput } = this.state;
    const patternAlphabets = /^([^0-9]*)$/;
    const checkAlphabets = nameInput.match(patternAlphabets);
    const pattern4To8Number = /^[0-9]{4,8}$/;
    const check4To8NumberPass = passInput.match(pattern4To8Number);

    if (checkAlphabets == null || nameInput == "") {
      this.setState({ nameInputError: true });
    } else if (check4To8NumberPass == null) {
      this.setState({ passInputError: true });
    } else if (confirmPassInput !== passInput) {
      this.setState({ confirmPassInputError: true });
    } else {
      this.sendToServer(nameInput, passInput, confirmPassInput);
    }
  }

  sendToServer(username, Pass, ConfirmPass) {
    const {
      cardNumber,
      phoneNumber,
      userToken
    } = this.props.navigation.state.params;
    this.setState({ isPressed: true });

    axios({
      method: "post",
      url: strings.API_DATA_SUBMIT,
      timeout: 1000 * 10, // Wait for 10 seconds
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`
      },
      data: {
        id: cardNumber,
        name: username,
        pass: Pass,
        cpass: ConfirmPass,
        mobile: phoneNumber
      }
    })
      .then(response => {
        // console.log(response.data);
        this.setState({ isPressed: false });
        const serverResponse = response.data;

        if (serverResponse === 1) {
          // Data saved! Go to Home Page :)
          this.signInAsync(userToken, username, cardNumber, phoneNumber);
        } else {
          // Server returned error! There may be error with fields.
          this.setState({ isModalRequestErrorVisible: true });
        }
      })
      .catch(error => {
        console.log("error", error);
        this.setState({
          isPressed: false,
          isModalServerErrorVisible: true
        });
      });
  }

  signInAsync = async (userToken, username, cardNumber, phoneNumber) => {
    await AsyncStorage.setItem("userToken", userToken);
    await AsyncStorage.setItem("userName", username);
    await AsyncStorage.setItem("userCardNum", cardNumber);
    await AsyncStorage.setItem("userPhoneNum", phoneNumber);

    onSignedIn().then(() =>
      this.goToMainScreen("Home", userToken, username, cardNumber, PhoneNumber)
    );
  };

  goToMainScreen(targetRoute, userToken, username, cardNumber, phoneNumber) {
    this.setState({
      isPressed: false
    });

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

  showErrorInput = index => {
    const {
      nameInput,
      nameInputError,
      passInput,
      passInputError,
      confirmPassInput,
      confirmPassInputError
    } = this.state;

    if (index === 1 && nameInputError) {
      console.log("name");
      return (
        <Text allowFontScaling={false} style={styles.errorText}>
          {I18n.t("Login4.nameInputErrorText")}
        </Text>
      );
    } else if (index === 2 && passInputError) {
      console.log("pass");
      return (
        <Text allowFontScaling={false} style={styles.errorText}>
          {I18n.t("Login4.passInputErrorText")}
        </Text>
      );
    } else if (index === 3 && confirmPassInputError) {
      console.log("confPass");
      return (
        <Text allowFontScaling={false} style={styles.errorText}>
          {I18n.t("Login4.confirmPassInputErrorText")}
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

          <Text style={styles.middleTextStyle}>
            {I18n.t("Login4.bodyText")}
          </Text>

          <View style={styles.form}>
            <TextInput
              maxLength={30}
              blurOnSubmit={false}
              placeholder={I18n.t("Login4.usernamePlaceholder")}
              placeholderTextColor={colors.LIGHTER_BLACK}
              underlineColorAndroid="transparent"
              style={styles.usernameTextInput}
              allowFontScaling={false}
              value={this.state.nameInput}
              returnKeyType={"next"}
              ref={input => (this.inputs["one"] = input)}
              onChangeText={nameInput => this.setState({ nameInput })}
              onSubmitEditing={() => this.focusNextField("two")}
              onFocus={() => this.setState({ nameInputError: false })}
            />
            <View
              style={
                this.state.nameInputError
                  ? styles.fieldBorderError
                  : styles.fieldBorder
              }
            />
            {this.showErrorInput(1)}

            <TextInput
              keyboardType="numeric"
              secureTextEntry={true}
              placeholder={I18n.t("Login4.passwordPlaceholder")}
              placeholderTextColor={colors.LIGHTER_BLACK}
              underlineColorAndroid="transparent"
              maxLength={8}
              blurOnSubmit={false}
              returnKeyType={"next"}
              allowFontScaling={false}
              style={styles.passwordTextInput}
              value={this.state.passInput}
              ref={input => (this.inputs["two"] = input)}
              onChangeText={passInput => this.setState({ passInput })}
              onSubmitEditing={() => this.focusNextField("three")}
              onFocus={() => this.setState({ passInputError: false })}
            />
            <View
              style={
                this.state.passInputError
                  ? styles.fieldBorderError
                  : styles.fieldBorder
              }
            />
            {this.showErrorInput(2)}

            <TextInput
              keyboardType="numeric"
              secureTextEntry={true}
              placeholder={I18n.t("Login4.confirmPasswordPlaceholder")}
              placeholderTextColor={colors.LIGHTER_BLACK}
              maxLength={8}
              allowFontScaling={false}
              returnKeyType={"done"}
              underlineColorAndroid="transparent"
              ref={input => (this.inputs["three"] = input)}
              style={styles.confirmPasswordTextInput}
              value={this.state.confirmPassInput}
              onChangeText={confirmPassInput =>
                this.setState({ confirmPassInput })
              }
              onFocus={() => this.setState({ confirmPassInputError: false })}
            />
            <View
              style={
                this.state.confirmPassInputError
                  ? styles.fieldBorderError
                  : styles.fieldBorder
              }
            />
            {this.showErrorInput(3)}
          </View>
        </Content>
        <View style={styles.continueButtonContainer}>
          <Button
            style={styles.continueButtonEnabled}
            onPress={() => {
              // this.checkValidity();
              this.sendToServer("ali", "12", "12");
            }}
            disabled={this.state.isPressed}
          >
            {this.state.isPressed ? (
              <Spinner color={colors.LIGHT_WHITE} />
            ) : (
              <Text
                uppercase={false}
                allowFontScaling={false}
                style={styles.continueButtonTextEnabled}
              >
                {I18n.t("Login4.registerButton")}
              </Text>
            )}
          </Button>
        </View>
      </Container>
    );
  }
}

export default EnterCardDetails;
