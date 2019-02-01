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
    letterSpacing: 0.38,
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
  cardContainer: {
    alignSelf: "center",
    justifyContent: "center",
    width: responsiveWidth(90),
    height: responsiveHeight(50)
    // backgroundColor: colors.WHITE,
    // borderRadius: 8,
    // shadowColor: colors.BLACK,
    // shadowOpacity: 0.25,
    // shadowRadius: 3.34,
    // elevation: 4,
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // }
  },
  tabViewStyle: {
    marginTop: responsiveHeight(1)
  },
  tabTextStyle: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.6),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.42,
    textAlign: "center"
  },
  tabBarUnderlineStyle: {
    backgroundColor: colors.GREEN_BUTTONS,
    height: responsiveHeight(0.3)
  }
  // tabsStyle: {
  //   borderWidth: 0
  // },
  // tabStyle: {
  //   backgroundColor: colors.LIGHT_WHITE
  // },
  // activeTabStyle: {
  //   backgroundColor: colors.LIGHT_WHITE,
  //   borderBottomColor: colors.GREEN_BUTTONS,
  //   borderBottomWidth: responsiveWidth(0.5)
  // },
  // tabTextStyle: {
  //   fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
  //   fontSize: responsiveFontSize(1.4),
  //   fontWeight: "normal",
  //   fontStyle: "normal",
  //   letterSpacing: 0.42,
  //   textAlign: "center",
  //   color: colors.BLACK_TAB
  // },
  // tabActiveTextStyle: {
  //   fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
  //   fontSize: responsiveFontSize(1.6),
  //   fontWeight: "bold",
  //   fontStyle: "normal",
  //   letterSpacing: 0.42,
  //   textAlign: "center",
  //   color: colors.GREEN_BUTTONS
  // },
};
