import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Content, Button } from "native-base";
import Modal from "react-native-modal";

import styles from "./styles";
import I18n from "../../../utils/i18n";
import CustomIcon from "../../../utils/customIcons";
import colors from "../../../utils/colors";

const HelpModal = ({ isVisible, onPressReturn }) => (
  <Modal isVisible={isVisible} style={styles.modalContainer}>
    <Content>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text allowFontScaling={false} style={styles.headerText}>
            {I18n.t("Login1.headerText")}
          </Text>

          <TouchableOpacity
            onPress={() => onPressReturn()}
            style={styles.headerIcon}
          >
            <CustomIcon name="cross" size={24} color={colors.LIGHT_BLACK} />
          </TouchableOpacity>
        </View>

        <Text allowFontScaling={false} style={styles.mainText}>
          {I18n.t("Home.HelpModalMessage")}
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
              {I18n.t("Login1.HelpModalButtonText")}
            </Text>
          </Button>
        </View>
      </View>
    </Content>
  </Modal>
);

export default HelpModal;
