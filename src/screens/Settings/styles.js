import { I18nManager, StyleSheet } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

import colors from "../../utils/colors";

export default {
  container: {
    backgroundColor: colors.LIGHT_WHITE
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
    marginTop: responsiveHeight(3),
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(2.5),
    fontWeight: "bold",
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(1.5),
    marginBottom: responsiveHeight(1)
  },
  rowIcon: {
    width: responsiveWidth(10)
  },
  rowText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.8),
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0.42,
    textAlign: "center",
    color: colors.LIGHT_BLACK
  },
  separator: {
    marginHorizontal: responsiveWidth(2),
    marginVertical: responsiveHeight(1.5),
    backgroundColor: colors.BLACK,
    height: StyleSheet.hairlineWidth
  },
  switchContainer: {
    flex: 1,
    alignItems: "flex-end"
  }

  // langContainer: {
  //   alignItems: "flex-start",
  //   paddingRight: 10,
  //   paddingLeft: 30,
  //   borderTopWidth: 2,
  //   borderTopColor: "#000",
  //   flexDirection: "row",
  //   padding: 5,
  //   borderRightWidth: 0,
  //   borderLeftWidth: 2,
  //   borderRightColor: "#000",
  //   borderLeftColor: "#000"
  // },
  // separate: {
  //   marginTop: 50
  // },
  // picker: {
  //   width: responsiveWidth(30)
  // }
};
