import { createSwitchNavigator } from "react-navigation";

import IntroFlow from "./IntroductionRouting";
import AuthFlow from "./AuthRouting";
import AppFlow from "./AppRouting";

export const createRootNavigator = (
  signedIn = false,
  isFirstTime = true,
  langFlag
) => {
  return createSwitchNavigator(
    {
      IntroFlow: {
        screen: IntroFlow(langFlag)
      },
      AuthFlow: {
        screen: AuthFlow()
      },
      AppFlow: {
        screen: AppFlow
      }
    },
    {
      initialRouteName: isFirstTime
        ? "IntroFlow"
        : signedIn
        ? "AppFlow"
        : "AuthFlow"
    }
  );
};
