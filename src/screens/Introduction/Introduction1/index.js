import React from "react";
import { View, Text, Button } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppIntroSlider from "react-native-app-intro-slider";

import I18n from "../../../utils/i18n";
import { onDoneIntroduction } from "../../../boot/initialConfigs";
import styles from "./styles";

const slides = [
  {
    key: "somethun",
    title: "Title 1",
    text: "Description.\nSay something cool",
    image: require("./assets/1.jpg"),
    imageStyle: styles.image,
    backgroundColor: "#59b2ab"
  },
  {
    key: "somethun-dos",
    title: "Title 2",
    text: "Other cool stuff",
    image: require("./assets/2.jpg"),
    imageStyle: styles.image,
    backgroundColor: "#febe29"
  },
  {
    key: "somethun1",
    title: "Rocket guy",
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: require("./assets/3.jpg"),
    imageStyle: styles.image,
    backgroundColor: "#22bcb5"
  }
];

const _renderNextButton = () => {
  return (
    <View style={styles.buttonCircle}>
      <Ionicons
        name="md-arrow-round-forward"
        color="rgba(255, 255, 255, .9)"
        size={24}
        style={{ backgroundColor: "transparent" }}
      />
    </View>
  );
};

const _renderDoneButton = () => {
  return (
    <View style={styles.buttonCircle}>
      <Ionicons
        name="md-checkmark"
        color="rgba(255, 255, 255, .9)"
        size={24}
        style={{ backgroundColor: "transparent" }}
      />
    </View>
  );
};

const onDone = props => {
  const { navigate } = props.navigation;
  onDoneIntroduction().then(() => navigate("SignIn"));
};

const IntroductionScreen = props => {
  return (
    <AppIntroSlider
      slides={slides}
      renderDoneButton={_renderDoneButton}
      renderNextButton={_renderNextButton}
      onDone={() => onDone(props)}
    />
  );
};

export default IntroductionScreen;
