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
  successImage: {
    width: responsiveWidth(15),
    height: responsiveWidth(15)
  },
  titleText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(2.3),
    fontWeight: "normal",
    fontStyle: "normal",
    textAlign: "center",
    letterSpacing: 0.42,
    color: colors.RED_BUTTONS,
    marginVertical: responsiveHeight(1.5)
  },
  bodyText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.9),
    fontWeight: "normal",
    fontStyle: "normal",
    // textAlign: "center",
    letterSpacing: 0.42,
    color: colors.LIGHT_BLACK,
    marginVertical: responsiveHeight(1.5),
    marginHorizontal: responsiveWidth(5)
  },
  buttonContainer: {
    marginTop: responsiveHeight(2)
  },
  applyButton: {
    width: responsiveWidth(70),
    height: responsiveHeight(6),
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
