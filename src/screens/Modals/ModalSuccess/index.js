import React from "react";
import { View, Text, Image } from "react-native";
import { Button } from "native-base";
import Modal from "react-native-modal";

import styles from "./styles";
import I18n from "../../../utils/i18n";

const SuccessImagePath =
  "../../../../assets/Icons/App/Transactions/success.png";

const ModalSuccess = ({
  isVisible,
  onPressReturn,
  messageTitle,
  messageBody
}) => (
  <Modal isVisible={isVisible} style={styles.modalContainer}>
    <View style={styles.content}>
      <Image
        source={require(SuccessImagePath)}
        style={styles.successImage}
        resizeMode="contain"
      />

      <Text allowFontScaling={false} style={styles.titleText}>
        {messageTitle}
      </Text>

      <Text allowFontScaling={false} style={styles.bodyText}>
        {messageBody}
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
            {I18n.t("Profile.infoTab.modalSuccessButtonText")}
          </Text>
        </Button>
      </View>
    </View>
  </Modal>
);

export default ModalSuccess;
