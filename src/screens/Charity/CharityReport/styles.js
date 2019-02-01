import { I18nManager } from "react-native";
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import colors from "../../../utils/colors";

export default {
  container: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: colors.WHITE,
    padding: responsiveWidth(2)
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
    color: colors.LIGHT_BLACK
  },
  mainText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.7),
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0.49,
    textAlign: "center",
    color: colors.LIGHT_BLACK
  },
  cardContainer: {
    alignSelf: "center",
    width: responsiveWidth(90),
    height: responsiveHeight(65),
    backgroundColor: colors.WHITE,
    marginBottom: responsiveHeight(5)
  },
  cardContainerInside: {
    flexDirection: "row",
    alignSelf: "center",
    width: responsiveWidth(80),
    height: responsiveHeight(30),
    backgroundColor: colors.WHITE,
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(1.5),
    marginTop: responsiveHeight(2),
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
  titleTextCard: {
    // flex: 1,
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.7),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.42,
    textAlign: "center",
    color: colors.LIGHT_BLACK
  },
  subtitleTextCard: {
    // flex: 1,
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.3),
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0.37,
    textAlign: "left",
    color: colors.LIGHT_BLACK,
    marginTop: responsiveHeight(1)
  },
  buttonContainer: {
    // justifyContent: "flex-end"
    // paddingHorizontal: responsiveWidth(5),
    // paddingVertical: responsiveHeight(3)
    marginTop: responsiveHeight(4)
  },
  nextButton: {
    width: responsiveWidth(35),
    height: responsiveHeight(4),
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
  cardImage1: {
    width: responsiveWidth(76),
    height: responsiveHeight(26)
  },
  costText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.2),
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0.37,
    textAlign: "left",
    color: colors.LIGHT_BLACK
  },
  costIcon: {
    width: responsiveWidth(4),
    height: responsiveHeight(4)
  },
  currentBalanceContainer: {
    // alignSelf: "center",
    // alignItems: "center",
    flexDirection: "row",
    width: responsiveWidth(35),
    height: responsiveHeight(3)
    // backgroundColor: colors.WHITE
  },
  currentBalanceText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.2),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.58,
    textAlign: "center",
    color: colors.LIGHT_BLACK
  },
  currentBalance: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.2),
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0.58,
    textAlign: "center",
    color: colors.LIGHT_BLACK
  },
  currentBalanceUnit: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.2),
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0.58,
    textAlign: "center",
    color: colors.LIGHT_BLACK
    // marginTop: responsiveHeight(0.3)
  }
};
