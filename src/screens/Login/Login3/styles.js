import { Dimensions, I18nManager } from "react-native";
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import colors from "../../../utils/colors";

export default {
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.WHITE
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
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(4)
  },
  cardImage: {
    width: responsiveWidth(80),
    height: responsiveHeight(25),
    // borderRadius: 8,
    backgroundColor: colors.WHITE
  },
  cardNumber: {
    fontFamily: "Roboto",
    fontSize: responsiveFontSize(2.2),
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0.42,
    textAlign: "center",
    color: colors.LIGHTER_BLACK,
    alignSelf: "center",
    marginTop: responsiveHeight(8),
    marginBottom: responsiveHeight(3)
  },
  phoneNumberText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.5),
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0.26,
    color: colors.LIGHTER_BLACK,
    marginBottom: responsiveHeight(1),
    marginLeft: responsiveWidth(5)
  },
  phoneNumber: {
    fontFamily: "Roboto",
    fontSize: responsiveFontSize(1.5),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.26,
    color: colors.LIGHT_BLACK,
    marginLeft: responsiveWidth(5)
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: responsiveHeight(2)
  },
  shareButton: {
    width: responsiveWidth(45),
    height: responsiveHeight(7),
    borderRadius: 2,
    backgroundColor: colors.GREEN_BUTTONS,
    marginRight: responsiveWidth(2)
  },
  shareButtonText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.9),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.49,
    textAlign: "center",
    color: colors.LIGHT_WHITE
  },
  nextButton: {
    width: responsiveWidth(45),
    height: responsiveHeight(7),
    borderRadius: 2,
    backgroundColor: colors.RED_BUTTONS
  },
  nextButtonText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.9),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.49,
    textAlign: "center",
    color: colors.LIGHT_WHITE
  }
};
