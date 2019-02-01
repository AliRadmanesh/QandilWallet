import { AppRegistry } from "react-native";
import CodePush from "react-native-code-push";

import App from "./src/boot";

// CodePush-ifying the app
const CodePushifyApp = CodePush(App);

AppRegistry.registerComponent("IraqPayment", () => CodePushifyApp);
