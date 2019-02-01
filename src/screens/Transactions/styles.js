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
  searchRowContainer: {
    width: responsiveWidth(90),
    height: responsiveHeight(7),
    alignSelf: "center",
    flexDirection: "row",
    marginBottom: responsiveHeight(2),
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: colors.WHITE,
    shadowColor: colors.BLACK,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2
    }
  },
  filterContainer: {
    borderRightColor: colors.BLACK_BORDER,
    borderRightWidth: responsiveWidth(0.2),
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10
  },
  filterIcon: {
    width: 24,
    height: 24
  },
  sortContainer: {
    borderRightColor: colors.BLACK_BORDER,
    borderRightWidth: responsiveWidth(0.2),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10
  },
  sortIcon: {
    width: 24,
    height: 24
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.WHITE
  },
  searchIcon: {
    padding: 10
  },
  searchInput: {
    flex: 1,
    backgroundColor: colors.WHITE,
    color: colors.LIGHT_BLACK,
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    borderBottomWidth: responsiveWidth(0.5),
    borderBottomColor: colors.UNDERLINE_BORDER_TEXTINPUT_COLOR,
    paddingBottom: 0,
    paddingLeft: 0,
    marginBottom: responsiveHeight(0.5),
    textAlign: I18nManager.isRTL ? "right" : "left"
  },
  searchBarBorder: {
    borderTopColor: colors.TAB_BAR_BORDER_COLOR,
    borderTopWidth: 0.5,
    marginBottom: responsiveHeight(1),
    marginLeft: responsiveWidth(2)
  },
  transactionCard: {
    width: responsiveWidth(90),
    height: responsiveHeight(12),
    borderRadius: responsiveWidth(2),
    backgroundColor: colors.WHITE,
    marginBottom: responsiveHeight(1),
    shadowColor: colors.BLACK,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2
    }
  },
  transactionFirstRow: {
    flexDirection: "row",
    paddingVertical: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(4)
  },
  depositeWithdrawContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  depositeWithdrawText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.5),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.42,
    textAlign: "center",
    color: colors.TRANSACTION_GREEN_COLOR,
    marginLeft: responsiveWidth(1)
  },
  transactionDateContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  transactionDateText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.5),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.42,
    textAlign: "center",
    color: colors.LIGHT_BLACK,
    marginLeft: responsiveWidth(1)
  },
  transactionTimeContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  transactionTimeText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.5),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.42,
    textAlign: "center",
    color: colors.LIGHT_BLACK,
    marginLeft: responsiveWidth(1)
  },
  transactionSecondRow: {
    flexDirection: "row",
    paddingVertical: responsiveHeight(0.5),
    paddingHorizontal: responsiveWidth(4)
  },
  transactionTypeText: {
    // flex: 1,
    justifyContent: "flex-start",
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.8),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.42,
    color: colors.LIGHT_BLACK
  },
  horizontalLine: {
    flex: 1,
    borderBottomWidth: responsiveWidth(0.1),
    borderBottomColor: colors.LIGHTER_BLACK,
    marginBottom: responsiveHeight(1),
    marginHorizontal: responsiveWidth(2)
  },
  transactionAmountContainer: {
    justifyContent: "flex-end",
    flexDirection: "row"
  },
  transactionAmountText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(2),
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0.49,
    color: colors.TRANSACTION_GREEN_COLOR
  },
  transactionAmountUnitText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.5),
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0.49,
    color: colors.TRANSACTION_GREEN_COLOR,
    marginTop: responsiveHeight(0.5),
    marginLeft: responsiveWidth(0.5)
  },

  cardItem: {
    borderRadius: 0
  },
  statusStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  timeContainer: {
    backgroundColor: colors.GRAY_ROW,
    borderRadius: 0
  },
  timeStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  DepositTextStyle: {
    color: colors.GREEN,
    fontSize: responsiveFontSize(2.1),
    fontWeight: "bold"
  },
  withdrawTextStyle: {
    color: colors.RED,
    fontSize: responsiveFontSize(2.1),
    fontWeight: "bold"
  },
  operationStyle: {
    fontWeight: "bold"
  },
  cardNoStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  nameContainer: {
    backgroundColor: colors.GRAY_ROW,
    borderRadius: 0
  },
  nameStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cardOrPhoneContainer: {
    backgroundColor: colors.GRAY_ROW,
    borderRadius: 0
  },
  cardOrPhoneStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  amountStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  chargeDescContainer: {
    backgroundColor: colors.GRAY_ROW,
    borderRadius: 0
  },
  chargeDescStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  textStyles: {
    fontSize: responsiveFontSize(1.9),
    color: colors.BLACK
  },
  shareButtonContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  ShareButton: {
    width: responsiveWidth(90),
    height: responsiveHeight(6),
    backgroundColor: colors.BUTTON_COLOR,
    borderRadius: 0
  },
  buttonShareText: {
    fontSize: responsiveFontSize(2)
  },
  noTransactionText: {
    color: colors.WHITE,
    textAlign: "center",
    fontSize: responsiveFontSize(2.5),
    marginLeft: responsiveWidth(5),
    marginRight: responsiveWidth(5)
  },
  modalIconAndLineContainer: {
    height: "33.3%",
    justifyContent: "center",
    alignItems: "center"
  },
  modalTextContainer: {
    height: "33.3%",
    justifyContent: "center",
    alignItems: "center"
  },
  modalButtonContainer: {
    height: "33.3%",
    justifyContent: "center",
    alignItems: "center"
  },
  modalMsg: {
    height: responsiveHeight(27),
    width: responsiveWidth(80),
    backgroundColor: colors.WHITE,
    borderWidth: responsiveWidth(0.7),
    borderColor: colors.MODAL_ERROR
    // borderRadius: responsiveWidth(3),
  },
  modalHLine: {
    borderWidth: responsiveWidth(0.2),
    width: responsiveWidth(55),
    borderColor: colors.MODAL_ERROR,
    backgroundColor: colors.MODAL_ERROR,
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(1)
  },
  modalTopIcon: {
    color: colors.MODAL_ERROR,
    fontSize: responsiveFontSize(5),
    marginTop: responsiveHeight(1)
  },
  msgModalText: {
    textAlign: "center",
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(1)
    // marginLeft: responsiveWidth(5),
    // marginRight: responsiveWidth(5),
  },
  okButton: {
    width: responsiveWidth(15),
    height: responsiveHeight(7)
  },
  okButtonText: {
    fontSize: responsiveFontSize(2)
  }
};
