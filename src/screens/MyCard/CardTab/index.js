import React, { Component } from "react";
import { View, Text, ImageBackground } from "react-native";
import { Button } from "native-base";
import ViewShot from "react-native-view-shot";
import Share from "react-native-share";

import I18n from "../../../utils/i18n";
import styles from "./styles";
import strings from "../../../utils/strings";

class CardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
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
      subject: strings.SHARE_SUBJECT // for email & social media
    };

    Share.open(shareOptions);
  }
  // END: Share functions //

  render() {
    const { username, userCardNumber, userPhoneNumber } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.mainText} allowFontScaling={false}>
          {I18n.t("MyCardQRCode.cardText")}
        </Text>

        <ViewShot style={styles.cardContainer} ref="viewShot">
          <ImageBackground
            source={require("../../../../assets/Icons/Login/LoginPage3/Card/card.png")}
            style={styles.cardImage}
          >
            <Text style={styles.cardNumber} allowFontScaling={false}>
              {this.spacedCardNumber(userCardNumber, 4).join("  -  ")}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1, justifyContent: "flex-start" }}>
                <Text style={styles.phoneNumberText} allowFontScaling={false}>
                  {I18n.t("Login3.phoneNumberText")}
                </Text>
                <Text style={styles.phoneNumber} allowFontScaling={false}>
                  {userPhoneNumber}
                </Text>
              </View>
              <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <Text style={styles.usernameText} allowFontScaling={false}>
                  {I18n.t("MyCardQRCode.cardOwnerText")}
                </Text>
                <Text style={styles.username} allowFontScaling={false}>
                  {username}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </ViewShot>

        <View style={styles.buttonContainer}>
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
              style={styles.shareButtonText}
            >
              {I18n.t("SIMCharge3.shareButton")}
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default CardPage;
