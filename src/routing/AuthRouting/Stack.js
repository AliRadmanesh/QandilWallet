import { createStackNavigator } from "react-navigation";

import Login1 from "../../screens/Login/Login1"; // Entering phone number
import Login2 from "../../screens/Login/Login2"; // Entering SMS Verify Code
import Login3 from "../../screens/Login/Login3"; // Card Information
import Login4 from "../../screens/Login/Login4"; // Entering name & password (for first time reg.)

const AuthStack = () =>
  createStackNavigator(
    {
      SignIn: { screen: Login1 },
      SMSCode: { screen: Login2 },
      CardInformation: { screen: Login3 },
      EnterNamePass: { screen: Login4 }
    },
    {
      initialRouteName: "SignIn",
      headerMode: "none"
    }
  );

export default AuthStack;
