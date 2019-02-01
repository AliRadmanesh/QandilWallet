import { I18nManager } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

import colors from "../../../utils/colors";

export default {
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.WHITE
  },
  headerImage: {
    width: responsiveWidth(100),
    height: responsiveHeight(45)
  },
  helpIcon: {
    alignSelf: "flex-end",
    position: "absolute",
    right: 17,
    top: 20
  },
  logoIcon: {
    position: "absolute",
    top: responsiveHeight(40),
    right: responsiveWidth(20),
    bottom: responsiveHeight(55),
    left: responsiveWidth(40)
  },
  middleTextStyle: {
    width: responsiveWidth(80),
    alignSelf: "center",
    marginTop: responsiveHeight(8),
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.7), //13,
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    lineHeight: responsiveHeight(3),
    color: colors.LIGHT_BLACK
  },
  form: {
    marginTop: responsiveHeight(2),
    alignItems: "center"
  },
  usernameTextInput: {
    width: responsiveWidth(80),
    height: responsiveHeight(8),
    fontSize: responsiveFontSize(1.7), //13
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    textAlign: I18nManager.isRTL ? "right" : "left",
    color: colors.LIGHT_BLACK,
    marginBottom: responsiveHeight(-2)
  },
  passwordTextInput: {
    width: responsiveWidth(80),
    height: responsiveHeight(8),
    fontSize: responsiveFontSize(1.7), //13
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    textAlign: I18nManager.isRTL ? "right" : "left",
    color: colors.LIGHT_BLACK,
    marginBottom: responsiveHeight(-2)
  },
  confirmPasswordTextInput: {
    width: responsiveWidth(80),
    height: responsiveHeight(8),
    fontSize: responsiveFontSize(1.7), //13
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    textAlign: I18nManager.isRTL ? "right" : "left",
    color: colors.LIGHT_BLACK,
    marginBottom: responsiveHeight(-2)
  },
  fieldBorder: {
    width: responsiveWidth(80),
    borderTopColor: colors.TAB_BAR_BORDER_COLOR,
    borderTopWidth: 0.5,
    marginBottom: responsiveHeight(1)
  },
  fieldBorderError: {
    width: responsiveWidth(80),
    borderTopColor: colors.RED,
    borderTopWidth: 0.5,
    marginBottom: responsiveHeight(1)
  },
  errorText: {
    fontSize: responsiveFontSize(1.5),
    color: colors.RED,
    width: responsiveWidth(65),
    marginTop: responsiveHeight(0.5)
  },
  continueButtonContainer: {
    alignSelf: "center",
    marginBottom: responsiveHeight(2)
  },
  continueButtonDisabled: {
    justifyContent: "center",
    alignSelf: "center",
    width: responsiveWidth(92),
    height: responsiveHeight(8),
    borderRadius: 2,
    backgroundColor: colors.RED_BUTTONS,
    opacity: 0.5
  },
  continueButtonTextDisabled: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.49,
    textAlign: "center",
    color: colors.LIGHT_WHITE,
    opacity: 0.5
  },
  continueButtonEnabled: {
    justifyContent: "center",
    alignSelf: "center",
    width: responsiveWidth(92),
    height: responsiveHeight(8),
    borderRadius: 2,
    backgroundColor: colors.RED_BUTTONS
  },
  continueButtonTextEnabled: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.49,
    textAlign: "center",
    color: colors.LIGHT_WHITE
  }
};
