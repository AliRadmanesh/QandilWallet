import React from "react";
import { Image, I18nManager } from "react-native";
import { createMaterialTopTabNavigator } from "react-navigation";

import Home from "../../screens/Home";
import Transactions from "../../screens/Transactions";
import Profile from "../../screens/Profile";

import I18n from "../../utils/i18n";
import colors from "../../utils/colors";

const ICON_HOME_FOCUSED =
  "../../../assets/Icons/App/TabBarNavigation/home1.png";
const ICON_HOME = "../../../assets/Icons/App/TabBarNavigation/home2.png";
const ICON_TRANSACTION_FOCUSED =
  "../../../assets/Icons/App/TabBarNavigation/report1.png";
const ICON_TRANSACTION =
  "../../../assets/Icons/App/TabBarNavigation/report2.png";
const ICON_PROFILE_FOCUSED =
  "../../../assets/Icons/App/TabBarNavigation/profile1.png";
const ICON_PROFILE = "../../../assets/Icons/App/TabBarNavigation/profile2.png";

const AppTabBar = createMaterialTopTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: I18n.t("Home.title"),
        tabBarIcon: ({ tintColor, focused }) =>
          focused ? (
            <Image
              source={require(ICON_HOME_FOCUSED)}
              resizeMode="contain"
              style={{ width: 24, height: 24, marginTop: -1 }}
            />
          ) : (
            <Image
              source={require(ICON_HOME)}
              resizeMode="contain"
              style={{ width: 24, height: 24, marginTop: -1 }}
            />
          )
      }
    },
    Transactions: {
      screen: Transactions,
      navigationOptions: {
        tabBarLabel: I18n.t("Transactions.title"),
        tabBarIcon: ({ tintColor, focused }) =>
          focused ? (
            <Image
              source={require(ICON_TRANSACTION_FOCUSED)}
              resizeMode="contain"
              style={{ width: 24, height: 24, marginTop: -1 }}
            />
          ) : (
            <Image
              source={require(ICON_TRANSACTION)}
              resizeMode="contain"
              style={{ width: 24, height: 24, marginTop: -1 }}
            />
          )
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: I18n.t("Profile.title"),
        tabBarIcon: ({ tintColor, focused }) =>
          focused ? (
            <Image
              source={require(ICON_PROFILE_FOCUSED)}
              resizeMode="contain"
              style={{ width: 24, height: 24, marginTop: -1 }}
            />
          ) : (
            <Image
              source={require(ICON_PROFILE)}
              resizeMode="contain"
              style={{ width: 24, height: 24, marginTop: -1 }}
            />
          )
      }
    }
  },
  {
    // initialRouteName: "Home",
    order: ["Home", "Transactions", "Profile"],
    tabBarPosition: "bottom",
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: colors.GREEN_BUTTONS,
      inactiveTintColor: colors.LIGHT_BLACK,
      showIcon: true,
      upperCaseLabel: false,
      style: {
        backgroundColor: colors.WHITE,
        height: 56,
        borderTopWidth: 0.3,
        borderTopColor: colors.TAB_BAR_BORDER_COLOR
      },
      labelStyle: {
        fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
        fontSize: 11,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0.38,
        textAlign: "center",
        marginBottom: 0.1
      },
      indicatorStyle: {
        height: 0
      }
    }
  }
);

export default AppTabBar;
