import React, { Component } from "react";
import { View, Image, TouchableOpacity, ImageBackground } from "react-native";
import { NavigationActions } from "react-navigation";
import { Container, Content, Text, Button } from "native-base";
import ViewShot from "react-native-view-shot";
import Share from "react-native-share";

import I18n from "../../../utils/i18n";
import ModalHelp from "./ModalHelp";

import CustomIcon from "../../../utils/customIcons";
import colors from "../../../utils/colors";
import strings from "../../../utils/strings";
import styles from "./styles";

const LOGIN_HEADER =
  "../../../../assets/Icons/Login/LoginPage3/Header/Login3.png";
const IQ_LOGO = "../../../../assets/Icons/Login/FirstPage/Logo/logo.png";
const CARD_IMAGE = "../../../../assets/Icons/Login/LoginPage3/Card/card.png";

export class Login3 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHelpModalVisible: false
    };
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

  spacedCardNumber(str, n) {
    const ret = [];
    let i;
    let len;

    for (i = 0, len = str.length; i < len; i += n) {
      ret.push(str.substr(i, n));
    }
    return ret;
  }

  goToNextScreen(targetRoute) {
    const {
      userToken,
      username,
      cardNumber,
      phoneNumber
    } = this.props.navigation.state.params;

    const navigateAction = NavigationActions.navigate({
      routeName: targetRoute,
      params: {
        userToken,
        username,
        cardNumber,
        phoneNumber
      }
    });
    this.props.navigation.dispatch(navigateAction);
  }

  onModalButtonPressed = modalType => {
    const { isHelpModalVisible } = this.state;
    switch (modalType) {
      case modalType === isHelpModalVisible: {
        this.setState({ isHelpModalVisible: false });
        break;
      }
    }
  };

  render() {
    const { cardNumber, phoneNumber } = this.props.navigation.state.params;
    return (
      <Container style={styles.container}>
        <ModalHelp
          isVisible={this.state.isHelpModalVisible}
          onPressReturn={() =>
            this.onModalButtonPressed(this.state.isHelpModalVisible)
          }
        />

        <Content>
          <Image source={require(LOGIN_HEADER)} style={styles.headerImage} />

          <TouchableOpacity
            onPress={() => this.setState({ isHelpModalVisible: true })}
            style={styles.helpIcon}
          >
            <CustomIcon name="help" size={24} color={colors.WHITE} />
          </TouchableOpacity>

          <Image source={require(IQ_LOGO)} style={styles.logoIcon} />

          <Text style={styles.middleTextStyle} allowFontScaling={false}>
            {I18n.t("Login3.bodyText")}
          </Text>

          <ViewShot style={styles.cardContainer} ref="viewShot">
            <ImageBackground
              source={require(CARD_IMAGE)}
              style={styles.cardImage}
            >
              <Text style={styles.cardNumber} allowFontScaling={false}>
                {this.spacedCardNumber(cardNumber, 4).join("  -  ")}
              </Text>
              <Text style={styles.phoneNumberText} allowFontScaling={false}>
                {I18n.t("Login3.phoneNumberText")}
              </Text>
              <Text style={styles.phoneNumber}>{phoneNumber}</Text>
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
                {I18n.t("Login3.shareButton")}
              </Text>
            </Button>

            <Button
              block
              style={styles.nextButton}
              onPress={() => this.goToNextScreen("EnterNamePass")}
            >
              <Text
                uppercase={false}
                allowFontScaling={false}
                style={styles.nextButtonText}
              >
                {I18n.t("Login3.nextButton")}
              </Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Login3;
