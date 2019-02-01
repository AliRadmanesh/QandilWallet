import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList
} from "react-native";
import { Content, Button } from "native-base";
import Modal from "react-native-modal";

import I18n from "../../../utils/i18n";
import CustomIcon from "../../../utils/customIcons";
import styles from "./styles";
import colors from "../../../utils/colors";

const HeaderImagePath = "../../../../assets/Icons/App/Transactions/header.png";

const CardListModal = ({
  isVisible,
  handleModalClose,
  handleRowSelected,
  cards,
  phones,
  status
}) => (
  <Modal isVisible={isVisible} style={styles.container}>
    <ImageBackground
      source={require(HeaderImagePath)}
      style={styles.headerImage}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => handleModalClose()}
          style={styles.closeIcon}
        >
          <CustomIcon name="cross" size={24} color={colors.WHITE} />
        </TouchableOpacity>

        <Text allowFontScaling={false} style={styles.titleText}>
          {status === 1
            ? I18n.t("TransferMoney1.modalCardList")
            : I18n.t("TransferMoney1.modalPhoneList")}
        </Text>

        <TouchableOpacity onPress={() => alert("help")} style={styles.helpIcon}>
          <CustomIcon name="help" size={24} color={colors.WHITE} />
        </TouchableOpacity>
      </View>
    </ImageBackground>

    <Content padder>
      {status === 1
        ? renderList(cards, handleRowSelected, status)
        : renderList(phones, handleRowSelected, status)}
      {/* </View> */}
    </Content>
  </Modal>
);

const renderList = (data, handleRowSelected, status) => {
  console.log("data", data);
  console.log("status", status);

  if (data.length == 0) {
    return (
      <Text allowFontScaling={false} style={styles.noCardText}>
        {I18n.t("TransferMoney1.noCardInCardListModalText")}
      </Text>
    );
  } else {
    // console.log("data", data);
    return (
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              status === 1
                ? handleRowSelected(item.cardNumber)
                : handleRowSelected(item.phoneNumber);
            }}
          >
            <View style={styles.row}>
              <Text allowFontScaling={false} style={styles.rowNameText}>
                {`${item.cardName}`}
              </Text>
              {status === 1 ? (
                <Text allowFontScaling={false} style={styles.rowCardText}>
                  {spacedCardNumber(item.cardNumber, 4).join(" - ")}
                </Text>
              ) : (
                <Text allowFontScaling={false} style={styles.rowCardText}>
                  {item.phoneNumber}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={separator}
      />
    );
  }
};

const separator = () => {
  return <View style={styles.separator} />;
};

spacedCardNumber = (str, n) => {
  const ret = [];
  let i;
  let len;

  for (i = 0, len = str.length; i < len; i += n) {
    ret.push(str.substr(i, n));
  }
  return ret;
};

export default CardListModal;
