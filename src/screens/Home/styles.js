import { I18nManager } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

import colors from "../../utils/colors";

export default {
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.LIGHT_WHITE
  },
  headerImage: {
    width: responsiveWidth(100),
    height: responsiveHeight(45)
  },
  menuIcon: {
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
  profileImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(2)
  },
  profileImageStyle: {
    borderRadius: responsiveWidth(8),
    width: responsiveWidth(16),
    height: responsiveWidth(16)
  },
  userName: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(2),
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0.49,
    textAlign: "center",
    color: colors.TITLE_COLOR
  },
  loyaltyPointContainer: {
    alignSelf: "center",
    width: responsiveWidth(70),
    flexDirection: "row",
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(1)
  },
  loyaltyPointView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  loyaltyPointText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.9),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.58,
    textAlign: "center",
    color: colors.LIGHT_WHITE
  },
  currentBalanceContainer: {
    alignSelf: "center",
    width: responsiveWidth(70),
    flexDirection: "row",
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(0.5)
  },
  currentBalanceView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  currentBalanceText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.9),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.58,
    textAlign: "center",
    color: colors.LIGHT_WHITE
  },
  BalanceText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.8),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.58,
    textAlign: "center",
    color: colors.LIGHT_WHITE
  },
  BalanceUnit: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.4),
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0.58,
    textAlign: "center",
    color: colors.LIGHT_WHITE,
    marginTop: responsiveHeight(0.4)
  },
  balanceSpinnerContainer: {
    flex: 1,
    justifyContent: "flex-end"
  },
  rechargeAndRefreshButtons: {
    flexDirection: "row",
    flex: 1,
    width: responsiveWidth(70),
    height: responsiveHeight(5),
    marginTop: responsiveHeight(1)
  },
  rechargeButton: {
    flex: 1,
    height: responsiveHeight(5),
    borderRadius: 2,
    justifyContent: "center",
    backgroundColor: colors.UNDERLINE_BORDER_TEXTINPUT_COLOR
  },
  rechargeButtonText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(2),
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0.58,
    textAlign: "center",
    color: colors.LIGHT_BLACK
  },
  customeClubButton: {
    flex: 1,
    height: responsiveHeight(5),
    marginRight: responsiveWidth(3),
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.UNDERLINE_BORDER_TEXTINPUT_COLOR
  },
  customerClubButtonText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(2),
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0.58,
    textAlign: "center",
    color: colors.LIGHT_BLACK
  },
  content: {
    flex: 1,
    alignItems: "center"
  },
  mainButtonContainer: {
    width: responsiveWidth(24),
    height: responsiveHeight(17),
    borderRadius: 8,
    backgroundColor: colors.WHITE,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: responsiveWidth(1),
    marginHorizontal: responsiveWidth(2),
    marginVertical: responsiveHeight(2)
  },
  mainButtonStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  SIMChargeIcon: {
    width: responsiveWidth(11),
    height: responsiveHeight(9),
    marginBottom: responsiveHeight(2)
  },
  transferMoneyIcon: {
    width: responsiveWidth(14),
    height: responsiveHeight(7),
    marginBottom: responsiveHeight(3),
    marginTop: responsiveHeight(1)
  },
  internetIcon: {
    width: responsiveWidth(14),
    height: responsiveHeight(7),
    marginBottom: responsiveHeight(3),
    marginTop: responsiveHeight(1)
  },
  shoppingIcon: {
    width: responsiveWidth(12),
    height: responsiveHeight(9),
    marginBottom: responsiveHeight(2),
    marginTop: responsiveHeight(1)
  },
  giftCardIcon: {
    width: responsiveWidth(16),
    height: responsiveHeight(8),
    marginBottom: responsiveHeight(2),
    marginTop: responsiveHeight(1)
  },
  payBillsIcon: {
    width: responsiveWidth(14),
    height: responsiveHeight(10),
    marginBottom: responsiveHeight(1.5)
  },
  mainButtonText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.5),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.42,
    textAlign: "center",
    color: colors.LIGHT_BLACK
  },

  notifyTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: responsiveHeight(3),
    marginRight: responsiveWidth(2),
    marginLeft: responsiveWidth(2)
    // padding: responsiveWidth(2),
  },
  notifyTextStyle: {
    textAlign: "center",
    fontSize: responsiveFontSize(2),
    color: colors.WHITE
  }
};
