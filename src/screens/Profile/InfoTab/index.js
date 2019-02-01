import React, { Component } from "react";
import {
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  TextInput,
  NetInfo
} from "react-native";
import { Container, Content, Radio, Button, Spinner } from "native-base";
import axios from "axios";

import I18n from "../../../utils/i18n";

import styles from "./styles";
import colors from "../../../utils/colors";
import strings from "../../../utils/strings";

import ModalSuccess from "../../Modals/ModalSuccess";
import ModalRequestError from "../../Modals/ModalRequestError";
import ModalServerError from "../../Modals/ModalServerError";

class InfoTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: "",
      userName: "",
      userNameError: false,
      userCardNum: "",
      userPhoneNum: "",
      isConnected: true,
      userAddress: null,
      userEmail: null,
      userAge: null,
      userGender: null,
      isPressed: false,
      isModalSuccessVisible: false,
      isModalRequestErrorVisible: false,
      isModalServerErrorVisible: false
    };
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

    const userAddress = await AsyncStorage.getItem("userAddress");
    const userEmail = await AsyncStorage.getItem("userEmail");
    const userAge = await AsyncStorage.getItem("userAge");
    const userGender = await AsyncStorage.getItem("userGender");

    if (userAddress != null) {
      this.setState({ userAddress });
    }
    if (userEmail != null) {
      this.setState({ userEmail });
    }
    if (userAge != null) {
      this.setState({ userAge });
    }
    if (userGender != null) {
      this.setState({ userGender });
    }
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
    const { userNameError } = this.state;

    if (index === 1 && userNameError) {
      console.log("name");
      return (
        <Text allowFontScaling={false} style={styles.errorText}>
          {I18n.t("Profile.infoTab.nameInputErrorText")}
        </Text>
      );
    }
  };

  checkInfo = () => {
    const { userName } = this.state;

    const patternAlphabets = /^([^0-9]*)$/;
    const checkAlphabets = userName.match(patternAlphabets);

    if (checkAlphabets == null || userName == "") {
      this.setState({ userNameError: true });
    } else {
      // Send data to server, then persist them.
      // this.sendInfo();
      this.saveInfo().then(() =>
        this.setState({ isModalSuccessVisible: true })
      );
    }
  };

  sendInfo = () => {
    const {
      userName,
      userAddress,
      userEmail,
      userAge,
      userGender,
      isConnected,
      userPhoneNum,
      userToken
    } = this.state;

    this.setState({ isPressed: true });

    if (isConnected) {
      axios({
        method: "post",
        url: strings.API_SEND_USER_INFO,
        timeout: 1000 * 10, // Wait for 10 seconds
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`
        },
        data: {
          mobile: userPhoneNum,
          name: userName,
          address: userAddress,
          email: userEmail,
          age: userAge,
          gender: userGender
        }
      })
        .then(response => {
          // console.log(response.data);
          this.setState({ isPressed: false });
          const serverResponse = response.data;

          if (serverResponse === 1) {
            // Data saved! You save them too.
            this.saveInfo().then(() =>
              this.setState({ isModalSuccessVisible: true })
            );
          } else {
            // Server returned error! There may be error with fields.
            this.setState({ isModalRequestErrorVisible: true });
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
  };

  saveInfo = async () => {
    const {
      userName,
      userAddress,
      userEmail,
      userAge,
      userGender
    } = this.state;

    if (userName !== "") {
      AsyncStorage.setItem("userName", userName);
    }
    if (userAddress !== null) {
      AsyncStorage.setItem("userAddress", userAddress);
    }
    if (userEmail !== null) {
      AsyncStorage.setItem("userEmail", userEmail);
    }
    if (userAge !== null) {
      AsyncStorage.setItem("userAge", userAge);
    }
    if (userGender !== null) {
      AsyncStorage.setItem("userGender", userGender);
    }
  };

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
          messageTitle={I18n.t("Profile.infoTab.modalSuccessTitle")}
          messageBody={I18n.t("Profile.infoTab.modalSuccessBody")}
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
          <View style={styles.firstLastNameContainer}>
            <Text style={styles.nameText} allowFontScaling={false}>
              {I18n.t("Profile.infoTab.firstAndLastNameText")}
            </Text>
            <TextInput
              maxLength={30}
              allowFontScaling={false}
              value={this.state.userName}
              style={styles.usernameInput}
              underlineColorAndroid="transparent"
              onChangeText={userName => this.setState({ userName })}
              onFocus={() => this.setState({ userNameError: false })}
            />
            <View
              style={
                this.state.userNameError
                  ? styles.nameFieldBorderError
                  : styles.nameFieldBorder
              }
            />
            {this.showErrorInput(this.state.userName)}
          </View>

          <View style={styles.phoneNumberContainer}>
            <Text style={styles.phoneNumberText} allowFontScaling={false}>
              {I18n.t("Profile.infoTab.phoneNumberText")}
            </Text>
            <TextInput
              value={this.state.userPhoneNum}
              style={styles.phoneNumberInput}
              underlineColorAndroid="transparent"
              editable={false}
            />
            <View style={styles.phoneFieldBorder} />
          </View>

          <View style={styles.addressContainer}>
            <Text style={styles.addressText} allowFontScaling={false}>
              {I18n.t("Profile.infoTab.addressText")}
            </Text>
            <TextInput
              multiline
              value={this.state.userAddress}
              style={styles.addressInput}
              placeholder="Your Address"
              underlineColorAndroid="transparent"
              onChangeText={userAddress => this.setState({ userAddress })}
            />
            <View style={styles.addressFieldBorder} />
          </View>

          <View style={styles.emailContainer}>
            <Text style={styles.emailText} allowFontScaling={false}>
              {I18n.t("Profile.infoTab.emailText")}
            </Text>
            <TextInput
              value={this.state.userEmail}
              style={styles.emailInput}
              underlineColorAndroid="transparent"
              onChangeText={userEmail => this.setState({ userEmail })}
              placeholder="Your Email"
            />
            <View style={styles.emailFieldBorder} />
          </View>

          <View style={styles.ageContainer}>
            <Text style={styles.ageText} allowFontScaling={false}>
              {I18n.t("Profile.infoTab.ageText")}
            </Text>
            <TextInput
              keyboardType="numeric"
              value={this.state.userAge}
              style={styles.ageInput}
              underlineColorAndroid="transparent"
              onChangeText={userAge => this.setState({ userAge })}
              placeholder="Your Age"
            />
            <View style={styles.emailFieldBorder} />
          </View>

          <View style={styles.genderContainer}>
            <Text style={styles.genderText} allowFontScaling={false}>
              {I18n.t("Profile.infoTab.genderText")}
            </Text>
            <View style={styles.genderRadioContainer}>
              <TouchableOpacity
                onPress={() => this.setState({ userGender: "male" })}
                style={styles.radioButtonContainer}
              >
                <Radio
                  selected={this.state.userGender === "male"}
                  style={styles.radioButton}
                  selectedColor={colors.GREEN_BUTTONS}
                  onPress={() => this.setState({ userGender: "male" })}
                />
                <Text allowFontScaling={false} style={styles.radioTextStyle}>
                  {I18n.t("Profile.infoTab.radioMale")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.setState({ userGender: "female" })}
                style={styles.radioButtonContainer}
              >
                <Radio
                  selected={this.state.userGender === "female"}
                  style={styles.radioButton}
                  selectedColor={colors.GREEN_BUTTONS}
                  onPress={() => this.setState({ userGender: "female" })}
                />
                <Text allowFontScaling={false} style={styles.radioTextStyle}>
                  {I18n.t("Profile.infoTab.radioFemale")}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.genderFieldBorder} />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              block
              style={styles.applyButton}
              onPress={() => this.checkInfo()}
            >
              {this.state.isPressed ? (
                <Spinner color={colors.LIGHT_WHITE} />
              ) : (
                <Text allowFontScaling={false} style={styles.buttonText}>
                  {I18n.t("Profile.infoTab.buttonText")}
                </Text>
              )}
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default InfoTab;
