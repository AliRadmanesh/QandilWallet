import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  ImageBackground,
  NetInfo,
  AsyncStorage
} from "react-native";
import { Container, Content, Text, Button } from "native-base";
import firebase, { Notification } from "react-native-firebase";
import ScrollableTabView from "react-native-scrollable-tab-view";

import CardTab from "./CardTab";
import QRCodeTab from "./QRCodeTab";

import I18n from "../../utils/i18n";

import styles from "./styles";
import CustomIcon from "../../utils/customIcons";
import colors from "../../utils/colors";
import strings from "../../utils/strings";

const HeaderImagePath = "../../../assets/Icons/App/Transactions/header.png";

class MyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: "",
      userName: "",
      userCardNum: "",
      userPhoneNum: "",
      isPressed: false,
      loading: false,
      isConnected: true
    };
  }

  componentDidMount() {
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
  };

  async sendLog(Type) {
    if (this.state.isConnected) {
      try {
        let response = null;

        response = await axios.post(
          strings.API_SEND_LOG,
          {
            mobile: this.state.userPhoneNum,
            type: Type
          },
          {
            headers: {
              Authorization: `Bearer ${this.state.userToken}`,
              "Content-Type": "application/json"
            }
          }
        );
        // Don't show anything. Just send it!
        // alert(response.data);
      } catch (e) {
        // Don't show anything. Just send it!
        // alert(e);
      }
    }
  }

  render() {
    const { userName, userCardNum, userPhoneNum } = this.state;
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
              <CustomIcon name="cross" size={26} color={colors.WHITE} />
            </TouchableOpacity>

            <Text allowFontScaling={false} style={styles.titleText}>
              {I18n.t("MyCardQRCode.title")}
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
          {/* <ViewShot style={styles.Card} ref="viewShot">
             <View style={styles.ali}>
              <View style={styles.cardTop}>
                <Image
                  source={require("../../../assets/Icons/Icon.png")}
                  style={styles.CardHeaderIcon}
                />

                <Text style={styles.CardHeaderText} allowFontScaling={false}>
                  IP Card
                </Text>
              </View>

              <View style={styles.CardNumberContainer}>
                <Text style={styles.CardNumberText} allowFontScaling={false}>
                  {this.spacedCardNumber(userCardNum, 4).join(" ")}
                </Text>
              </View>

              <View style={styles.CardBottom}>
                <View style={styles.nameAndPhone}>
                  <Text
                    allowFontScaling={false}
                    style={
                      this.isNameLong(userName)
                        ? styles.CardNameText
                        : styles.CardNameTextBig
                    }
                  >
                    {userName}
                  </Text>

                  <Text
                    allowFontScaling={false}
                    style={
                      this.isNameLong(userName)
                        ? styles.CardNameText
                        : styles.CardNameTextBig
                    }
                  >
                    {userPhoneNum}
                  </Text>
                </View>

                <View style={styles.qrBorder}>
                  <QRCode
                    value={this.state.QRtext}
                    size={70}
                    bgColor={colors.BLACK}
                    fgColor={colors.WHITE}
                  />
                </View>
              </View>
            </View> 
          </ViewShot> */}

          {/* <View style={styles.bottomInfoContainer}>
            <Text style={styles.bottomText} allowFontScaling={false}>
              {I18n.t("MyCard.description")}
            </Text>

            <View style={styles.shareButtonContainer}>
              <View>
                <Button
                  info
                  block
                  iconLeft
                  style={styles.shareButton}
                  onPress={() => {
                    this.sendLog(44);
                    this.refs.viewShot.capture().then(uri => {
                      this.shareReceipt(uri);
                    });
                  }}
                >
                  <Icon name="share" />
                  <Text allowFontScaling={false} style={styles.buttonText}>
                    {I18n.t("MyCard.shareButtonText")}
                  </Text>
                </Button>
              </View>
            </View>
          </View> */}

          <View style={styles.cardContainer}>
            {/* <View style={styles.mapImageContainer}>
              <Image source={require(MAP_IMAGE)} style={styles.mapImage} />
            </View>

            <View style={styles.placeAddressRow}>
              <CustomIcon
                name="map-pin"
                size={18}
                color={colors.BLACK}
                style={styles.placeAddressIcon}
              />
              <Text allowFontScaling={false} style={styles.placeAddressText}>
                {strings.CONTACT_US_ADDRESS}
              </Text>
            </View>

            <View style={styles.placePhoneRow}>
              <CustomIcon name="phone" size={18} color={colors.BLACK} />
              <Text
                allowFontScaling={false}
                style={styles.placePhoneText}
                onPress={() =>
                  this.openURL(this.returnCallCommand("07729876100"))
                }
              >
                {strings.CONTACT_US_PHONE_NUMBERS}
              </Text>
            </View>

            <View style={styles.placeEmailRow}>
              <CustomIcon
                name="messages"
                size={14}
                color={colors.BLACK}
                style={styles.placeEmailIcon}
              />
              <Text
                allowFontScaling={false}
                style={styles.placeEmailText}
                onPress={() => this.openURL("mailto:info@iraqpayment.com")}
              >
                {strings.CONTACT_US_EMAIL}
              </Text>
            </View>

            <View style={styles.placeSiteRow}>
              <CustomIcon name="website" size={18} color={colors.BLACK} />
              <Text
                allowFontScaling={false}
                style={styles.placeSiteText}
                onPress={() => this.openURL(strings.CONTACT_US_WEBSITE)}
              >
                {strings.CONTACT_US_WEBSITE}
              </Text>
            </View>

            <View style={styles.socialMediaRow}>
              <TouchableOpacity
                onPress={() => this.openURL("https://facebook.com/iraqpayment")}
              >
                <Image
                  source={require(FACEBOOK_LOGO)}
                  style={styles.facebookLogo}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  this.openURL("https://chats.viber.com/iraqpayment")
                }
              >
                <Image source={require(VIBER_LOGO)} style={styles.viberLogo} />
              </TouchableOpacity>
            </View> */}

            <ScrollableTabView
              initialPage={0}
              tabBarUnderlineStyle={{ backgroundColor: "#fff" }}
              style={styles.tabViewStyle}
              tabBarTextStyle={styles.tabTextStyle}
              tabBarActiveTextColor={colors.GREEN_BUTTONS}
              tabBarInactiveTextColor={colors.LIGHT_BLACK}
            >
              <CardTab
                tabLabel="Card"
                userCardNumber={userCardNum}
                userPhoneNumber={userPhoneNum}
                username={userName}
              />
              <QRCodeTab
                tabLabel="QR Code"
                userCardNumber={userCardNum}
                userPhoneNumber={userPhoneNum}
                username={userName}
              />
            </ScrollableTabView>
          </View>
        </Content>
      </Container>
    );
  }
}

export default MyCard;
