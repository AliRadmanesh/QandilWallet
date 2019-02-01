import { createStackNavigator } from "react-navigation";

import SelectLanguageScreen from "../../screens/Introduction/SelectLanguage";
import IntroductionScreen from "../../screens/Introduction/Introduction1";

const IntroStack = langFlag =>
  createStackNavigator(
    {
      SelectLanguage: { screen: SelectLanguageScreen },
      Introduction1: { screen: IntroductionScreen }
    },
    {
      initialRouteName: langFlag ? "Introduction1" : "SelectLanguage",
      headerMode: "none"
    }
  );

export default IntroStack;
