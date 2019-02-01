import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "native-base";
import ViewShot from "react-native-view-shot";
import Share from "react-native-share";
import QRCode from "react-native-qrcode";
import { responsiveWidth } from "react-native-responsive-dimensions";

import I18n from "../../../utils/i18n";
import styles from "./styles";
import colors from "../../../utils/colors";
import strings from "../../../utils/strings";

class QRCodePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      QRtext: ""
    };
  }

  componentDidMount() {
    const { username, userCardNumber, userPhoneNumber } = this.props;
    const QRstring = `${username}#${userCardNumber}#${userPhoneNumber}`;
    this.setState({ QRtext: QRstring });
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
    return (
      <View style={styles.container}>
        <Text style={styles.mainText} allowFontScaling={false}>
          {I18n.t("MyCardQRCode.QRCodeText")}
        </Text>

        <ViewShot style={styles.QRContainer} ref="viewShot">
          <QRCode
            value={this.state.QRtext}
            size={responsiveWidth(100) * 0.5}
            bgColor={colors.BLACK}
            fgColor={colors.WHITE}
          />
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
              {I18n.t("MyCardQRCode.sharePrintButton")}
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default QRCodePage;
