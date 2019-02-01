import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  NetInfo,
  AsyncStorage
} from "react-native";
import { Container, Content, Text, Button, CheckBox } from "native-base";
import firebase, { Notification } from "react-native-firebase";
import Share from "react-native-share";
import ViewShot from "react-native-view-shot";

import I18n from "../../utils/i18n";

import styles from "./styles";
import CustomIcon from "../../utils/customIcons";
import colors from "../../utils/colors";
import strings from "../../utils/strings";

const HeaderImagePath = "../../../assets/Icons/App/Transactions/header.png";
const SUCCESS_IMAGE = "../../../assets/Icons/App/Transactions/success.png";

class TransferMoneyReceipt extends Component {
  constructor(props) {
    super(props);

    this.state = { isConnected: true, visible: false, isDestInfoSaved: true };
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

    this.checkForInfoSaving();
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

  spacedCardNumber(str, n) {
    const ret = [];
    let i;
    let len;

    for (i = 0, len = str.length; i < len; i += n) {
      ret.push(str.substr(i, n));
    }
    return ret;
  }

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

  async checkForInfoSaving() {
    const { isDestInfoSaved } = this.state;
    const {
      receiverCard,
      receiverPhone,
      receiverName,
      receiverStatus,
      receiverIndexSaved
    } = this.props.navigation.state.params;
    console.log(receiverStatus);

    switch (receiverStatus) {
      case 1: {
        if (receiverPhone === receiverCard) {
          // It's a new CARD number. if user wants, save it!
          console.log("new CARD");
          if (isDestInfoSaved) {
            // Save that card
            const numberOfCards = await AsyncStorage.getItem("@numberOfCards");
            if (numberOfCards !== null) {
              const lastSaved = await AsyncStorage.getItem(
                `cardNumber${numberOfCards}`
              );
              if (lastSaved !== receiverCard.toString()) {
                // We have other saved cards
                const newNumberOfCards = parseInt(numberOfCards) + 1;
                await AsyncStorage.setItem(
                  "@numberOfCards",
                  newNumberOfCards.toString()
                );
                await AsyncStorage.setItem(
                  `@cardNumber${newNumberOfCards}`,
                  receiverCard.toString()
                );
                await AsyncStorage.setItem(
                  `@cardName${newNumberOfCards}`,
                  receiverName.toString()
                );
                // console.log("done!!!");
                console.log("print 2");
                console.log("print", numberOfCards, newNumberOfCards);
              }
            } else {
              console.log("print 3");
              // It's the first card to be saved!
              await AsyncStorage.setItem("@numberOfCards", "1");
              await AsyncStorage.setItem(
                "@cardNumber1",
                receiverCard.toString()
              );
              await AsyncStorage.setItem("@cardName1", receiverName.toString());
            }
          } else {
            // Don't save that card (delete it)
            const numberOfCards = await AsyncStorage.getItem("@numberOfCards");
            console.log("numberOfCards", numberOfCards);
            if (parseInt(numberOfCards) === 1) {
              // First card and user don't want to save it
              await AsyncStorage.removeItem("@numberOfCards");
              await AsyncStorage.removeItem("@cardNumber1");
              await AsyncStorage.removeItem("@cardName1");
            } else {
              // just delete the last card and subtract 1 from numberOfCards
              const newNumberOfCards = parseInt(numberOfCards) - 1;
              await AsyncStorage.setItem(
                "@numberOfCards",
                newNumberOfCards.toString()
              );
              await AsyncStorage.removeItem(
                `@cardNumber${parseInt(numberOfCards)}`
              );
              await AsyncStorage.removeItem(
                `@cardName${parseInt(numberOfCards)}`
              );
            }
          }
        } else {
          // It's a new PHONE number. if user wants, save it!
          console.log("new PHONE");

          if (isDestInfoSaved) {
            // Save that phone
            const numberOfPhones = await AsyncStorage.getItem(
              "@numberOfPhones"
            );
            if (numberOfPhones !== null) {
              const lastSaved = await AsyncStorage.getItem(
                `phoneNumber${numberOfPhones}`
              );
              if (lastSaved !== receiverPhone.toString()) {
                // We have other saved phones
                const newNumberOfPhones = parseInt(numberOfPhones) + 1;
                await AsyncStorage.setItem(
                  "@numberOfPhones",
                  newNumberOfPhones.toString()
                );
                await AsyncStorage.setItem(
                  `@phoneNumber${newNumberOfPhones}`,
                  receiverPhone.toString()
                );
                await AsyncStorage.setItem(
                  `@cardName${newNumberOfPhones}`,
                  receiverName.toString()
                );
                // console.log("done!!!");
                console.log("print 2");
                console.log("print", numberOfPhones, newNumberOfPhones);
              }
            } else {
              console.log("print 3");
              // It's the first phone to be saved!
              await AsyncStorage.setItem("@numberOfPhones", "1");
              await AsyncStorage.setItem(
                "@phoneNumber1",
                receiverPhone.toString()
              );
              await AsyncStorage.setItem("@cardName1", receiverName.toString());
            }
          } else {
            // Don't save that phone (delete it)
            const numberOfPhones = await AsyncStorage.getItem(
              "@numberOfPhones"
            );
            console.log("numberOfPhones", numberOfPhones);
            if (parseInt(numberOfPhones) === 1) {
              // First phone and user don't want to save it
              await AsyncStorage.removeItem("@numberOfPhones");
              await AsyncStorage.removeItem("@phoneNumber1");
              await AsyncStorage.removeItem("@cardName1");
            } else {
              // just delete the last phone and subtract 1 from numberOfPhones
              const newNumberOfPhones = parseInt(numberOfPhones) - 1;
              await AsyncStorage.setItem(
                "@numberOfPhones",
                newNumberOfPhones.toString()
              );
              await AsyncStorage.removeItem(
                `@phoneNumber${parseInt(numberOfPhones)}`
              );
              await AsyncStorage.removeItem(
                `@cardName${parseInt(numberOfPhones)}`
              );
            }
          }
        }
        break;
      }
      case 2: {
        console.log("print 4");
        // It's a saved card number but receiver had changed his/her name. so save the new name!
        await AsyncStorage.setItem(
          `@cardName${parseInt(receiverIndexSaved)}`,
          receiverName
        );
        break;
      }
      case 3: {
        console.log("print 5");
        // Don't save/remove any keys
        break;
      }
      default: {
        console.log("print 6");
        // Same as 3, don't do anything!
        break;
      }
    }
  }

  renderSaveCardNumberCheckBox = receiverStatus => {
    if (receiverStatus === 1) {
      return (
        <View style={styles.checkBoxContainer}>
          <CheckBox
            checked={this.state.isDestInfoSaved}
            color={colors.GREEN_BUTTONS}
            style={styles.checkBox}
            onPress={() =>
              this.setState(
                { isDestInfoSaved: !this.state.isDestInfoSaved },
                () => this.checkForInfoSaving()
              )
            }
          />
          <Text allowFontScaling={false} style={styles.saveReceiverCardText}>
            {I18n.t("TransferMoney3.saveReceiverCardText")}
          </Text>
        </View>
      );
    }
  };

  render() {
    const {
      date,
      time,
      senderCard,
      receiverCard,
      receiverStatus,
      amount,
      description,
      refrenceNumber
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
                  {I18n.t("TransferMoney2.title")}
                </Text>
              </View>

              <View style={styles.amountRow}>
                <Text allowFontScaling={false} style={styles.amountText}>
                  {I18n.t("TransferMoney3.dateAndTimeText")}
                </Text>
                <View style={styles.horizontalLine} />
                <Text allowFontScaling={false} style={styles.amount}>
                  {date} - {time}
                </Text>
              </View>

              <View style={styles.amountRow}>
                <Text allowFontScaling={false} style={styles.amountText}>
                  {I18n.t("TransferMoney2.senderCardText")}
                </Text>
                <View style={styles.horizontalLine} />
                <Text allowFontScaling={false} style={styles.amount}>
                  {this.spacedCardNumber(senderCard, 4).join(" - ")}
                </Text>
              </View>

              <View style={styles.amountRow}>
                <Text allowFontScaling={false} style={styles.amountText}>
                  {I18n.t("TransferMoney2.receiverCardText")}
                </Text>
                <View style={styles.horizontalLine} />
                <Text allowFontScaling={false} style={styles.amount}>
                  {this.spacedCardNumber(receiverCard, 4).join(" - ")}
                </Text>
              </View>

              <View style={styles.amountRow}>
                <Text allowFontScaling={false} style={styles.amountText}>
                  {I18n.t("TransferMoney3.amountText")}
                </Text>
                <View style={styles.horizontalLine} />
                <Text allowFontScaling={false} style={styles.amount}>
                  {this.numberWithCommas(parseInt(amount))}
                </Text>
              </View>

              <View style={styles.descriptionRow}>
                <Text allowFontScaling={false} style={styles.descriptionText}>
                  {I18n.t("TransferMoney3.descriptionText")}
                </Text>
                <View style={styles.horizontalLine} />
                <Text allowFontScaling={false} style={styles.description}>
                  {description}
                </Text>
              </View>

              <View style={styles.amountRow}>
                <Text allowFontScaling={false} style={styles.amountText}>
                  {I18n.t("TransferMoney3.refrenceText")}
                </Text>
                <View style={styles.horizontalLine} />
                <Text allowFontScaling={false} style={styles.amount}>
                  {refrenceNumber}
                </Text>
              </View>
            </View>
          </ViewShot>

          {this.renderSaveCardNumberCheckBox(receiverStatus)}

          <View style={styles.shareButtonContainer}>
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
          </View>
        </Content>
      </Container>
    );
  }
}

export default TransferMoneyReceipt;
