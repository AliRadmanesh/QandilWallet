import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
  NetInfo,
  ImageBackground,
  ActivityIndicator,
  I18nManager
} from "react-native";
import { Container, Text } from "native-base";
import { NavigationActions } from "react-navigation";
import ImagePicker from "react-native-image-picker";
import axios from "axios"; // 0.17.1
import firebase, { Notification } from "react-native-firebase";
import ScrollableTabView from "react-native-scrollable-tab-view";
import PersianNumber from "react-native-persian-text";

import I18n from "../../utils/i18n";

import CustomIcon from "../../utils/customIcons";
import styles from "./styles";
import colors from "../../utils/colors";
import strings from "../../utils/strings";

import InfoTab from "./InfoTab";
import ChangePassTab from "./ChangePassTab";
import ForgetPassTab from "./ForgetPassTab";

import ModalHelp from "./ModalHelp";
import ModalRequestError from "../Modals/ModalRequestError";
import ModalServerError from "../Modals/ModalServerError";

const HEADER_IMAGE = "../../../assets/Icons/App/Home/Header.png";
const DEFAULT_PROFILE_IMAGE =
  "../../../assets/Icons/App/Home/Profile_default.jpg";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ImageSource: null,
      currentBalance: "",
      loyaltyPoint: "1290",
      userToken: "",
      userName: "",
      userCardNum: "",
      userPhoneNum: "",
      isConnected: true,
      isHelpModalVisible: false,
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
    this.setState({
      userToken: userToken,
      userName: userName,
      userCardNum: userCardNum,
      userPhoneNum: userPhoneNum
    });

    this.getBalance();
    this.getImage();
  };

  getImage = async () => {
    const path = await AsyncStorage.getItem("ProfileImagePath");

    if (path != null) {
      const source = { uri: path };
      this.setState({ ImageSource: source });
    } else {
      const source = require(DEFAULT_PROFILE_IMAGE);
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

  selectPhotoTapped() {
    // this.sendLog(37);
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      mediaType: "photo",
      cameraType: "front",
      title: "تصویر پروفایل",
      takePhotoButtonTitle: "استفاده از دوربین",
      chooseFromLibraryButtonTitle: "انتخاب از گالری",
      customButtons: [{ name: "remove", title: "حذف تصویر پروفایل" }],
      storageOptions: {
        skipBackup: true, // If true, the photo will NOT be backed up to iCloud
        path: "images" // If set, will save the image at Documents/[path]/ rather than the root Documents for iOS, and Pictures/[path]/ on Android.
      },
      permissionDenied: {
        reTryTitle: "فعال سازی",
        okTitle: "لغو"
      }
    };
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        // console.log("User cancelled photo picker");
      } else if (response.error) {
        // console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton === "remove") {
        // console.log("User tapped custom button: ", response.customButton);
        if (this.state.ImageSource !== null) {
          AsyncStorage.removeItem("ProfileImagePath").then(() =>
            this.setState({ ImageSource: null })
          );
        }
      } else {
        const source = { uri: response.uri };
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({ ImageSource: source });
        // Save that Image in the local folder
        AsyncStorage.setItem("ProfileImagePath", response.uri);
      }
    });
  }

  spacedCardNumber(str, n) {
    const ret = [];
    let i;
    let len;

    for (i = 0, len = str.length; i < len; i += n) {
      ret.push(str.substr(i, n));
    }
    return ret;
  }

  numberWithCommas = value => {
    const parts = value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

  goToAnotherScreen(index) {
    switch (index) {
      case 7:
        navigateAction = NavigationActions.navigate({
          routeName: "Recharge",
          params: {
            Index: index,
            userToken: this.state.userToken,
            userName: this.state.userName,
            userCardNum: this.state.userCardNum,
            userPhoneNum: this.state.userPhoneNum
          }
        });
        this.props.navigation.dispatch(navigateAction);
        //Send log to server
        this.sendLog(10);
        break;
    }
  }

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
          <Text allowFontScaling={false} style={styles.BalanceText}>
            <PersianNumber>
              {this.numberWithCommas(this.state.currentBalance)}
            </PersianNumber>
          </Text>
          <Text allowFontScaling={false} style={styles.BalanceUnit}>
            {" ریال"}
          </Text>
        </View>
      );
    }
  }

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
    const { userToken, userName, userPhoneNum, userCardNum } = this.state;
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
              {I18n.t("Profile.title")}
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
              <TouchableOpacity onPress={() => this.selectPhotoTapped()}>
                <Image
                  style={styles.profileImageStyle}
                  source={
                    this.state.ImageSource === null
                      ? require(DEFAULT_PROFILE_IMAGE)
                      : this.state.ImageSource
                  }
                />
              </TouchableOpacity>
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
                <Text allowFontScaling={false} style={styles.loyaltyPointText}>
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

        <View style={styles.cardContainer}>
          <ScrollableTabView
            locked
            initialPage={0}
            tabBarUnderlineStyle={
              I18nManager.isRTL
                ? { backgroundColor: "#fff" }
                : styles.tabBarUnderlineStyle
            }
            style={styles.tabViewStyle}
            tabBarTextStyle={styles.tabTextStyle}
            tabBarActiveTextColor={colors.GREEN_BUTTONS}
            tabBarInactiveTextColor={colors.LIGHT_BLACK}
          >
            <InfoTab
              tabLabel={I18n.t("Profile.tabsTitle.information")}
              userCardNum={userCardNum}
              userPhoneNum={userPhoneNum}
              userName={userName}
              userToken={userToken}
            />
            <ChangePassTab
              tabLabel={I18n.t("Profile.tabsTitle.changePassword")}
              userCardNum={userCardNum}
              userPhoneNum={userPhoneNum}
              userName={userName}
              userToken={userToken}
            />
            <ForgetPassTab
              tabLabel={I18n.t("Profile.tabsTitle.forgetPassword")}
              userCardNum={userCardNum}
              userPhoneNum={userPhoneNum}
              userName={userName}
              userToken={userToken}
            />
          </ScrollableTabView>
        </View>

        {/* <Tabs
          initialPage={0}
          locked={true}
          tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
          style={styles.tabsStyle}
        >
          <Tab
            allowFontScaling={false}
            heading={I18n.t("Profile.tabsTitle.information")}
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            textStyle={styles.tabTextStyle}
            activeTextStyle={styles.tabActiveTextStyle}
          >
            <InfoTab />
          </Tab>
          <Tab
            allowFontScaling={false}
            heading={I18n.t("Profile.tabsTitle.changePassword")}
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            textStyle={styles.tabTextStyle}
            activeTextStyle={styles.tabActiveTextStyle}
          >
            <ChangePassTab />
          </Tab>
          <Tab
            allowFontScaling={false}
            heading={I18n.t("Profile.tabsTitle.forgetPassword")}
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            textStyle={styles.tabTextStyle}
            activeTextStyle={styles.tabActiveTextStyle}
          >
            <ForgetPassTab />
          </Tab>
        </Tabs> */}
      </Container>
    );
  }
}

export default Profile;
