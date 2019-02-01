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
    marginTop: responsiveHeight(2.5),
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
  successImage: {
    alignSelf: "center",
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    marginVertical: responsiveHeight(2)
  },
  topText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(2),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.68,
    textAlign: "center",
    color: colors.SUCCESS_MODAL_COLOR,
    marginBottom: responsiveHeight(4)
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
  chargeCodeCardContainer: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: responsiveWidth(85),
    backgroundColor: colors.WHITE,
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(1.5),
    marginTop: responsiveHeight(5),
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
  chargeCodeText: {
    flex: 1,
    textAlign: "center",
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.7),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.49,
    color: colors.GREEN_BUTTONS
    // marginRight: responsiveWidth(6)
  },
  chargeCode: {
    flex: 1,
    textAlign: "center",
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(2.3),
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0.58,
    color: colors.GREEN_BUTTONS
  },

  shareAndCopyButtonContainer: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: responsiveHeight(2)
  },
  shareButton: {
    width: responsiveWidth(41),
    height: responsiveHeight(7),
    backgroundColor: colors.GREEN_BUTTONS,
    marginRight: responsiveWidth(3)
  },
  copyButton: {
    width: responsiveWidth(41),
    height: responsiveHeight(7),
    backgroundColor: colors.BLUE_BUTTONS
  },

  directChargeButtonContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  directChargeButton: {
    width: responsiveWidth(85),
    height: responsiveHeight(7),
    backgroundColor: colors.RED_BUTTONS,
    opacity: 0.5
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
