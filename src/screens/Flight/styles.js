import { I18nManager } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import colors from "../../utils/colors";

export default {
  container: {
    backgroundColor: colors.LIGHT_WHITE,
    alignItems: "center"
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
    width: responsiveWidth(90),
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
    fontSize: responsiveFontSize(2.2),
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
    width: responsiveWidth(90),
    backgroundColor: colors.WHITE,
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(1.5),
    marginTop: responsiveHeight(3),
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

  fromCardText: {
    alignSelf: "flex-start",
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.5),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.LIGHTER_BLACK,
    marginBottom: responsiveHeight(-1),
    marginTop: responsiveHeight(2)
  },
  fromInput: {
    width: responsiveWidth(75),
    height: responsiveHeight(8),
    fontSize: responsiveFontSize(1.8),
    textAlign: I18nManager.isRTL ? "right" : "left",
    color: colors.LIGHTER_BLACK,
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    marginBottom: responsiveHeight(-2),
    marginLeft: responsiveWidth(-1)
  },
  picker: {
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(-1),
    width: responsiveWidth(80)
  },
  inputBorder: {
    width: responsiveWidth(80),
    borderTopColor: colors.TAB_BAR_BORDER_COLOR,
    borderTopWidth: 0.5,
    marginBottom: responsiveHeight(2)
  },
  pickerSource: {
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(-1),
    marginRight: responsiveWidth(5),
    width: responsiveWidth(38)
  },
  pickerDestination: {
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(-1),
    width: responsiveWidth(38)
  },
  inputBorderSource: {
    width: responsiveWidth(38),
    borderTopColor: colors.TAB_BAR_BORDER_COLOR,
    borderTopWidth: 0.5,
    marginBottom: responsiveHeight(2)
  },
  departureTimeInput: {
    width: responsiveWidth(38),
    height: responsiveHeight(8),
    fontSize: responsiveFontSize(1.7),
    textAlign: I18nManager.isRTL ? "right" : "left",
    color: colors.LIGHTER_BLACK,
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    marginBottom: responsiveHeight(-2),
    marginLeft: responsiveWidth(-1),
    marginRight: responsiveWidth(6)
  },
  arrivalTimeInput: {
    width: responsiveWidth(38),
    height: responsiveHeight(8),
    fontSize: responsiveFontSize(1.7),
    textAlign: I18nManager.isRTL ? "right" : "left",
    color: colors.LIGHTER_BLACK,
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    marginBottom: responsiveHeight(-2),
    marginLeft: responsiveWidth(-1)
  },
  checkBoxContainer: {
    flexDirection: "row",
    marginVertical: responsiveHeight(1)
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
    color: colors.LIGHT_BLACK,
    marginRight: responsiveWidth(2)
  }
};
