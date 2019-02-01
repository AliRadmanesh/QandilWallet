import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  NetInfo,
  TextInput,
  I18nManager,
  ActivityIndicator
} from "react-native";
import { Container, Content, Text, Button, Toast } from "native-base";
import axios from "axios";
import firebase, { Notification } from "react-native-firebase";
import TouchID from "react-native-touch-id";
import { responsiveFontSize } from "react-native-responsive-dimensions";

// import ModalHelp from "./ModalHelp";
import ModalRequestError from "../Modals/ModalRequestError";
import ModalServerError from "../Modals/ModalServerError";

import I18n from "../../utils/i18n";

import styles from "./styles";
import CustomIcon from "../../utils/customIcons";
import colors from "../../utils/colors";
import strings from "../../utils/strings";
import PersianText from "react-native-persian-text";

const HeaderImagePath = "../../../assets/Icons/App/Transactions/header.png";
const FINGERPRINT_ICON = "../../../assets/Icons/App/SIMCharge/touch.png";

class SIMCharge2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: true,
      biometryType: null,
      passwordInput: "",
      passwordError: false,
      profitAmount: "",
      loadingProfit: false,
      loadingBuyCharge: false
    };
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );

    const {
      selectedCharge,
      selectedOperator
    } = this.props.navigation.state.params;
    this.getProfit(selectedOperator, selectedCharge);

    TouchID.isSupported()
      .then(biometryType => {
        if (biometryType === true) {
          // Touch ID is supported on Android
          this.setState({ biometryType: "FingerPrint" });
        } else {
          // Touch ID is supported on iOS
          this.setState({ biometryType });
        }
      })
      .catch(error => {
        // User's device does not support Touch ID (or Face ID)
        // This case is also triggered if users have not enabled Touch ID on their device
        this.setState({ biometryType: false });
      });

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
    Toast.hide();
  }

  handleConnectivityChange = isConnected => {
    this.setState({ isConnected });
  };

  getProfit = (selectedOperator, selectedCharge) => {
    this.setState({ loadingProfit: true });

    axios({
      method: "post",
      url: strings.API_GET_PROFIT,
      timeout: 1000 * 10, // Wait for 10 seconds
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        chargetype: selectedOperator,
        chargefee: selectedCharge
      }
    })
      .then(response => {
        // console.log(response.data);
        if (!response.data) {
          this.setState({ profitAmount: "-" });
        } else {
          this.setState({
            loadingProfit: false,
            profitAmount: response.data
          });
        }
      })
      .catch(error => {
        // console.log("error", error);
        this.setState({
          loadingProfit: false,
          profitAmount: "-",
          isModalServerErrorVisible: true
        });
      });
  };

  numberWithCommas = value => {
    const parts = value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  returnOperator = selectedOperator => {
    switch (selectedOperator) {
      case 1: {
        return "ایرانسل";
      }
      case 2: {
        return "همراه اول";
      }
      case 3: {
        return "رایتل";
      }
    }
  };

  showError = error => {
    if (error) {
      return (
        <Text style={styles.errorText}>
          {I18n.t("SIMCharge2.passwordErrorText")}
        </Text>
      );
    }
  };

  checkPasswordInput = async () => {
    const { passwordInput } = this.state;

    const patternPositiveNaturalNumber = /^[+]?\d+?$/;
    const checkPassword = passwordInput.match(patternPositiveNaturalNumber);

    if (passwordInput.length < 4 || checkPassword == null) {
      this.setState({ passwordError: true });
    }
  };

  _pressHandler = () => {
    const optionalConfigObject = {
      title: I18n.t("SIMCharge2.fingerprintTitle"), // Android
      sensorDescription: I18n.t("SIMCharge2.sensorDescription"), // Android
      sensorErrorDescription: I18n.t("SIMCharge2.sensorErrorDescription"), // Android
      cancelText: I18n.t("SIMCharge2.fingerprintCancelText"), // Android
      fallbackLabel: I18n.t("SIMCharge2.fingerprintFallbackLabel"), // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false // iOS
    };

    TouchID.authenticate(
      I18n.t("SIMCharge2.fingerprintBodyText"),
      optionalConfigObject
    )
      .then(success => {
        // Authenticated Successfully
        // this.requestForPurchase(1);
        this.ResultOfBuying({ status: 1, desc: 1234567890 });
      })
      .catch(error => {
        // Error
        Toast.show({
          text: I18n.t("SIMCharge2.fingerprintErrorToast"),
          textStyle: {
            fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
            fontSize: responsiveFontSize(1.6),
            fontWeight: "normal",
            fontStyle: "normal",
            color: colors.WHITE
          },
          buttonText: I18n.t("SIMCharge2.OK"),
          type: "danger",
          duration: 4000
        });
      });
  };

  requestForPurchase = index => {
    if (index === 1) {
      // User try purchase with fingerprint
      const {
        userToken,
        userCardNum,
        userPhoneNum,
        selectedCharge,
        selectedOperator
      } = this.props.navigation.state.params;
      const { passwordInput } = this.state;
      this.setState({ loadingBuyCharge: true });

      axios({
        method: "post",
        url: strings.API_BUY_CHARGE,
        timeout: 1000 * 10, // Wait for 10 seconds
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`
        },
        data: {
          id: userCardNum, // Card number
          chargetype: selectedOperator, // which Operator
          chargefee: selectedCharge, // which type of charge
          pass: passwordInput, // password user typed
          mobile: userPhoneNum // user phone number
        }
      })
        .then(response => {
          // console.log(response.data);
          this.setState({ loadingBuyCharge: false });
          this.ResultOfBuying(response.data);
        })
        .catch(error => {
          // console.log("error", error);
          this.setState({
            loadingBuyCharge: false,
            isModalServerErrorVisible: true
          });
        });
    } else if (index === 2) {
      // User try purchase with password input
      this.checkPasswordInput().then(() => {
        const { passwordError } = this.state;

        if (!passwordError) {
          // User entered a valid password, request for purchasing
          const {
            userToken,
            userCardNum,
            userPhoneNum,
            selectedCharge,
            selectedOperator
          } = this.props.navigation.state.params;
          const { passwordInput } = this.state;
          this.setState({ loadingBuyCharge: true });

          axios({
            method: "post",
            url: strings.API_BUY_CHARGE,
            timeout: 1000 * 10, // Wait for 10 seconds
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`
            },
            data: {
              id: userCardNum, // Card number
              chargetype: selectedOperator, // which Operator
              chargefee: selectedCharge, // which type of charge
              pass: passwordInput, // password user typed
              mobile: userPhoneNum // user phone number
            }
          })
            .then(response => {
              // console.log(response.data);
              this.setState({ loadingBuyCharge: false });
              this.ResultOfBuying(response.data);
            })
            .catch(error => {
              // console.log("error", error);
              this.setState({
                loadingBuyCharge: false,
                isModalServerErrorVisible: true
              });
            });
        }
      });
    }
  };

  ResultOfBuying = response => {
    if (!response) {
      // Password is NOT correct TODO: modallll
      this.setState({ isModalPasswordErrorOpen: true });
    } else {
      switch (response.status) {
        case 1: {
          // User purchased this charge. Go to receipt page
          const {
            selectedOperator,
            selectedCharge
          } = this.props.navigation.state.params;
          const { profitAmount } = this.state;
          const chargeCode = response.desc;

          this.props.navigation.navigate("SIMChargeReceipt", {
            selectedOperator,
            selectedCharge,
            chargeCode
          });
          break;
        }
        case 2: {
          // This charge has been bought and we don't have it right now! Take user to Home
          // TODO: Append go back home to modal button
          this.setState({ isModalFinishedChargeOpen: true });
          // this.props.navigation.navigate("Drawer");
          break;
        }
      }
    }
  };

  render() {
    const {
      selectedOperator,
      selectedCharge
    } = this.props.navigation.state.params;
    const { biometryType } = this.state;

    return (
      <Container style={styles.container}>
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
              {I18n.t("SIMCharge3.title")}
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
          <View style={styles.cardContainer}>
            <Text style={styles.topText}>
              {I18n.t("CreditCardPayRequest.topText")}
            </Text>

            <View style={styles.transactionTypeRow}>
              <Text allowFontScaling={false} style={styles.transactionTypeText}>
                {I18n.t("CreditCardPayRequest.transactionTypeText")}
              </Text>
              <View style={styles.horizontalLine} />
              <Text allowFontScaling={false} style={styles.transactionType}>
                {I18n.t("SIMCharge2.transactionType")}
              </Text>
            </View>

            <View style={styles.amountRow}>
              <Text allowFontScaling={false} style={styles.amountText}>
                {I18n.t("CreditCardPayRequest.amountText")}
              </Text>
              <View style={styles.horizontalLine} />
              <Text style={styles.amount} allowFontScaling={false}>
                <PersianText>
                  {this.numberWithCommas(parseInt(selectedCharge))}
                </PersianText>{" "}
                ریال
              </Text>
            </View>

            <View style={styles.descriptionRow}>
              <Text allowFontScaling={false} style={styles.descriptionText}>
                {I18n.t("SIMCharge2.operatorText")}
              </Text>
              <View style={styles.horizontalLine} />
              <Text allowFontScaling={false} style={styles.description}>
                {this.returnOperator(selectedOperator)}
              </Text>
            </View>
          </View>

          <View style={styles.passwordCard}>
            <Text allowFontScaling={false} style={styles.passwordText}>
              {I18n.t("SIMCharge2.enterPasswordText")}
            </Text>

            <TextInput
              value={this.state.passwordInput}
              style={styles.passwordInput}
              underlineColorAndroid="transparent"
              keyboardType="numeric"
              placeholder="Password *"
              maxLength={8}
              onFocus={() => this.setState({ passwordError: false })}
              onChangeText={passwordInput => this.setState({ passwordInput })}
              onSubmitEditing={() => this.checkPasswordInput()}
              onEndEditing={() => this.checkPasswordInput()}
            />
            <View
              style={
                this.state.passwordError
                  ? styles.fieldBorderError
                  : styles.fieldBorder
              }
            />
            {this.showError(this.state.passwordError)}

            <Text allowFontScaling={false} style={styles.touchFingerText}>
              {I18n.t("SIMCharge2.touchFingerText")}
            </Text>
            <TouchableOpacity
              onPress={this._pressHandler}
              disabled={!biometryType}
            >
              <View style={styles.fingerPrintContainer}>
                <Image
                  source={require(FINGERPRINT_ICON)}
                  style={styles.fingerPrintImage}
                  resizeMode="contain"
                />
                <Text style={styles.fingerPrintText}>
                  {biometryType
                    ? `شناسایی توسط ${biometryType}`
                    : "دستگاه شما از سنسور اثرانگشت پشتیبانی نمی کند :("}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Content>

        <View style={styles.buttonContainer}>
          <Button
            block
            style={styles.routeButton}
            onPress={() => {
              // this.requestForPurchase(2)
              this.ResultOfBuying({ status: 1, desc: 1234567890 });
            }}
          >
            <Text
              uppercase={false}
              allowFontScaling={false}
              style={styles.buttonText}
            >
              {I18n.t("CreditCardPayRequest.payButton")}
            </Text>
          </Button>
        </View>
      </Container>
    );
  }
}

export default SIMCharge2;
