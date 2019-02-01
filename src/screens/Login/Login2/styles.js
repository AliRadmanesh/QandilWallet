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
  backIcon: {
    alignSelf: "flex-end",
    position: "absolute",
    right: responsiveWidth(86),
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
    width: responsiveWidth(66.4),
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
    marginTop: responsiveHeight(3),
    alignItems: "center"
  },
  phoneNumberText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.5),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.LIGHTER_BLACK,
    marginBottom: responsiveHeight(-2),
    marginLeft: responsiveWidth(14),
    alignSelf: "flex-start"
  },
  plusContainer: {
    marginTop: responsiveHeight(2.5),
    marginRight: responsiveWidth(1)
  },
  plus: {
    fontFamily: "Roboto",
    color: colors.LIGHTER_BLACK,
    fontSize: responsiveFontSize(1.7),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0
  },
  codeNumber: {
    width: responsiveWidth(10),
    height: responsiveHeight(8),
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.7),
    textAlign: I18nManager.isRTL ? "right" : "left",
    color: colors.LIGHTER_BLACK,
    marginBottom: responsiveHeight(-2)
  },
  phoneNumber: {
    width: responsiveWidth(50),
    height: responsiveHeight(8),
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.7),
    textAlign: I18nManager.isRTL ? "right" : "left",
    color: colors.LIGHTER_BLACK,
    marginBottom: responsiveHeight(-2),
    marginLeft: responsiveWidth(5)
  },
  verificationCode: {
    width: responsiveWidth(73),
    height: responsiveHeight(8),
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.7),
    textAlign: I18nManager.isRTL ? "right" : "left",
    color: colors.LIGHT_BLACK,
    marginBottom: responsiveHeight(-2),
    marginTop: responsiveHeight(1)
  },
  fieldBorder: {
    width: responsiveWidth(53),
    borderTopColor: colors.TAB_BAR_BORDER_COLOR,
    borderTopWidth: 0.5,
    marginBottom: responsiveHeight(1),
    alignSelf: "flex-start",
    marginLeft: responsiveWidth(5)
  },
  fieldBorderError: {
    width: responsiveWidth(50),
    borderTopColor: colors.RED,
    borderTopWidth: 0.5,
    marginBottom: responsiveHeight(1),
    alignSelf: "flex-start",
    marginLeft: responsiveWidth(5)
  },
  fieldBorderCode: {
    width: responsiveWidth(10),
    borderTopColor: colors.TAB_BAR_BORDER_COLOR,
    borderTopWidth: 0.5,
    marginBottom: responsiveHeight(1),
    alignSelf: "flex-start"
  },
  fieldBorderErrorCode: {
    width: responsiveWidth(15),
    borderTopColor: colors.RED,
    borderTopWidth: 0.5,
    marginBottom: responsiveHeight(1),
    alignSelf: "flex-start"
  },
  fieldBorderVerificationCode: {
    width: responsiveWidth(70),
    borderTopColor: colors.TAB_BAR_BORDER_COLOR,
    borderTopWidth: 0.5,
    marginBottom: responsiveHeight(1)
  },
  errorText: {
    fontSize: responsiveFontSize(1.5),
    color: colors.RED,
    width: responsiveWidth(65),
    marginTop: responsiveHeight(1)
  },
  timerContainer: {
    alignItems: "center",
    marginTop: responsiveHeight(3)
  },
  timer: {
    fontSize: responsiveFontSize(1.7),
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.LIGHT_BLACK
  },
  expiredText: {
    width: responsiveWidth(66.4),
    alignSelf: "center",
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.7), //13,
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    lineHeight: responsiveHeight(3),
    color: colors.RED
  },
  continueButtonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: responsiveHeight(3),
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
