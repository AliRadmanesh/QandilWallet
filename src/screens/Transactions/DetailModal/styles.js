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
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    margin: 0,
    width: responsiveWidth(80),
    height: responsiveHeight(65),
    backgroundColor: colors.WHITE,
    borderRadius: responsiveWidth(1)
  },
  headerContainer: {
    flexDirection: "row"
  },
  closeIcon: {
    flex: 1,
    alignItems: "flex-end",
    marginTop: responsiveHeight(1.5),
    marginRight: responsiveWidth(2)
  },
  bodyContainer: {
    flex: 1,
    alignItems: "center"
  },
  titleText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(2.5),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.42,
    color: colors.GREEN_BUTTONS,
    marginVertical: responsiveHeight(1.5)
  },
  successImage: {
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    marginBottom: responsiveHeight(3)
  },
  listRow: {
    flexDirection: "row",
    paddingHorizontal: responsiveWidth(4),
    marginBottom: responsiveHeight(0.8)
  },
  listLabelText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(2),
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.LIGHTER_BLACK
  },
  listDetailText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(2),
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.LIGHT_BLACK
  },
  horizontalLine: {
    flex: 1,
    borderBottomWidth: responsiveWidth(0.2),
    borderBottomColor: colors.LIGHTER_BLACK,
    marginBottom: responsiveHeight(1.2),
    marginHorizontal: responsiveWidth(2)
  }
};
