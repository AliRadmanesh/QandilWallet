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
    fontWeight: "normal",
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
    width: responsiveWidth(85),
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
  chargeCenterContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  chargeCenterImage: {
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    marginBottom: responsiveHeight(2)
  },
  chargeCenterText: {
    width: responsiveWidth(20),
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.5),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.42,
    textAlign: "center",
    color: colors.LIGHT_BLACK
  },
  peopleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  peopleImage: {
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    marginBottom: responsiveHeight(2)
  },
  peopleText: {
    width: responsiveWidth(20),
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.5),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.42,
    textAlign: "center",
    color: colors.LIGHT_BLACK
  },
  creditCardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  creditCardImage: {
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    marginBottom: responsiveHeight(2)
  },
  creditCardText: {
    width: responsiveWidth(20),
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.5),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.42,
    textAlign: "center",
    color: colors.LIGHT_BLACK
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

  // form: {
  //   marginTop: responsiveWidth(5),
  //   marginLeft: responsiveWidth(7),
  //   marginRight: responsiveWidth(7)
  // },
  // ItemStyle: {
  //   marginTop: responsiveHeight(2),
  //   marginBottom: responsiveHeight(2),
  //   borderRadius: responsiveWidth(2),
  //   borderColor: colors.WHITE,
  //   backgroundColor: colors.WHITE
  // },
  // amountStyle: {
  //   width: responsiveWidth(64),
  //   height: responsiveHeight(7),
  //   textAlign: "center",
  //   fontSize: responsiveFontSize(2.5)
  // },
  // textAreaStyle: {
  //   width: responsiveWidth(64),
  //   height: responsiveHeight(15),
  //   textAlign: "center",
  //   fontSize: responsiveFontSize(2.5)
  // },
  // errorIcon: {
  //   color: colors.ERROR_ICON // red
  // },
  // errorField: {
  //   marginTop: responsiveHeight(2),
  //   marginBottom: responsiveHeight(2),
  //   borderRadius: responsiveWidth(2),
  //   borderColor: colors.ERROR_ICON, // red
  //   backgroundColor: colors.WHITE
  // },
  // buttonContainer: {
  //   justifyContent: "center",
  //   alignItems: "center"
  // },
  // buttonStyle: {
  //   height: responsiveHeight(7),
  //   width: responsiveWidth(75),
  //   marginTop: responsiveHeight(5), // 5%
  //   marginBottom: responsiveHeight(5), // 5%
  //   backgroundColor: colors.BUTTON_COLOR
  // },
  // buttonText: {
  //   fontSize: responsiveFontSize(2)
  // },

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
  modalType: {
    height: responsiveHeight(27),
    width: responsiveWidth(80),
    backgroundColor: colors.WHITE,
    borderWidth: responsiveWidth(0.7),
    borderColor: colors.MODAL_ERROR
    // borderRadius: responsiveWidth(3),
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
  modalMsgSuccess: {
    height: responsiveHeight(27),
    width: responsiveWidth(80),
    backgroundColor: colors.WHITE,
    borderWidth: responsiveWidth(0.7),
    borderColor: colors.MODAL_SUCCESS
    // borderRadius: responsiveWidth(3),
  },
  modalHLineSuccess: {
    borderWidth: responsiveWidth(0.2),
    width: responsiveWidth(55),
    borderColor: colors.MODAL_SUCCESS,
    backgroundColor: colors.MODAL_SUCCESS,
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(1)
  },
  modalTopIconSuccess: {
    color: colors.MODAL_SUCCESS,
    fontSize: responsiveFontSize(5),
    marginTop: responsiveHeight(1)
  },
  typeModalText: {
    textAlign: "center",
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(2)
    // marginLeft: responsiveWidth(5),
    // marginRight: responsiveWidth(5),
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
