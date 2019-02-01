import { I18nManager } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

import colors from "../../../utils/colors";

export default {
  container: {
    backgroundColor: colors.LIGHT_WHITE
  },
  firstLastNameContainer: {
    // marginTop: responsiveHeight(1)
  },
  nameText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.5),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.LIGHTER_BLACK,
    marginBottom: responsiveHeight(-1),
    alignSelf: "flex-start"
  },
  usernameInput: {
    width: responsiveWidth(90),
    height: responsiveHeight(8),
    fontSize: responsiveFontSize(1.8),
    textAlign: I18nManager.isRTL ? "right" : "left",
    color: colors.LIGHT_BLACK,
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    marginBottom: responsiveHeight(-2),
    marginLeft: responsiveWidth(-1)
  },
  nameFieldBorder: {
    width: responsiveWidth(90),
    borderTopColor: colors.TAB_BAR_BORDER_COLOR,
    borderTopWidth: 0.5,
    marginBottom: responsiveHeight(1),
    alignSelf: "flex-start"
  },
  nameFieldBorderError: {
    width: responsiveWidth(90),
    borderTopColor: colors.RED,
    borderTopWidth: 0.5,
    marginBottom: responsiveHeight(1),
    alignSelf: "flex-start"
  },
  phoneNumberContainer: {
    marginTop: responsiveHeight(1)
  },
  phoneNumberText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.5),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.LIGHTER_BLACK,
    marginBottom: responsiveHeight(-1),
    alignSelf: "flex-start"
  },
  phoneNumberInput: {
    width: responsiveWidth(90),
    height: responsiveHeight(8),
    fontSize: responsiveFontSize(1.8),
    textAlign: I18nManager.isRTL ? "right" : "left",
    color: colors.LIGHTER_BLACK,
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    marginBottom: responsiveHeight(-2),
    marginLeft: responsiveWidth(-1)
  },
  phoneFieldBorder: {
    width: responsiveWidth(90),
    borderTopColor: colors.TAB_BAR_BORDER_COLOR,
    borderTopWidth: 0.5,
    marginBottom: responsiveHeight(1),
    alignSelf: "flex-start"
  },
  addressContainer: {
    marginTop: responsiveHeight(1)
  },
  addressText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.5),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.LIGHTER_BLACK,
    marginBottom: responsiveHeight(-1),
    alignSelf: "flex-start"
  },
  addressInput: {
    width: responsiveWidth(90),
    height: responsiveHeight(10),
    fontSize: responsiveFontSize(1.8),
    textAlign: I18nManager.isRTL ? "right" : "left",
    color: colors.LIGHT_BLACK,
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    marginBottom: responsiveHeight(-2),
    marginLeft: responsiveWidth(-1)
  },
  addressFieldBorder: {
    width: responsiveWidth(90),
    borderTopColor: colors.TAB_BAR_BORDER_COLOR,
    borderTopWidth: 0.5,
    marginBottom: responsiveHeight(1),
    alignSelf: "flex-start"
  },
  emailContainer: {
    marginTop: responsiveHeight(1)
  },
  emailText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.5),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.LIGHTER_BLACK,
    marginBottom: responsiveHeight(-1),
    alignSelf: "flex-start"
  },
  emailInput: {
    width: responsiveWidth(90),
    height: responsiveHeight(8),
    fontSize: responsiveFontSize(1.8),
    textAlign: I18nManager.isRTL ? "right" : "left",
    color: colors.LIGHT_BLACK,
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    marginBottom: responsiveHeight(-2),
    marginLeft: responsiveWidth(-1)
  },
  emailFieldBorder: {
    width: responsiveWidth(90),
    borderTopColor: colors.TAB_BAR_BORDER_COLOR,
    borderTopWidth: 0.5,
    marginBottom: responsiveHeight(1),
    alignSelf: "flex-start"
  },
  ageContainer: {
    marginTop: responsiveHeight(1)
  },
  ageText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.5),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.LIGHTER_BLACK,
    marginBottom: responsiveHeight(-1),
    alignSelf: "flex-start"
  },
  ageInput: {
    width: responsiveWidth(90),
    height: responsiveHeight(8),
    fontSize: responsiveFontSize(1.8),
    textAlign: I18nManager.isRTL ? "right" : "left",
    color: colors.LIGHT_BLACK,
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    marginBottom: responsiveHeight(-2),
    marginLeft: responsiveWidth(-1)
  },
  ageFieldBorder: {
    width: responsiveWidth(90),
    borderTopColor: colors.TAB_BAR_BORDER_COLOR,
    borderTopWidth: 0.5,
    marginBottom: responsiveHeight(1),
    alignSelf: "flex-start"
  },
  genderContainer: {
    marginTop: responsiveHeight(1)
  },
  genderText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.5),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.LIGHTER_BLACK,
    marginBottom: responsiveHeight(-1),
    alignSelf: "flex-start"
  },
  genderRadioContainer: {
    flexDirection: "row",
    marginTop: responsiveHeight(2)
  },
  radioButtonContainer: {
    flex: 1,
    flexDirection: "row"
    // justifyContent: "center"
  },
  radioTextStyle: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.5),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.49,
    color: colors.LIGHT_BLACK,
    marginLeft: responsiveWidth(2),
    marginTop: responsiveHeight(0.5)
  },
  buttonContainer: {
    marginTop: responsiveHeight(6),
    marginBottom: responsiveHeight(10)
  },
  applyButton: {
    width: responsiveWidth(85),
    height: responsiveHeight(7),
    alignSelf: "center",
    backgroundColor: colors.RED_BUTTONS
  },
  buttonText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.8),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.49,
    textAlign: "center",
    color: colors.LIGHT_WHITE
  }
};
