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
    top: 16
  },
  logoIcon: {
    position: "absolute",
    top: responsiveHeight(40),
    right: responsiveWidth(20),
    bottom: responsiveHeight(55),
    left: responsiveWidth(40)
  },
  middleTextStyle: {
    alignSelf: "center",
    marginTop: responsiveHeight(10),
    fontFamily: "Roboto",
    fontSize: responsiveFontSize(1.7), //13,
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.LIGHT_BLACK,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: {
      width: 0,
      height: 2
    },
    textShadowRadius: 4
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: responsiveHeight(5),
    marginBottom: responsiveHeight(5)
  },
  languageButton: {
    width: responsiveWidth(23),
    height: responsiveHeight(19),
    borderRadius: 8,
    backgroundColor: colors.WHITE,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: responsiveWidth(1),
    marginRight: responsiveWidth(1.5),
    justifyContent: "center",
    alignItems: "center"
  },
  selectedLanguageButton: {
    width: responsiveWidth(23),
    height: responsiveHeight(19),
    borderRadius: 8,
    backgroundColor: colors.WHITE,
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
    elevation: 5,
    padding: responsiveWidth(1),
    marginRight: responsiveWidth(1.5),
    justifyContent: "center",
    alignItems: "center"
  },
  buttonTextEnglish: {
    textAlign: "center",
    marginTop: responsiveHeight(1),
    fontFamily: "Roboto",
    fontSize: 13,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.LIGHT_BLACK
  },
  buttonTextKurdish: {
    textAlign: "center",
    marginTop: responsiveHeight(1),
    fontFamily: "IRANSans",
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.LIGHT_BLACK
  },
  buttonTextArabic: {
    textAlign: "center",
    marginTop: responsiveHeight(1),
    fontFamily: "IRANSans",
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.LIGHT_BLACK
  },
  continueButtonContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: responsiveHeight(2)
  },
  continueButtonDisabled: {
    alignSelf: "center",
    width: responsiveWidth(92),
    height: responsiveHeight(8),
    borderRadius: 2,
    backgroundColor: colors.RED_BUTTONS,
    opacity: 0.5
  },
  continueButtonTextDisabled: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.49,
    textAlign: "center",
    color: colors.LIGHT_WHITE,
    opacity: 0.5
  },
  continueButtonEnabled: {
    alignSelf: "center",
    width: responsiveWidth(92),
    height: responsiveHeight(8),
    borderRadius: 2,
    backgroundColor: colors.RED_BUTTONS
  },
  continueButtonTextEnabled: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.49,
    textAlign: "center",
    color: colors.LIGHT_WHITE
  }
};
