import React, { Component } from "react";
import {
  View,
  Image,
  ImageBackground,
  AsyncStorage,
  TouchableOpacity,
  ActivityIndicator,
  NetInfo
} from "react-native";
import { Container, Content, Text } from "native-base";
import { NavigationActions } from "react-navigation";
import axios from "axios"; // 0.17.1
import firebase, { Notification } from "react-native-firebase";
import PersianNumber from "react-native-persian-text";

import ModalHelp from "./ModalHelp";
import ModalRequestError from "../Modals/ModalRequestError";
import ModalServerError from "../Modals/ModalServerError";

import I18n from "../../utils/i18n";

import CustomIcon from "../../utils/customIcons";
import styles from "./styles";
import colors from "../../utils/colors";
import strings from "../../utils/strings";

const HEADER_IMAGE = "../../../assets/Icons/App/Home/Header.png";
const DEFAULT_PROFILE_PHOTO =
  "../../../assets/Icons/App/Home/Profile_default.jpg";
const SIMCHARGE_ICON =
  "../../../assets/Icons/App/Home/main_icons/sim_charge.png";
const TRANSFERMONEY_ICON =
  "../../../assets/Icons/App/Home/main_icons/credit_card.png";
const INTERNET_ICON = "../../../assets/Icons/App/Home/main_icons/wifi.png";
const SHOPPING_ICON = "../../../assets/Icons/App/Home/main_icons/shopping.png";
const CHARITY_ICON = "../../../assets/Icons/App/Home/main_icons/charity.png";
const PAYBILLS_ICON = "../../../assets/Icons/App/Home/main_icons/invoice.png";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      balanceLoading: true,
      currentBalance: "",
      loyaltyPoint: "1290",
      userToken: "",
      userName: "",
      userCardNum: "",
      userPhoneNum: "",
      ImageSource: null,
      isConnected: true,
      notifToken: "",
      isHelpModalVisible: false,
      isModalRequestErrorVisible: false,
      isModalServerErrorVisible: false
    };
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );

    // Get Token, Name, Card number and Phone number from AsyncStorage
    this.bootstrapAsync();
    this.setNotificationConfigs();
    this.getNotifToken();

    // Receive Notification from server (if there is any)
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        // Build a channel
        const channel = new firebase.notifications.Android.Channel(
          "Iraq Payment",
          "Test Channel",
          firebase.notifications.Android.Importance.Max
        ).setDescription("IraqPayment Channel");

        // Create the channel
        firebase.notifications().android.createChannel(channel);

        // Process your notification as required
        const newNotification = new firebase.notifications.Notification()
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title ? notification.title : "Iraq Payment")
          .setBody(notification.body)
          .setSound(notification.sound ? notification.sound : "default");

        // Android-specific properties
        newNotification.android
          .setChannelId(
            notification.channelId ? notification.channelId : "Iraq Payment"
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
    this.setState({
      isModalRequestErrorVisible: false,
      isModalServerErrorVisible: false,
      balanceLoading: false
    });
  }

  handleConnectivityChange = isConnected => {
    this.setState({ isConnected });
  };

  getNotifToken() {
    let FCM = firebase.messaging();
    FCM.getToken().then(token => {
      // stores the token in DB
      this.setState({ notifToken: token });
    });
  }

  getImage = async () => {
    const path = await AsyncStorage.getItem("ProfileImagePath");

    if (path != null) {
      const source = { uri: path };
      this.setState({ ImageSource: source });
    } else {
      const source = require(DEFAULT_PROFILE_PHOTO);
      this.setState({ ImageSource: source });
    }
  };

  getBalance() {
    const { userToken, userCardNum, userPhoneNum } = this.state;
    this.setState({ balanceLoading: true });

    axios({
      method: "post",
      url: strings.API_GET_BALANCE,
      timeout: 1000 * 10, // Wait for 10 seconds
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`
      },
      data: {
        id: userCardNum,
        mobile: userPhoneNum
      }
    })
      .then(response => {
        // console.log(response.data);
        this.setState({
          currentBalance: response.data,
          balanceLoading: false
        });
      })
      .catch(error => {
        // console.log("error", error);
        this.setState({
          balanceLoading: false,
          currentBalance: "-",
          isModalServerErrorVisible: true
        });
      });
  }

  bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    const userName = await AsyncStorage.getItem("userName");
    const userCardNum = await AsyncStorage.getItem("userCardNum");
    const userPhoneNum = await AsyncStorage.getItem("userPhoneNum");
    this.setState({
      userToken: userToken,
      userName: userName,
      userCardNum: userCardNum,
      userPhoneNum: userPhoneNum
    });

    if (AsyncStorage.getItem("userNotifToken")) {
      this.notifTokenFlag = await AsyncStorage.getItem("userNotifToken");
    }

    // Get Balance And Buttons & Profile Image
    this.getBalance();
    this.sendLog(1);
    this.getImage();
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

  setNotificationConfigs() {
    if (!this.notifTokenFlag) {
      this.sendNotifTokenToServer(
        this.state.userPhoneNum,
        this.state.notifToken
      );
    }

    let FCM = firebase.messaging();
    firebase
      .messaging()
      .hasPermission()
      .then(enabled => {
        //       FCM.getToken().then(token => {
        //  // stores the token in DB
        // });
        if (enabled) {
          // user has permissions
          // gets the device's push token
          FCM.getToken().then(token => {
            // stores the token in DB
          });
        } else {
          // user doesn't have permission
          firebase
            .messaging()
            .requestPermission()
            .then(() => {
              // User has authorised
              // alert("Now you can receive notifications!");
            })
            .catch(error => {
              // User has rejected permissions
              // alert(
              //   "Unfortunately you rejected our request for receiving notifications. To enable this feature go to phone Settings > General > IraqPayment > AllowPermission..."
              // );
            });
        }
      });
  }

  sendNotifTokenToServer = (phoneNumber, notifToken) => {
    const { isConnected, userToken } = this.state;

    if (isConnected) {
      axios({
        method: "post",
        url: strings.API_SEND_NOTIF_TOKEN,
        timeout: 1000 * 10, // Wait for 10 seconds
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`
        },
        data: {
          mobile: phoneNumber,
          notif_token: notifToken
        }
      })
        .then(async response => {
          // console.log("response.data", response.data);
          if (response.data === 1) {
            await AsyncStorage.setItem("userNotifToken", notifToken);
          }
        })
        .catch(error => {
          // console.log("error", error);
        });
    }
  };

  numberWithCommas = value => {
    const parts = value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  numberWithSpace = value => {
    const parts = value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{4})+(?!\d))/g, " ");
    return parts.join(".");
  };

  preventDoubleTap = (component, doFunc) => {
    if (!component.wasClickedYet) {
      component.wasClickedYet = true;
      setTimeout(() => {
        component.wasClickedYet = false;
      }, 1000);
      doFunc();
    }
  };

  renderLoyaltyPoint() {
    const { balanceLoading, loyaltyPoint } = this.state;

    // if (balanceLoading) {
    //   return (
    //     <View style={styles.balanceSpinnerContainer}>
    //       <ActivityIndicator
    //         size="small"
    //         color={colors.SPINNER_COLOR}
    //         style={styles.balanceSpinner}
    //       />
    //     </View>
    //   );
    // } else {
    return (
      <View style={styles.loyaltyPointView}>
        <Text allowFontScaling={false} style={styles.BalanceText}>
          <PersianNumber>{this.numberWithCommas(loyaltyPoint)}</PersianNumber>
        </Text>
        <Text allowFontScaling={false} style={styles.BalanceUnit}>
          {" امتیاز"}
        </Text>
      </View>
    );
    // }
  }

  renderBalance() {
    const { balanceLoading, currentBalance } = this.state;

    if (balanceLoading) {
      return (
        <View style={styles.balanceSpinnerContainer}>
          <ActivityIndicator
            size="small"
            color={colors.SPINNER_COLOR}
            style={styles.balanceSpinner}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.currentBalanceView}>
          <Text allowFontScaling={false} style={styles.BalanceText}>
            <PersianNumber>
              {this.numberWithCommas(currentBalance)}
            </PersianNumber>
          </Text>
          <Text allowFontScaling={false} style={styles.BalanceUnit}>
            {" ریال"}
          </Text>
        </View>
      );
    }
  }

  goToAnotherScreen(index) {
    const { userToken, userName, userCardNum, userPhoneNum } = this.state;

    switch (index) {
      case 1:
        let navigateAction = NavigationActions.navigate({
          routeName: "SIMCharge1",
          params: {
            index,
            userToken,
            userName,
            userCardNum,
            userPhoneNum
          }
        });
        this.props.navigation.dispatch(navigateAction);
        //Send log to server
        this.sendLog(6);
        break;

      case 2:
        navigateAction = NavigationActions.navigate({
          routeName: "TransferMoney1",
          params: {
            index,
            userToken,
            userName,
            userCardNum,
            userPhoneNum
          }
        });
        this.props.navigation.dispatch(navigateAction);
        //Send log to server
        this.sendLog(7);
        break;

      case 3:
        navigateAction = NavigationActions.navigate({
          routeName: "Shopping",
          params: {
            index,
            userToken,
            userName,
            userCardNum,
            userPhoneNum
          }
        });
        this.props.navigation.dispatch(navigateAction);
        //Send log to server
        this.sendLog(8);
        break;

      case 4:
        navigateAction = NavigationActions.navigate({
          routeName: "Internet",
          params: {
            index,
            userToken,
            userName,
            userCardNum,
            userPhoneNum
          }
        });
        this.props.navigation.dispatch(navigateAction);
        //Send log to server
        this.sendLog(12);
        break;

      case 5:
        navigateAction = NavigationActions.navigate({
          routeName: "PayBills",
          params: {
            index,
            userToken,
            userName,
            userCardNum,
            userPhoneNum
          }
        });
        this.props.navigation.dispatch(navigateAction);
        //Send log to server
        this.sendLog(10);
        break;

      case 6:
        navigateAction = NavigationActions.navigate({
          routeName: "Charity",
          params: {
            index,
            userToken,
            userName,
            userCardNum,
            userPhoneNum
          }
        });
        this.props.navigation.dispatch(navigateAction);
        //Send log to server
        this.sendLog(9);
        break;

      case 7:
        navigateAction = NavigationActions.navigate({
          routeName: "Recharge",
          params: {
            index,
            userToken,
            userName,
            userCardNum,
            userPhoneNum
          }
        });
        this.props.navigation.dispatch(navigateAction);
        //Send log to server
        this.sendLog(10);
        break;
    }
  }

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
          <ImageBackground
            source={require(HEADER_IMAGE)}
            style={styles.headerImage}
          >
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.openDrawer();
                  this.sendLog(2);
                }}
                style={styles.menuIcon}
              >
                <CustomIcon name="menu" size={24} color={colors.WHITE} />
              </TouchableOpacity>

              <Text allowFontScaling={false} style={styles.titleText}>
                {I18n.t("Home.title")}
              </Text>

              <TouchableOpacity
                onPress={() => this.setState({ isHelpModalVisible: true })}
                style={styles.helpIcon}
              >
                <CustomIcon name="help" size={24} color={colors.WHITE} />
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: "center" }}>
              <View style={styles.profileImageContainer}>
                {this.state.ImageSource === null ? (
                  <Image
                    style={styles.profileImageStyle}
                    source={require(DEFAULT_PROFILE_PHOTO)}
                  />
                ) : (
                  <Image
                    style={styles.profileImageStyle}
                    source={this.state.ImageSource}
                  />
                )}
              </View>

              <Text allowFontScaling={false} style={styles.userName}>
                {this.state.userName}
              </Text>

              <View style={styles.currentBalanceContainer}>
                <View style={{ justifyContent: "flex-start" }}>
                  <Text
                    allowFontScaling={false}
                    style={styles.currentBalanceText}
                  >
                    {I18n.t("Home.currentBalance")}
                  </Text>
                </View>
                {this.renderBalance()}
              </View>

              <View style={styles.loyaltyPointContainer}>
                <View style={{ justifyContent: "flex-start" }}>
                  <Text
                    allowFontScaling={false}
                    style={styles.loyaltyPointText}
                  >
                    {I18n.t("Home.loyaltyPoint")}
                  </Text>
                </View>
                {this.renderLoyaltyPoint()}
              </View>

              <View style={styles.rechargeAndRefreshButtons}>
                <TouchableOpacity
                  onPress={() =>
                    this.preventDoubleTap(this, () => this.goToAnotherScreen(6))
                  }
                  style={styles.customeClubButton}
                >
                  <Text
                    allowFontScaling={false}
                    style={styles.rechargeButtonText}
                  >
                    {I18n.t("Home.customerClubButtonText")}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    this.preventDoubleTap(this, () => this.goToAnotherScreen(7))
                  }
                  style={styles.rechargeButton}
                >
                  <Text
                    allowFontScaling={false}
                    style={styles.rechargeButtonText}
                  >
                    {I18n.t("Home.rechargeButtonText")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>

          <View style={styles.content}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.mainButtonContainer}
                onPress={() =>
                  this.preventDoubleTap(this, () => this.goToAnotherScreen(1))
                }
              >
                <View style={styles.mainButtonStyle}>
                  <Image
                    source={require(SIMCHARGE_ICON)}
                    style={styles.SIMChargeIcon}
                    resizeMode="contain"
                  />
                  <Text allowFontScaling={false} style={styles.mainButtonText}>
                    {I18n.t("Home.mainButtons.SIMCharge")}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.mainButtonContainer}
                onPress={() =>
                  this.preventDoubleTap(this, () => this.goToAnotherScreen(2))
                }
              >
                <View style={styles.mainButtonStyle}>
                  <Image
                    source={require(TRANSFERMONEY_ICON)}
                    style={styles.transferMoneyIcon}
                    resizeMode="contain"
                  />
                  <Text allowFontScaling={false} style={styles.mainButtonText}>
                    {I18n.t("Home.mainButtons.transferMoney")}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.mainButtonContainer}
                onPress={() =>
                  this.preventDoubleTap(this, () => this.goToAnotherScreen(4))
                }
              >
                <View style={styles.mainButtonStyle}>
                  <Image
                    source={require(INTERNET_ICON)}
                    style={styles.internetIcon}
                    resizeMode="contain"
                  />
                  <Text allowFontScaling={false} style={styles.mainButtonText}>
                    {I18n.t("Home.mainButtons.internet")}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.mainButtonContainer}
                onPress={() =>
                  this.preventDoubleTap(this, () => this.goToAnotherScreen(3))
                }
              >
                <View style={styles.mainButtonStyle}>
                  <Image
                    source={require(SHOPPING_ICON)}
                    style={styles.shoppingIcon}
                    resizeMode="contain"
                  />
                  <Text allowFontScaling={false} style={styles.mainButtonText}>
                    {I18n.t("Home.mainButtons.shopping")}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.mainButtonContainer}
                onPress={() =>
                  this.preventDoubleTap(this, () => this.goToAnotherScreen(5))
                }
              >
                <View style={styles.mainButtonStyle}>
                  <Image
                    source={require(PAYBILLS_ICON)}
                    style={styles.payBillsIcon}
                    resizeMode="contain"
                  />
                  <Text allowFontScaling={false} style={styles.mainButtonText}>
                    {I18n.t("Home.mainButtons.payBills")}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.mainButtonContainer}
                onPress={() =>
                  this.preventDoubleTap(this, () => this.goToAnotherScreen(6))
                }
              >
                <View style={styles.mainButtonStyle}>
                  <Image
                    source={require(CHARITY_ICON)}
                    style={styles.giftCardIcon}
                    resizeMode="contain"
                  />
                  <Text allowFontScaling={false} style={styles.mainButtonText}>
                    {I18n.t("Home.mainButtons.giftCard")}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Home;
