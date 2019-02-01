import React from "react";
import { View, Text, Image } from "react-native";
import { Content, Button } from "native-base";
import Modal from "react-native-modal";

import styles from "./styles";
import I18n from "../../../utils/i18n";
import CustomIcon from "../../../utils/customIcons";
import colors from "../../../utils/colors";

const ErrorImagePath = "../../../../assets/Icons/App/Recharge/error.png";

const ModalBalanceError = ({ isVisible, onPressReturn }) => (
  <Modal isVisible={isVisible} style={styles.modalContainer}>
    <View style={styles.content}>
      <Image
        source={require(ErrorImagePath)}
        style={styles.successImage}
        resizeMode="contain"
      />

      <Text allowFontScaling={false} style={styles.titleText}>
        {I18n.t("SIMCharge.modalBalanceErrorMessage")}
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          block
          style={styles.applyButton}
          onPress={() => onPressReturn()}
        >
          <Text
            allowFontScaling={false}
            uppercase={false}
            style={styles.buttonText}
          >
            {I18n.t("SIMCharge.modalBalanceErrorButtonText")}
          </Text>
        </Button>
      </View>
    </View>
  </Modal>
);

export default ModalBalanceError;
