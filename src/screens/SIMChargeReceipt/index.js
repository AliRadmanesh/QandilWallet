import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  NetInfo,
  Clipboard
} from "react-native";
import { Container, Content, Text, Button, Toast } from "native-base";
import firebase, { Notification } from "react-native-firebase";
import Share from "react-native-share";
import ViewShot from "react-native-view-shot";

import I18n from "../../utils/i18n";

import styles from "./styles";
import CustomIcon from "../../utils/customIcons";
import colors from "../../utils/colors";
import strings from "../../utils/strings";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import PersianText from "react-native-persian-text";

const HeaderImagePath = "../../../assets/Icons/App/Transactions/header.png";
const SUCCESS_IMAGE = "../../../assets/Icons/App/Transactions/success.png";

class SIMCharge3 extends Component {
  constructor(props) {
    super(props);

    this.state = { isConnected: true, visible: false };
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

  numberWithCommas = value => {
    const parts = value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  // START: Share functions //
  onCancel() {
    console.log("CANCEL");
    this.setState({ visible: false });
  }

  onOpen() {
    console.log("OPEN");
    this.setState({ visible: true });
  }

  shareReceipt(uri) {
    const shareOptions = {
      title: strings.SHARE_TITLE,
      url: uri,
      subject: strings.SHARE_SUBJECT // For Email & Social Media
    };

    Share.open(shareOptions);
  }
  // END: Share functions //

  writeToClipboard = async chargeCode => {
    await Clipboard.setString(chargeCode.toString());
    // alert('Copied to Clipboard!');
    Toast.show({
      text: strings.COPIED_TO_CLIPBOARD,
      textStyle: { fontSize: responsiveFontSize(2) },
      type: "success",
      buttonText: "OK"
    });
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

  render() {
    const {
      selectedOperator,
      selectedCharge,
      chargeCode
    } = this.props.navigation.state.params;

    return (
      <Container style={styles.container}>
        <ImageBackground
          source={require(HeaderImagePath)}
          style={styles.headerImage}
        >
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Drawer")}
              style={styles.closeIcon}
            >
              <CustomIcon name="cross" size={28} color={colors.WHITE} />
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
          <ViewShot ref="viewShot">
            <View style={styles.cardContainer}>
              <Image
                source={require(SUCCESS_IMAGE)}
                resizeMode="contain"
                style={styles.successImage}
              />
              <Text style={styles.topText}>{I18n.t("SIMCharge3.topText")}</Text>

              <View style={styles.transactionTypeRow}>
                <Text
                  allowFontScaling={false}
                  style={styles.transactionTypeText}
                >
                  {I18n.t("CreditCardPayRequest.transactionTypeText")}
                </Text>
                <View style={styles.horizontalLine} />
                <Text allowFontScaling={false} style={styles.transactionType}>
                  {I18n.t("SIMCharge2.transactionType")}
                </Text>
              </View>

              <View style={styles.amountRow}>
                <Text allowFontScaling={false} style={styles.amountText}>
                  {I18n.t("SIMCharge3.costsText")}
                </Text>
                <View style={styles.horizontalLine} />
                <Text allowFontScaling={false} style={styles.amount}>
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

            <View style={styles.chargeCodeCardContainer}>
              <Text allowFontScaling={false} style={styles.chargeCodeText}>
                {I18n.t("SIMCharge3.chargeCodeText")}
              </Text>
              <Text allowFontScaling={false} style={styles.chargeCode}>
                <PersianText>{chargeCode.toString()}</PersianText>
              </Text>
            </View>
          </ViewShot>

          {/* <View style={styles.shareAndCopyButtonContainer}>
            <Button
              block
              style={styles.shareButton}
              onPress={() =>
                this.refs.viewShot.capture().then(uri => {
                  this.shareReceipt(uri);
                })
              }
            >
              <Text
                uppercase={false}
                allowFontScaling={false}
                style={styles.buttonText}
              >
                {I18n.t("SIMCharge3.shareButton")}
              </Text>
            </Button>

            <Button
              block
              style={styles.copyButton}
              onPress={() => this.writeToClipboard(chargeCode)}
            >
              <Text
                uppercase={false}
                allowFontScaling={false}
                style={styles.buttonText}
              >
                {I18n.t("SIMCharge3.copyButton")}
              </Text>
            </Button>
          </View>

          <View style={styles.directChargeButtonContainer}>
            <Button
              block
              style={styles.directChargeButton}
              onPress={() => null}
            >
              <Text
                uppercase={false}
                allowFontScaling={false}
                style={styles.buttonText}
              >
                {I18n.t("SIMCharge3.directChargeButton")}
              </Text>
            </Button>
          </View> */}
        </Content>
      </Container>
    );
  }
}

export default SIMCharge3;
