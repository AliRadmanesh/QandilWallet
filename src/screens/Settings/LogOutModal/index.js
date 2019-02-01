import React from "react";
import { View, Text, Image } from "react-native";
import { Button } from "native-base";
import Modal from "react-native-modal";

import styles from "./styles";
import I18n from "../../../utils/i18n";
import CustomIcon from "../../../utils/customIcons";

const WarningImagePath = "../../../../assets/Icons/App/Settings/warning.png";

const LogOutModal = ({ isVisible, onPressNO, onPressYES }) => (
  <Modal isVisible={isVisible} style={styles.modalContainer}>
    <View style={styles.content}>
      <Image
        source={require(WarningImagePath)}
        style={styles.warningImage}
        resizeMode="contain"
      />

      <Text allowFontScaling={false} style={styles.titleText}>
        {I18n.t("Settings.modalLogoutTitleMessage")}
      </Text>

      <Text allowFontScaling={false} style={styles.bodyText}>
        {I18n.t("Settings.modalLogoutMessage")}
      </Text>

      <View style={styles.buttonContainer}>
        <Button block style={styles.noButton} onPress={() => onPressNO()}>
          <Text
            allowFontScaling={false}
            uppercase={false}
            style={styles.buttonText}
          >
            {I18n.t("Settings.noButton")}
          </Text>
        </Button>

        <Button block style={styles.yesButton} onPress={() => onPressYES()}>
          <Text
            allowFontScaling={false}
            uppercase={false}
            style={styles.buttonText}
          >
            {I18n.t("Settings.yesButton")}
          </Text>
        </Button>
      </View>
    </View>
  </Modal>
);

export default LogOutModal;
