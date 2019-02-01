import { Dimensions, I18nManager } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

import colors from "../../../utils/colors";

export default {
  modalContainer: {
    flex: 1,
    alignSelf: "center"
  },
  content: {
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
    width: responsiveWidth(80),
    height: responsiveHeight(40),
    backgroundColor: colors.WHITE,
    borderRadius: responsiveWidth(1)
  },
  warningImage: {
    width: responsiveWidth(15),
    height: responsiveWidth(15)
  },
  titleText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(2.2),
    fontWeight: "bold",
    fontStyle: "normal",
    textAlign: "center",
    letterSpacing: 0.42,
    color: colors.WARNING_MODAL_COLOR,
    marginVertical: responsiveHeight(1)
  },
  bodyText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.6),
    fontWeight: "300",
    fontStyle: "normal",
    textAlign: "center",
    letterSpacing: 0.42,
    color: colors.LIGHT_BLACK,
    marginVertical: responsiveHeight(1)
  },
  buttonContainer: {
    marginTop: responsiveHeight(3),
    flexDirection: "row"
  },
  yesButton: {
    width: responsiveWidth(30),
    height: responsiveHeight(6),
    backgroundColor: colors.RED_BUTTONS
  },
  noButton: {
    width: responsiveWidth(30),
    height: responsiveHeight(6),
    marginRight: responsiveWidth(3),
    backgroundColor: colors.BLUE_BUTTONS
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
