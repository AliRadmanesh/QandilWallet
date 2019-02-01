import React from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Image,
  I18nManager
} from "react-native";
import { createDrawerNavigator, DrawerItems } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize
} from "react-native-responsive-dimensions";

import AppTabBar from "./TabBar";
// import ContactUs from "../../screens/ContactUs";
// import MyCard from "../../screens/MyCard";
// import Messages from "../../screens/Messages";
// import SendComment from "../../screens/SendComment";
// import Settings from "../../screens/Settings";

import I18n from "../../utils/i18n";
import colors from "../../utils/colors";
import CustomIcon from "../../utils/customIcons";

const CustomDrawerComponent = props => (
  <SafeAreaView style={{ flex: 1 }}>
    <View
      style={{
        height: 150,
        backgroundColor: colors.WHITE,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Image
        source={require("../../../assets/Icons/DrawerLogo.png")}
        style={{ height: responsiveWidth(32), width: responsiveWidth(32) }}
      />
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
);

const Drawer = createDrawerNavigator(
  {
    Tab: {
      screen: AppTabBar,
      navigationOptions: () => ({
        drawerLabel: I18n.t("Home.title"),
        drawerIcon: ({ tintColor }) => (
          <Icon name="ios-home" color={tintColor} size={24} />
        )
      })
    },
    ContactUs: {
      screen: AppTabBar,
      navigationOptions: () => ({
        drawerLabel: I18n.t("ContactUs.title"),
        drawerIcon: ({ tintColor }) => (
          <CustomIcon name="support" size={22} color={tintColor} />
        )
      })
    },
    MyCard: {
      screen: AppTabBar,
      navigationOptions: () => ({
        drawerLabel: I18n.t("MyCardQRCode.title"),
        drawerIcon: ({ tintColor }) => (
          <CustomIcon name="card-with-qr" size={22} color={tintColor} />
        )
      })
    },
    Messages: {
      screen: AppTabBar,
      navigationOptions: () => ({
        drawerLabel: I18n.t("Messages.title"),
        drawerIcon: ({ tintColor }) => (
          <CustomIcon name="messages" size={16} color={tintColor} />
        )
      })
    },
    SendComment: {
      screen: AppTabBar,
      navigationOptions: () => ({
        drawerLabel: I18n.t("Comments.title"),
        drawerIcon: ({ tintColor }) => (
          <CustomIcon name="comments" size={22} color={tintColor} />
        )
      })
    },
    Settings: {
      screen: AppTabBar,
      navigationOptions: () => ({
        drawerLabel: I18n.t("Settings.title"),
        drawerIcon: ({ tintColor }) => (
          <CustomIcon name="settings" size={22} color={tintColor} />
        )
      })
    }
  },
  {
    initialRouteName: "Tab",
    contentComponent: CustomDrawerComponent,
    useNativeAnimations: true,
    contentOptions: {
      activeTintColor: colors.GREEN_BUTTONS,
      inactiveTintColor: colors.LIGHT_BLACK,
      // activeBackgroundColor: colors.GREEN_BUTTONS,
      inactiveBackgroundColor: colors.WHITE,
      itemsContainerStyle: {
        // marginVertical: responsiveHeight(5)
      },
      itemStyle: {
        marginVertical: responsiveHeight(1)
      },
      iconContainerStyle: {
        opacity: 1
      },
      labelStyle: {
        fontFamily: I18nManager.isRTL ? "IRANSans" : "Roboto",
        fontSize: responsiveFontSize(1.7),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0
      }
    },
    drawerWidth: responsiveWidth(65),
    drawerPosition: I18nManager.isRTL ? "right" : "left"
  }
);

export default Drawer;
