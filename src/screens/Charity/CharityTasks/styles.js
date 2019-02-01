import { I18nManager } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import colors from "../../../utils/colors";

export default {
  container: {
    backgroundColor: colors.LIGHT_WHITE,
    justifyContent: "center"
  },
  headerImage: {
    width: responsiveWidth(100),
    height: responsiveHeight(10)
  },
  headerContainer: {
    flexDirection: "row"
  },
  closeIcon: {
    marginTop: responsiveHeight(3),
    marginLeft: responsiveWidth(4)
  },
  titleText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: responsiveHeight(3),
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(2.5),
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0.42,
    textAlign: "center",
    color: colors.TITLE_COLOR,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowRadius: 4,
    textShadowOffset: {
      width: 0,
      height: 2
    }
  },
  helpIcon: {
    marginTop: responsiveHeight(3),
    marginRight: responsiveWidth(4)
  },
  currentBalanceContainer: {
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    width: responsiveWidth(85),
    height: responsiveHeight(7),
    backgroundColor: colors.WHITE,
    paddingHorizontal: responsiveWidth(7),
    borderRadius: 8,
    shadowColor: colors.BLACK,
    shadowOpacity: 0.25,
    shadowRadius: 3.34,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 2
    }
  },
  currentBalanceText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.7),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.58,
    textAlign: "center",
    color: colors.GREEN_BUTTONS
  },
  currentBalance: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.8),
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0.58,
    textAlign: "center",
    color: colors.GREEN_BUTTONS
  },
  currentBalanceUnit: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.4),
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0.58,
    textAlign: "center",
    color: colors.GREEN_BUTTONS,
    marginTop: responsiveHeight(0.3)
  },
  chargeMethodsCard: {
    alignSelf: "center",
    width: responsiveWidth(80),
    backgroundColor: colors.WHITE,
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(1.5),
    marginBottom: responsiveHeight(3),
    borderRadius: 8,
    shadowColor: colors.BLACK,
    shadowOpacity: 0.25,
    shadowRadius: 3.34,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 2
    }
  },
  mainText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.5),
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0.58,
    color: colors.LIGHT_BLACK
  },
  chargeMethodsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: responsiveHeight(3),
    marginBottom: responsiveHeight(1)
  },
  chargeMethodsButtons: {
    width: responsiveWidth(23),
    height: responsiveHeight(20),
    backgroundColor: colors.WHITE,
    marginRight: responsiveWidth(2),
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(2),
    borderRadius: 8,
    shadowColor: colors.BLACK,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2
    }
  },
  blankCard: {
    width: responsiveWidth(23),
    height: responsiveHeight(20),
    backgroundColor: colors.WHITE,
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(2)
  },
  chargeMethodsButtonsSelected: {
    width: responsiveWidth(23),
    height: responsiveHeight(20),
    backgroundColor: colors.WHITE,
    marginRight: responsiveWidth(2),
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(2),
    borderRadius: 8,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: colors.SELECT_LANGUAGE_BORDER_COLOR,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  electricityContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  electricityImage: {
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    marginBottom: responsiveHeight(2)
  },
  electricityText: {
    width: responsiveWidth(20),
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.7),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.42,
    textAlign: "center",
    color: colors.LIGHT_BLACK
  },
  mobilePhoneContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  mobilePhoneImage: {
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    marginBottom: responsiveHeight(2)
  },
  mobilePhoneText: {
    width: responsiveWidth(20),
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.6),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.42,
    textAlign: "center",
    color: colors.LIGHT_BLACK
  },
  waterContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  waterImage: {
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    marginBottom: responsiveHeight(2)
  },
  waterText: {
    width: responsiveWidth(20),
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.7),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.42,
    textAlign: "center",
    color: colors.LIGHT_BLACK
  },
  waterMeterInput: {
    width: responsiveWidth(75),
    height: responsiveHeight(8),
    fontSize: responsiveFontSize(1.7),
    textAlign: I18nManager.isRTL ? "right" : "left",
    color: colors.LIGHT_BLACK,
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    marginBottom: responsiveHeight(-1),
    marginLeft: responsiveWidth(-1)
  },
  mobilePhoneInput: {
    width: responsiveWidth(75),
    height: responsiveHeight(8),
    fontSize: responsiveFontSize(1.7),
    textAlign: I18nManager.isRTL ? "right" : "left",
    color: colors.LIGHT_BLACK,
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    marginBottom: responsiveHeight(-1),
    marginLeft: responsiveWidth(-1)
  },
  electricityInput: {
    width: responsiveWidth(70),
    height: responsiveHeight(8),
    fontSize: responsiveFontSize(1.7),
    textAlign: I18nManager.isRTL ? "right" : "left",
    color: colors.LIGHT_BLACK,
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    marginBottom: responsiveHeight(-1),
    marginLeft: responsiveWidth(-1)
  },
  buttonContainer: {
    // position: "absolute",
    marginBottom: responsiveHeight(2)
  },
  nextButton: {
    width: responsiveWidth(85),
    height: responsiveHeight(7),
    borderRadius: 2,
    backgroundColor: colors.RED_BUTTONS
  },
  nextButtonText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.7),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.49,
    textAlign: "center",
    color: colors.LIGHT_WHITE
  },
  peopleRequestCard: {
    alignSelf: "center",
    width: responsiveWidth(85),
    backgroundColor: colors.WHITE,
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(1.5),
    marginVertical: responsiveHeight(2),
    borderRadius: 8,
    shadowColor: colors.BLACK,
    shadowOpacity: 0.25,
    shadowRadius: 3.34,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 2
    }
  },
  peopleCardText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.5),
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0.58,
    color: colors.LIGHT_BLACK
  },
  amountInput: {
    width: responsiveWidth(75),
    height: responsiveHeight(8),
    fontSize: responsiveFontSize(1.8),
    textAlign: I18nManager.isRTL ? "right" : "left",
    color: colors.LIGHT_BLACK,
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    marginBottom: responsiveHeight(-2),
    marginLeft: responsiveWidth(-1)
  },
  descriptionInput: {
    width: responsiveWidth(75),
    height: responsiveHeight(10),
    fontSize: responsiveFontSize(1.8),
    textAlign: I18nManager.isRTL ? "right" : "left",
    color: colors.LIGHT_BLACK,
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    marginBottom: responsiveHeight(-2),
    marginLeft: responsiveWidth(-1)
  },
  addressInput: {
    width: responsiveWidth(75),
    height: responsiveHeight(10),
    fontSize: responsiveFontSize(1.8),
    textAlign: I18nManager.isRTL ? "right" : "left",
    color: colors.LIGHT_BLACK,
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    marginBottom: responsiveHeight(-2),
    marginLeft: responsiveWidth(-1)
  },
  fieldBorder: {
    alignSelf: "flex-start",
    width: responsiveWidth(70),
    borderTopColor: colors.TAB_BAR_BORDER_COLOR,
    borderTopWidth: 0.5,
    marginBottom: responsiveHeight(2),
    marginTop: responsiveHeight(-1)
  },
  amountTopTextInput: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.5),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.LIGHTER_BLACK,
    marginBottom: responsiveHeight(-1.5),
    alignSelf: "flex-start"
  },
  checkBoxContainer: {
    flexDirection: "row",
    marginTop: responsiveHeight(1)
  },
  checkBox: {
    marginLeft: responsiveWidth(-3),
    marginRight: responsiveWidth(4)
  },
  checkBoxText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.5),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: colors.LIGHT_BLACK
  },
  checkBoxContainer2: {
    flexDirection: "row",
    marginVertical: responsiveHeight(1)
  },
  checkBox2: {
    marginLeft: responsiveWidth(-3),
    marginRight: responsiveWidth(4)
  },
  checkBoxText2: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.5),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: colors.LIGHT_BLACK
  },

  picker: {
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(-1),
    width: responsiveWidth(70)
  },
  inputBorder: {
    width: responsiveWidth(70),
    borderTopColor: colors.TAB_BAR_BORDER_COLOR,
    borderTopWidth: 0.5,
    marginBottom: responsiveHeight(2)
  },
  timeInput: {
    width: responsiveWidth(70),
    height: responsiveHeight(8),
    fontSize: responsiveFontSize(1.7),
    textAlign: I18nManager.isRTL ? "right" : "left",
    color: colors.LIGHT_BLACK,
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    marginBottom: responsiveHeight(-1),
    marginLeft: responsiveWidth(-1)
  }
};
