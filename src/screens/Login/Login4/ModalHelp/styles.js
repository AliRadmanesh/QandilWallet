import { I18nManager } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

import colors from "../../../../utils/colors";

export default {
  modalContainer: {
    flex: 1,
    marginTop: responsiveHeight(30), // (100 - height of modal) / 2
    alignSelf: "center"
  },
  content: {
    margin: 0,
    // justifyContent: "center",
    // alignItems: "center",
    width: responsiveWidth(80), // Width of Modal
    height: responsiveHeight(40), // Height of Modal
    backgroundColor: colors.WHITE,
    borderRadius: responsiveWidth(1)
  },
  header: {
    flexDirection: "row",
    marginBottom: responsiveHeight(2)
  },
  headerText: {
    flex: 1,
    alignItems: "flex-start",
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(2.5),
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0.42,
    color: colors.BLUE_BUTTONS,
    marginVertical: responsiveHeight(1),
    marginLeft: responsiveWidth(5)
  },
  headerIcon: {
    flex: 1,
    alignItems: "flex-end",
    marginTop: responsiveHeight(1.5),
    marginRight: responsiveWidth(2)
  },
  mainText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.8),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.42,
    color: colors.LIGHT_BLACK,
    lineHeight: responsiveHeight(3.5),
    marginVertical: responsiveHeight(1.5),
    marginHorizontal: responsiveWidth(5)
  },
  buttonContainer: {
    alignSelf: "center",
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
