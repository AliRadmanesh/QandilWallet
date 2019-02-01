import React, { Component } from "react";
import { ScrollView, View, Text, Image } from "react-native";
import { Button } from "native-base";
import Share from "react-native-share";
import { responsiveHeight } from "react-native-responsive-dimensions";

import I18n from "../../../utils/i18n";
import styles from "./styles";
import strings from "../../../utils/strings";
import PersianText from "react-native-persian-text";

const IMAGE1 = "../../../../assets/Icons/App/Charity/Card1.jpg";
const IMAGE2 = "../../../../assets/Icons/App/Charity/Card2.jpg";

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
      <ScrollView style={styles.container}>
        <View style={styles.cardContainer}>
          <View style={styles.cardContainerInside}>
            <Image
              source={require(IMAGE1)}
              style={styles.cardImage1}
              resizeMode="contain"
            />
          </View>

          <View style={styles.cardContainerInside}>
            <Image
              source={require(IMAGE2)}
              style={styles.cardImage1}
              resizeMode="contain"
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default CardPage;
