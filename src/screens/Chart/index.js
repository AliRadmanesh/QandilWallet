import React, { Component } from "react";
import {
  View,
  Linking,
  Platform,
  Image,
  TouchableOpacity,
  ImageBackground,
  NetInfo,
  I18nManager
} from "react-native";
import { Container, Content, Text, Button } from "native-base";
import firebase, { Notification } from "react-native-firebase";

import I18n from "../../utils/i18n";

import styles from "./styles";
import CustomIcon from "../../utils/customIcons";
import colors from "../../utils/colors";
import strings from "../../utils/strings";

const HeaderImagePath = "../../../assets/Icons/App/Transactions/header.png";
const CHART_IMAGE = "../../../assets/Icons/App/Chart/chart.png";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageText: "",
      isPressed: false,
      loading: false,
      isConnected: true
    };
  }

  componentDidMount() {
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

  returnCallCommand(phoneNumber) {
    if (Platform.OS === "android") {
      const commandAndroid = `tel:${phoneNumber}`;
      return commandAndroid;
    } else if (Platform.OS === "ios") {
      const commandIOS = `telprompt:${phoneNumber}`;
      return commandIOS;
    }
  }

  goToAnotherScreen = () => {
    // Go to Chart Screen
    this.props.navigation.navigate("PayBills");
  };

  render() {
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
              {I18n.t("Chart.title")}
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
            <Image source={require(CHART_IMAGE)} style={styles.logo} />

            <Text allowFontScaling={false} style={styles.bodyText}>
              شخصیت شما:
            </Text>
            <Text allowFontScaling={false} style={styles.headerText}>
              متعادل
            </Text>
            <Text allowFontScaling={false} style={styles.bodyText}>
              شخصیت شما متعادل می باشد و ریسک پذیری شما در حد متوسط است.
              بنابراین شما می توانید هم در صندوق های سرمایه گذاری ثابت و هم تا
              حدودی در صندوق های متغیر سرمایه گذاری کنید.
            </Text>
          </View>
        </Content>
        <View style={styles.buttonContainer}>
          <Button
            block
            style={styles.nextButton}
            onPress={() => this.goToAnotherScreen()}
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
      </Container>
    );
  }
}

export default Chart;
