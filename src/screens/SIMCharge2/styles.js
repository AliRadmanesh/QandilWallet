import { Dimensions, I18nManager } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import colors from "../../utils/colors";

// const deviceWidth = Dimensions.get('window').width;
// const deviceHeight = Dimensions.get('window').height;

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
    marginTop: responsiveHeight(2),
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(2.5),
    fontWeight: "normal",
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
  cardContainer: {
    alignSelf: "center",
    justifyContent: "center",
    width: responsiveWidth(85),
    backgroundColor: colors.WHITE,
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(1.5),
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
  topText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(2.2),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.68,
    textAlign: "center",
    color: colors.GREEN_BUTTONS,
    marginBottom: responsiveHeight(2)
  },
  transactionTypeRow: {
    flexDirection: "row",
    paddingVertical: responsiveHeight(1)
  },
  transactionTypeText: {
    justifyContent: "flex-start",
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.8),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.42,
    color: colors.LIGHTER_BLACK
  },
  horizontalLine: {
    flex: 1,
    borderBottomWidth: responsiveWidth(0.1),
    borderBottomColor: colors.LIGHTER_BLACK,
    marginBottom: responsiveHeight(1),
    marginHorizontal: responsiveWidth(2)
  },
  transactionType: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.8),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.49,
    color: colors.LIGHT_BLACK
  },
  amountRow: {
    flexDirection: "row",
    paddingVertical: responsiveHeight(1)
  },
  amountText: {
    justifyContent: "flex-start",
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.8),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.42,
    color: colors.LIGHTER_BLACK
  },
  amount: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.8),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.49,
    color: colors.LIGHT_BLACK
  },
  descriptionRow: {
    flexDirection: "row",
    paddingVertical: responsiveHeight(1)
  },
  descriptionText: {
    justifyContent: "flex-start",
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.8),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.42,
    color: colors.LIGHTER_BLACK
  },
  description: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.8),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.49,
    color: colors.LIGHT_BLACK
  },

  passwordCard: {
    alignSelf: "center",
    width: responsiveWidth(85),
    backgroundColor: colors.WHITE,
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(1.5),
    marginVertical: responsiveHeight(3),
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
  passwordText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.6),
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0.58,
    color: colors.LIGHT_BLACK
  },
  passwordInput: {
    width: responsiveWidth(75),
    height: responsiveHeight(8),
    fontSize: responsiveFontSize(1.8),
    textAlign: I18nManager.isRTL ? "right" : "left",
    color: colors.LIGHT_BLACK,
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    marginBottom: responsiveHeight(-2),
    marginLeft: responsiveWidth(-1)
  },
  fieldBorder: {
    width: responsiveWidth(75),
    borderTopColor: colors.TAB_BAR_BORDER_COLOR,
    borderTopWidth: 0.5,
    marginBottom: responsiveHeight(1),
    alignSelf: "flex-start"
  },
  fieldBorderError: {
    width: responsiveWidth(75),
    borderTopColor: colors.RED,
    borderTopWidth: 0.5,
    marginBottom: responsiveHeight(1),
    alignSelf: "flex-start"
  },
  errorText: {
    fontSize: responsiveFontSize(1.5),
    color: colors.RED,
    width: responsiveWidth(75)
  },
  touchFingerText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.6),
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0.58,
    color: colors.LIGHT_BLACK,
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(1)
  },
  fingerPrintContainer: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: colors.LIGHT_WHITE,
    marginVertical: responsiveHeight(1)
  },
  fingerPrintImage: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    marginVertical: responsiveHeight(1)
  },
  fingerPrintText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.6),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.58,
    color: colors.LIGHT_BLACK,
    marginTop: responsiveHeight(0.5)
  },

  buttonContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: responsiveHeight(2)
  },
  routeButton: {
    width: responsiveWidth(85),
    height: responsiveHeight(7),
    backgroundColor: colors.RED_BUTTONS
  },
  buttonText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.7),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.49,
    textAlign: "center",
    color: colors.LIGHT_WHITE
  }
};
