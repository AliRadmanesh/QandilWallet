import React, { Component } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage,
  NetInfo,
  ActivityIndicator,
  I18nManager
} from "react-native";
import { Container, Content, Text, Button } from "native-base";
import { NavigationActions } from "react-navigation";
import axios from "axios";
import firebase, { Notification } from "react-native-firebase";
import PersianNumber from "react-native-persian-text";

import ModalSuccess from "./ModalSuccess";
import ModalRequestError from "./ModalRequestError";
import ModalServerError from "./ModalServerError";

import I18n from "../../utils/i18n";

import styles from "./styles";
import CustomIcon from "../../utils/customIcons";
import colors from "../../utils/colors";
import strings from "../../utils/strings";
import { responsiveHeight } from "react-native-responsive-dimensions";

const HeaderImagePath = "../../../assets/Icons/App/Transactions/header.png";
const ZIBAL_IMAGE = "../../../assets/Icons/App/Recharge/zibal.png";
const PAYBOOM_IMAGE = "../../../assets/Icons/App/Recharge/payboom.png";
const ZARINPAL_IMAGE = "../../../assets/Icons/App/Recharge/zarinpal.png";

class RechargeAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageText: "",
      amountValue: "",
      peopleErrorAmount: false,
      creditCardErrorAmount: false,
      errorAddress: false,
      isPressed: false,
      loading: false,
      successAlert: false,
      errorInputAlert: false,
      errorAlert: false,
      userToken: "",
      userName: "",
      userCardNum: "",
      userPhoneNum: "",
      userAddress: "",
      isConnected: true,
      balanceLoading: false,
      currentBalance: "",
      zibalSelected: false,
      payboomSelected: false,
      zarinpalSelected: false,
      peopleAmountInput: "",
      creditCardAmountInput: "",
      peopleDescriptionInput: "",
      creditCardDescriptionInput: "",
      addressInput: "",
      isModalSuccessOpen: false,
      isModalServerErrorOpen: false,
      isModalRequestErrorOpen: false
    };

    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
  }

  focusNextField(id) {
    this.inputs[id].focus();
  }

  componentDidMount() {
    // Get Token, Name, Card number and Phone number from AsyncStorage
    this.bootstrapAsync();

    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );

    // Receive Notification from server (if there is any)
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        // Process your notification as required
        const newNotification = new firebase.notifications.Notification()
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title ? notification.title : "Iraq Payment")
          .setBody(notification.body)
          .setSound(notification.sound ? notification.sound : "default");

        // Android-specific properties
        newNotification.android
          .setChannelId(
            notification.channelId ? notification.channelId : "ChannelId"
          )
          .android.setSmallIcon("ic_launcher")
          .android.setAutoCancel(true);

        if (this.state.isConnected) {
          firebase.notifications().displayNotification(newNotification);
        }
      });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
    this.notificationListener();
  }

  handleConnectivityChange = isConnected => {
    this.setState({ isConnected });
  };

  bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    const userName = await AsyncStorage.getItem("userName");
    const userCardNum = await AsyncStorage.getItem("userCardNum");
    const userPhoneNum = await AsyncStorage.getItem("userPhoneNum");
    const userAddress = await AsyncStorage.getItem("userAddress");

    this.setState({
      userToken: userToken,
      userName: userName,
      userCardNum: userCardNum,
      userPhoneNum: userPhoneNum
    });

    if (
      userAddress != null &&
      userAddress.toString() !== I18n.t("Recharge:addressPlaceholder")
    ) {
      this.setState({
        messageText: userAddress
      });
    }
    this.getBalance();
  };

  async getBalance() {
    this.setState({
      balanceLoading: true
    });

    try {
      // Get Balance
      let response = null;

      response = await axios.post(
        strings.API_GET_BALANCE,
        {
          id: this.state.userCardNum,
          mobile: this.state.userPhoneNum
        },
        {
          headers: {
            Authorization: `Bearer ${this.state.userToken}`,
            "Content-Type": "application/json"
          }
        }
      );

      this.setState({
        currentBalance: response.data,
        balanceLoading: false
      });
    } catch (e) {
      this.setState({
        currentBalance: "-",
        balanceLoading: false
      });
      this.refs.connectionErrorModal.open();
    }
  }

  checkValidity(type, value) {
    const patternPositiveNaturalNumber = /^[+]?\d+?$/; // /^[+]?\d+([.]\d+)?$/ -> add . to numbers
    const checkPositivity = value.match(patternPositiveNaturalNumber);

    if (type === 0) {
      // Check amount
      if (checkPositivity == null) {
        this.setState({ errorAmount: true });
      } else {
        this.setState({ errorAmount: false });
      }
    } else if (type === 1) {
      // Check address
      if (value === "") {
        this.setState({ errorAddress: true });
      } else {
        this.setState({ errorAddress: false });
      }
    }
  }

  goBackToHome() {
    const { navigation } = this.props;
    const { modalSuccess } = this.refs;

    modalSuccess.close();
    navigation.goBack();
  }

  numberWithCommas = value => {
    const parts = value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  onSelectMethod = index => {
    if (index === 1) {
      // Charge Center Selected
      this.setState({
        zibalSelected: true,
        payboomSelected: false,
        zarinpalSelected: false
      });
    } else if (index === 2) {
      // People Selected
      this.setState({
        zibalSelected: false,
        payboomSelected: true,
        zarinpalSelected: false
      });
    } else if (index === 3) {
      // Credit Card Selected
      this.setState({
        zibalSelected: false,
        payboomSelected: false,
        zarinpalSelected: true
      });
    }
  };

  goToAnotherScreen = routeName => {
    switch (routeName) {
      case "ChargeCenter": {
        const navigateAction = NavigationActions.navigate({
          routeName
        });
        this.props.navigation.dispatch(navigateAction);
        break;
      }
      case "CreditCardPayRequest": {
        this.checkZarinpalInputs().then(() => {
          const { creditCardErrorAmount } = this.state;
          if (!creditCardErrorAmount) {
            const {
              creditCardAmountInput,
              creditCardDescriptionInput
            } = this.state;

            const navigateAction = NavigationActions.navigate({
              routeName,
              params: {
                amount: creditCardAmountInput,
                description: creditCardDescriptionInput
              }
            });
            this.props.navigation.dispatch(navigateAction);
          }
        });
        break;
      }
    }
  };

  renderBalance() {
    if (this.state.balanceLoading) {
      return (
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <ActivityIndicator
            size="small"
            color={colors.SPINNER_COLOR}
            style={styles.balanceSpinner}
          />
        </View>
      );
    } else {
      return (
        <View
          style={{ flexDirection: "row", flex: 1, justifyContent: "flex-end" }}
        >
          <Text allowFontScaling={false} style={styles.currentBalance}>
            <PersianNumber>
              {this.numberWithCommas(this.state.currentBalance)}
            </PersianNumber>
          </Text>
          <Text allowFontScaling={false} style={styles.currentBalanceUnit}>
            {" ریال"}
          </Text>
        </View>
      );
    }
  }

  checkZarinpalInputs = async () => {
    const { creditCardAmountInput } = this.state;

    const patternPositiveNaturalNumber = /^[+]?\d+?$/;
    const checkAmount = creditCardAmountInput.match(
      patternPositiveNaturalNumber
    );

    if (creditCardAmountInput === "" || checkAmount == null) {
      this.setState({ creditCardErrorAmount: true });
    }
  };

  checkPayboomInputs = async () => {
    const { peopleAmountInput, addressInput } = this.state;

    const patternPositiveNaturalNumber = /^[+]?\d+?$/;
    const checkAmount = peopleAmountInput.match(patternPositiveNaturalNumber);
    const patternNumbers = /^[0-9]*$/;
    const checkAddress = addressInput.match(patternNumbers); // Address shouldn't be just numbers!

    if (peopleAmountInput === "" || checkAmount == null) {
      this.setState({ peopleErrorAmount: true });
    }
    if (addressInput === "" || checkAddress !== null) {
      this.setState({ errorAddress: true });
    }
  };

  sendPeopleRequest = () => {
    const { userToken, userPhoneNum } = this.props.navigation.state.params;

    this.checkPayboomInputs().then(async () => {
      const {
        peopleAmountInput,
        descriptionInput,
        addressInput,
        errorAmount,
        errorAddress
      } = this.state;

      if (!errorAmount && !errorAddress) {
        this.setState({
          isPressed: true,
          loading: true
        });

        try {
          let response = null;

          response = await axios.post(
            strings.API_RECHARGE,
            {
              amount: peopleAmountInput,
              address: addressInput,
              description: descriptionInput,
              mobile: userPhoneNum
            },
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "application/json"
              }
            }
          );

          if (response.data === 1) {
            this.setState({
              isPressed: false,
              loading: false,
              isModalSuccessOpen: true
            });
            // alert("Request sent successfully!");
            // this.refs.modalSuccess.open();
          } else {
            this.setState({
              isPressed: false,
              loading: false,
              isModalServerErrorOpen: true
            });
            // alert("Address or amount value is not valid.");
            // this.refs.modalErrorInput.open();
          }
        } catch (e) {
          this.setState({
            isPressed: false,
            loading: false,
            isModalRequestErrorOpen: true
          });
          // alert("For use this services you must connect to internet");
          // please check device connectivity!');
          // this.refs.modalError.open();
        }
      }
    });
  };

  renderFooterButton = () => {
    return (
      <View style={styles.buttonContainer}>
        <Button
          block
          style={styles.nextButton}
          onPress={() => this.sendPeopleRequest()}
          disabled={this.state.errorAmount || this.state.errorAddress}
        >
          <Text
            uppercase={false}
            allowFontScaling={false}
            style={styles.nextButtonText}
          >
            {I18n.t("Recharge.nextButtonText")}
          </Text>
        </Button>
      </View>
    );
  };

  renderBasedOnMethod = () => {
    return (
      <View style={styles.peopleRequestCard}>
        <Text allowFontScaling={false} style={styles.peopleCardText}>
          {I18n.t("Recharge.peopleCardText")}
        </Text>

        <TextInput
          value={this.state.creditCardAmountInput}
          style={styles.amountInput}
          underlineColorAndroid="transparent"
          keyboardType="numeric"
          placeholder="مبلغ *"
          maxLength={10}
          onFocus={() => this.setState({ creditCardErrorAmount: false })}
          onChangeText={creditCardAmountInput =>
            this.setState({ creditCardAmountInput })
          }
          onSubmitEditing={() => this.checkZarinpalInputs()}
          onEndEditing={() => this.checkZarinpalInputs()}
        />
        <View
          style={
            this.state.creditCardErrorAmount
              ? styles.fieldBorderError
              : styles.fieldBorder
          }
        />
        {this.showErrorAmount(this.state.creditCardErrorAmount)}

        <TextInput
          multiline
          value={this.state.creditCardDescriptionInput}
          style={styles.descriptionInput}
          underlineColorAndroid="transparent"
          placeholder="توضیحات"
          onChangeText={creditCardDescriptionInput =>
            this.setState({ creditCardDescriptionInput })
          }
        />
        <View
          style={[
            styles.fieldBorder,
            {
              marginBottom: responsiveHeight(5)
            }
          ]}
        />
      </View>
    );
  };

  showErrorAmount = errorAmount => {
    if (errorAmount) {
      return (
        <Text style={styles.errorText}>
          {I18n.t("Recharge.peopleAmountError")}
        </Text>
      );
    }
  };

  onModalButtonPressed = modalType => {
    const {
      isModalSuccessOpen,
      isModalRequestErrorOpen,
      isModalServerErrorOpen
    } = this.state;
    switch (modalType) {
      case modalType === isModalSuccessOpen: {
        this.setState({ isModalSuccessOpen: false }, () => {
          this.props.navigation.navigate("Drawer");
        });
        break;
      }
      case modalType === isModalRequestErrorOpen: {
        this.setState({ isModalRequestErrorOpen: false });
        break;
      }
      case modalType === isModalServerErrorOpen: {
        this.setState({ isModalServerErrorOpen: false });
        break;
      }
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <ModalSuccess
          isVisible={this.state.isModalSuccessOpen}
          onPressReturn={() =>
            this.onModalButtonPressed(this.state.isModalSuccessOpen)
          }
        />
        <ModalRequestError
          isVisible={this.state.isModalRequestErrorOpen}
          onPressReturn={() =>
            this.onModalButtonPressed(this.state.isModalRequestErrorOpen)
          }
        />
        <ModalServerError
          isVisible={this.state.isModalServerErrorOpen}
          onPressReturn={() =>
            this.onModalButtonPressed(this.state.isModalServerErrorOpen)
          }
        />

        <ImageBackground
          source={require(HeaderImagePath)}
          style={styles.headerImage}
        >
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={styles.closeIcon}
            >
              <CustomIcon
                name="arrow-left"
                size={24}
                color={colors.WHITE}
                style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}
              />
            </TouchableOpacity>

            <Text allowFontScaling={false} style={styles.titleText}>
              {I18n.t("Recharge.title")}
            </Text>

            <TouchableOpacity
              onPress={() => alert("help")}
              style={styles.helpIcon}
            >
              <CustomIcon name="help" size={24} color={colors.WHITE} />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <Content padder>
          <View style={styles.currentBalanceContainer}>
            <View style={{ justifyContent: "flex-start" }}>
              <Text allowFontScaling={false} style={styles.currentBalanceText}>
                {I18n.t("Recharge.currentBalanceText")}
              </Text>
            </View>
            {this.renderBalance()}
          </View>

          <View style={styles.chargeMethodsCard}>
            <Text allowFontScaling={false} style={styles.mainText}>
              {I18n.t("Recharge.mainText")}
            </Text>
            <View style={styles.chargeMethodsContainer}>
              <View
                style={
                  this.state.zibalSelected
                    ? styles.chargeMethodsButtonsSelected
                    : styles.chargeMethodsButtons
                }
              >
                <TouchableOpacity
                  onPress={() => this.onSelectMethod(1)}
                  style={styles.chargeCenterContainer}
                >
                  <Image
                    source={require(ZIBAL_IMAGE)}
                    style={styles.chargeCenterImage}
                    resizeMode="contain"
                  />
                  <Text
                    allowFontScaling={false}
                    style={styles.chargeCenterText}
                  >
                    {I18n.t("Recharge.chargeCenter")}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={
                  this.state.payboomSelected
                    ? styles.chargeMethodsButtonsSelected
                    : styles.chargeMethodsButtons
                }
              >
                <TouchableOpacity
                  onPress={() => this.onSelectMethod(2)}
                  style={styles.peopleContainer}
                >
                  <Image
                    source={require(PAYBOOM_IMAGE)}
                    style={styles.peopleImage}
                    resizeMode="contain"
                  />
                  <Text allowFontScaling={false} style={styles.peopleText}>
                    {I18n.t("Recharge.people")}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={[
                  this.state.zarinpalSelected
                    ? styles.chargeMethodsButtonsSelected
                    : styles.chargeMethodsButtons,
                  { marginRight: 0 }
                ]}
              >
                <TouchableOpacity
                  onPress={() => this.onSelectMethod(3)}
                  style={styles.creditCardContainer}
                >
                  <Image
                    source={require(ZARINPAL_IMAGE)}
                    style={styles.creditCardImage}
                    resizeMode="contain"
                  />
                  <Text allowFontScaling={false} style={styles.creditCardText}>
                    {I18n.t("Recharge.creditCard")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {this.renderBasedOnMethod()}
        </Content>
        {this.renderFooterButton()}
      </Container>
    );
  }
}

export default RechargeAccount;
