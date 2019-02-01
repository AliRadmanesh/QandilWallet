import React from "react";
import {
  View,
  Image,
  AsyncStorage,
  I18nManager,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Header,
  Left,
  Icon,
  Body,
  Right,
  Content,
  Text,
  Button
} from "native-base";
import RNRestart from "react-native-restart";

import I18n from "../../../utils/i18n";
import CustomIcon from "../../../utils/customIcons";
import colors from "../../../utils/colors";
import styles from "./styles";

export class SelectLanguage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      enSelected: false,
      faSelected: false,
      arSelected: false
    };
  }

  // onValueChange(value) {
  //   this.selectedLang = value;

  //   let newLang = "";
  //   if (value === "en") {
  //     newLang = "en";
  //     I18n.locale = newLang;
  //     I18nManager.forceRTL(false);
  //     console.log("en### " + I18n.currentLocale());
  //   } else if (value === "ar") {
  //     newLang = "ar";
  //     I18n.locale = newLang;
  //     I18nManager.forceRTL(true);
  //     console.log("ar### " + I18n.currentLocale());
  //   } else if (value === "ku") {
  //     newLang = "ku";
  //     I18n.locale = newLang;
  //     I18nManager.forceRTL(true);
  //     console.log("ku### " + I18n.currentLocale());
  //   } else {
  //     console.log("riiiiiiiiddddddiiiiiiii!!!");
  //   }

  //   AsyncStorage.setItem("@lang", newLang)
  //     .then(() => {
  //       RNRestart.Restart();
  //     })
  //     .catch(e => console.log(e));
  // }

  // async onChangeLang(lang) {
  //   // i18n.changeLanguage(lang);
  //   try {
  //     await AsyncStorage.setItem("@APP:languageCode", lang);
  //   } catch (error) {
  //     console.log(` Hi Errorrrr : ${error}`);
  //   }
  //   // console.log(i18n.dir());
  // }

  onSelectLanguage(language) {
    let newLang = "";

    if (language === "en") {
      this.setState({ enSelected: true, faSelected: false, arSelected: false });
      newLang = "en";
      I18n.locale = newLang;
      I18nManager.forceRTL(false);
      console.log("en### " + I18n.currentLocale());
    } else if (language === "fa") {
      this.setState({ enSelected: false, faSelected: true, arSelected: false });
      newLang = "fa";
      I18n.locale = newLang;
      I18nManager.forceRTL(true);
      console.log("fa### " + I18n.currentLocale());
    } else if (language === "ar") {
      this.setState({ enSelected: false, faSelected: false, arSelected: true });
      newLang = "ar";
      I18n.locale = newLang;
      I18nManager.forceRTL(true);
      console.log("ar### " + I18n.currentLocale());
    }
  }

  onDone() {
    const { enSelected, faSelected, arSelected } = this.state;
    let newLang = "";

    if (enSelected) newLang = "en";
    if (faSelected) newLang = "fa";
    if (arSelected) newLang = "ar";

    AsyncStorage.setItem("@LANG", newLang)
      .then(() => {
        RNRestart.Restart();
      })
      .catch(e => console.log(e));
  }

  isButtonDisabled() {
    const { enSelected, faSelected, arSelected } = this.state;

    // if a language selected button must be enable
    if (enSelected || faSelected || arSelected) return false;
    // otherwise it must be disabled
    return true;
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Image
            source={require("../../../../assets/Icons/Login/FirstPage/Header/Header.png")}
            style={styles.headerImage}
          />

          <TouchableOpacity
            onPress={() => alert("help")}
            style={styles.helpIcon}
          >
            <CustomIcon name="help" size={24} color={colors.WHITE} />
          </TouchableOpacity>

          <Image
            source={require("../../../../assets/Icons/Login/FirstPage/Logo/logo.png")}
            style={styles.logoIcon}
          />

          <Text style={styles.middleTextStyle}>Choose your language:</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => this.onSelectLanguage("en")}
              style={
                this.state.enSelected
                  ? styles.selectedLanguageButton
                  : styles.languageButton
              }
            >
              <Image
                source={require("../../../../assets/Icons/Login/FirstPage/Flags/English/eng.png")}
              />
              <Text style={styles.buttonTextEnglish} allowFontScaling={false}>
                English
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.onSelectLanguage("fa")}
              style={
                this.state.faSelected
                  ? styles.selectedLanguageButton
                  : styles.languageButton
              }
            >
              <Image
                source={require("../../../../assets/Icons/Login/FirstPage/Flags/Kurdish/kurd.png")}
              />
              <Text style={styles.buttonTextKurdish} allowFontScaling={false}>
                فارسی
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.onSelectLanguage("ar")}
              style={
                this.state.arSelected
                  ? styles.selectedLanguageButton
                  : styles.languageButton
              }
            >
              <Image
                source={require("../../../../assets/Icons/Login/FirstPage/Flags/Arabic/iraq.png")}
              />
              <Text style={styles.buttonTextArabic} allowFontScaling={false}>
                العربی
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.continueButtonContainer}>
            <Button
              block
              style={
                this.isButtonDisabled()
                  ? styles.continueButtonDisabled
                  : styles.continueButtonEnabled
              }
              onPress={() => this.onDone()}
              disabled={this.isButtonDisabled()}
            >
              <Text
                uppercase={false}
                style={
                  this.isButtonDisabled()
                    ? styles.continueButtonTextDisabled
                    : styles.continueButtonTextEnabled
                }
                allowFontScaling={false}
              >
                Continue
              </Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default SelectLanguage;
