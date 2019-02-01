import { I18nManager } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

import colors from "../../utils/colors";

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
  cardContainer: {
    alignSelf: "center",
    justifyContent: "center",
    width: responsiveWidth(90),
    backgroundColor: colors.WHITE,
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(1.5),
    marginBottom: responsiveHeight(2),
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
  logo: {
    width: responsiveWidth(70),
    height: responsiveWidth(15),
    alignSelf: "center"
  },
  versionText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.8),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: colors.CHART_COLOR
  },
  headerText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(2),
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0.42,
    color: colors.LIGHT_BLACK,
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(3)
  },
  bodyText: {
    fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
    fontSize: responsiveFontSize(1.7),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.42,
    color: colors.LIGHT_BLACK,
    lineHeight: responsiveHeight(3.5),
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(3)
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
  }
};
