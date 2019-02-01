import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  NetInfo,
  TextInput,
  I18nManager
} from "react-native";
import { Container, Content, Text, Button, Toast, Spinner } from "native-base";
import axios from "axios";
import firebase, { Notification } from "react-native-firebase";
import TouchID from "react-native-touch-id";
import { responsiveFontSize } from "react-native-responsive-dimensions";

import I18n from "../../utils/i18n";

import styles from "./styles";
import CustomIcon from "../../utils/customIcons";
import colors from "../../utils/colors";
import strings from "../../utils/strings";

const HeaderImagePath = "../../../assets/Icons/App/Transactions/header.png";
const FINGERPRINT_ICON = "../../../assets/Icons/App/SIMCharge/touch.png";

class TransferMoney2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPressed: false,
      loading: false,
      isConnected: true,
      biometryType: null,
      passwordInput: "",
      passwordError: false,
      profitAmount: "",
      loadingProfit: false,
      loadingTransferMoney: false
    };
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );

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

  numberWithCommas = value => {
    const parts = value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  // returnMethod = index => {
  //   switch (index) {
  //     case 1: {
  //       return "Transfer Money (Card Number)";
  //     }
  //     case 2: {
  //       return "Transfer Money (Phone Number)";
  //     }
  //     case 3: {
  //       return "Transfer Money (QR Code)";
  //     }
  //   }
  // };

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
      title: "Using FingerPrint", // Android
      sensorDescription: "Touch sensor", // Android
      sensorErrorDescription: "Failed to authorize", // Android
      cancelText: "Cancel", // Android
      fallbackLabel: "Show Passcode", // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false // iOS
    };

    TouchID.authenticate(
      "Please put your finger on fingerprint.",
      optionalConfigObject
    )
      .then(success => {
        // Authenticated Successfully
        this.requestForPurchase(1);
      })
      .catch(error => {
        // Error
        Toast.show({
          text: "We can'n recognize your fingerprint :( please try again.",
          textStyle: {
            fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
            fontSize: responsiveFontSize(1.6),
            fontWeight: "normal",
            fontStyle: "normal",
            color: colors.WHITE
          },
          buttonText: "OK",
          type: "danger",
          duration: 4000
        });
      });
  };

  requestForPurchase = type => {
    const {
      index,
      userToken,
      userPhoneNum,
      userCardNum,
      destination,
      amount,
      description
    } = this.props.navigation.state.params;
    const { passwordInput } = this.state;

    if (type === 1) {
      // User try purchase with fingerprint
      switch (index) {
        case 1: // Transfer with Card Number
        case 3: // Scan QR for Transfer Money
        case 4: {
          // Scan QR for Shopping
          this.setState({ loadingTransferMoney: true });

          axios
            .post(
              strings.API_CARD_TO_CARD,
              {
                type: index,
                fcard: userCardNum,
                tcard: destination,
                amount,
                desc: description,
                pass: passwordInput,
                mobile: userPhoneNum
              },
              {
                headers: {
                  Authorization: `Bearer ${userToken}`,
                  "Content-Type": "application/json"
                }
              }
            )
            .then(response => {
              this.setState({ loadingTransferMoney: false });
              console.log(response.data);
              this.ResultOfBuying(response.data);
            })
            .catch(error => {
              alert("server error");
            });
          break;
        }
        case 2: {
          // Transfer with Phone Number
          this.setState({ loadingTransferMoney: true });

          axios
            .post(
              strings.API_CARD_TO_CARD,
              {
                type: index,
                fcard: userCardNum,
                tncard: destination, // To a Phone number
                amount,
                desc: description,
                pass: passwordInput,
                mobile: userPhoneNum
              },
              {
                headers: {
                  Authorization: `Bearer ${userToken}`,
                  "Content-Type": "application/json"
                }
              }
            )
            .then(response => {
              this.setState({ loadingTransferMoney: false });
              console.log(response.data);
              this.ResultOfBuying(response.data);
            })
            .catch(error => {
              alert("server error");
            });
          break;
        }
      }
    } else if (type === 2) {
      // User try purchase with password input
      this.checkPasswordInput().then(() => {
        const { passwordError } = this.state;

        if (!passwordError) {
          // User entered a valid password, request for purchasing
          switch (index) {
            case 1: // Transfer with Card Number
            case 3: // Scan QR for Transfer Money
            case 4: {
              // Scan QR for Shopping
              this.setState({ loadingTransferMoney: true });

              axios
                .post(
                  strings.API_CARD_TO_CARD,
                  {
                    type: index,
                    fcard: userCardNum,
                    tcard: destination,
                    amount,
                    desc: description,
                    pass: passwordInput,
                    mobile: userPhoneNum
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${userToken}`,
                      "Content-Type": "application/json"
                    }
                  }
                )
                .then(response => {
                  this.setState({ loadingTransferMoney: false });
                  console.log(response.data);
                  this.ResultOfBuying(response.data);
                })
                .catch(error => {
                  alert("server error");
                });
              break;
            }
            case 2: {
              // Transfer with Phone Number
              this.setState({ loadingTransferMoney: true });

              axios
                .post(
                  strings.API_CARD_TO_CARD,
                  {
                    type: index,
                    fcard: userCardNum,
                    tncard: destination, // To a Phone number
                    amount,
                    desc: description,
                    pass: passwordInput,
                    mobile: userPhoneNum
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${userToken}`,
                      "Content-Type": "application/json"
                    }
                  }
                )
                .then(response => {
                  this.setState({ loadingTransferMoney: false });
                  console.log(response.data);
                  this.ResultOfBuying(response.data);
                })
                .catch(error => {
                  alert("server error");
                });
              break;
            }
          }
        }
      });
    }
  };

  ResultOfBuying = response => {
    if (!response) {
      // Password is NOT correct
      this.setState({ isModalPasswordErrorOpen: true });
      alert("password is not correct");
    } else {
      // Transfer money completed. Show receipt
      const {
        userCardNum,
        destination,
        amount,
        description,
        receiverName,
        receiverStatus,
        receiverIndexSaved
      } = this.props.navigation.state.params;
      const { date, time, rid, tcard } = response;

      this.props.navigation.navigate("TransferMoneyReceipt", {
        date,
        time,
        senderCard: userCardNum,
        receiverCard: tcard,
        receiverPhone: destination, // Only for Phone Number Saving
        receiverName,
        receiverStatus,
        receiverIndexSaved,
        amount,
        description,
        refrenceNumber: rid
      });
    }
  };

  render() {
    const {
      index,
      userCardNum,
      userPhoneNum,
      destination,
      amount,
      description
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
              {I18n.t("TransferMoney2.title")}
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
                {I18n.t("TransferMoney2.title")}
              </Text>
            </View>

            <View style={styles.amountRow}>
              <Text allowFontScaling={false} style={styles.amountText}>
                {index === 1 || index === 3 || index === 4
                  ? I18n.t("TransferMoney2.senderCardText")
                  : I18n.t("TransferMoney2.senderPhoneText")}
              </Text>
              <View style={styles.horizontalLine} />
              <Text allowFontScaling={false} style={styles.amount}>
                {index === 1 || index === 3 || index === 4
                  ? userCardNum
                  : userPhoneNum}
              </Text>
            </View>

            <View style={styles.amountRow}>
              <Text allowFontScaling={false} style={styles.amountText}>
                {index === 1 || index === 3 || index === 4
                  ? I18n.t("TransferMoney2.receiverCardText")
                  : I18n.t("TransferMoney2.receiverPhoneText")}
              </Text>
              <View style={styles.horizontalLine} />
              <Text allowFontScaling={false} style={styles.amount}>
                {destination}
              </Text>
            </View>

            <View style={styles.amountRow}>
              <Text allowFontScaling={false} style={styles.amountText}>
                {I18n.t("CreditCardPayRequest.amountText")}
              </Text>
              <View style={styles.horizontalLine} />
              <Text allowFontScaling={false} style={styles.amount}>
                {amount}
              </Text>
            </View>

            <View style={styles.descriptionRow}>
              <Text allowFontScaling={false} style={styles.descriptionText}>
                {I18n.t("TransferMoney2.description")}
              </Text>
              <View style={styles.horizontalLine} />
              <Text allowFontScaling={false} style={styles.description}>
                {description !== "" ? description : " - "}
              </Text>
            </View>
          </View>

          <View style={styles.passwordCard}>
            <Text allowFontScaling={false} style={styles.passwordText}>
              {I18n.t("SIMCharge2.enterPasswordText")}
            </Text>

            <TextInput
              secureTextEntry
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
                    ? `Authenticate with ${biometryType}`
                    : "Your device does not support fingerprint :("}
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
              this.requestForPurchase(2);
            }}
          >
            {this.state.loadingTransferMoney ? (
              <Spinner color={colors.LIGHT_WHITE} />
            ) : (
              <Text
                uppercase={false}
                allowFontScaling={false}
                style={styles.buttonText}
              >
                {I18n.t("CreditCardPayRequest.payButton")}
              </Text>
            )}
          </Button>
        </View>
      </Container>
    );
  }
}

export default TransferMoney2;
