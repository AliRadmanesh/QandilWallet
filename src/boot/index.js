import React, { Component } from "react";
import { View, ActivityIndicator, YellowBox } from "react-native";
import { StyleProvider, Root } from "native-base";
import I18n from "../utils/i18n";

import { createRootNavigator } from "../routing";
import {
  isSignedIn,
  isFirstTime,
  onLanguageSelected,
  isTokenAssigned
} from "./initialConfigs";

import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";

export default class Setup extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      userToken: "",
      isConnected: true,
      signedIn: false,
      checkedSignIn: false,
      isFirstTime: true,
      isLanguageSelected: false,
      hasToken: false
    };

    YellowBox.ignoreWarnings(["Require cycle:"]);
  }

  componentDidMount() {
    onLanguageSelected()
      .then(result => {
        if (result !== null) {
          this.setState({
            isLanguageSelected: true
          });
          // Set app locale language
          I18n.locale = result;
          console.log("###I18n.locale### " + I18n.currentLocale());
        } else {
          this.setState({
            isLanguageSelected: false
          });
        }
      })
      .catch(err => console.log("An error occured in LanguageFlag"));

    isFirstTime()
      .then(res => this.setState({ isFirstTime: res }))
      .catch(err => console.log("An error occured in FirstTimeFlag"));

    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => console.log("An error occurred in SignInFlag"));

    // isTokenAssigned()
    //   .then(res => {
    //     this.setState({ hasToken: res });
    //     console.log(
    //       "isTokenAssigned invoked........ + hasToken: " + this.state.hasToken
    //     );
    //   })
    //   .catch(err => console.log("An error occured in TokenFlag"));
  }

  render() {
    const {
      checkedSignIn,
      signedIn,
      isFirstTime,
      isLanguageSelected
      // hasToken
    } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything OR render Spinner (better ways to do this)
    if (!checkedSignIn) {
      return <ActivityIndicator />;
    }

    const Layout = createRootNavigator(
      signedIn,
      isFirstTime,
      isLanguageSelected
    );
    return (
      <StyleProvider style={getTheme(variables)}>
        <Root>
          <Layout />
        </Root>
      </StyleProvider>
    );
  }
}
