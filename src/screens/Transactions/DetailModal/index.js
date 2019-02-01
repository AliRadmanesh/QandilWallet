import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";
import { responsiveWidth } from "react-native-responsive-dimensions";

import I18n from "../../../utils/i18n";
import CustomIcon from "../../../utils/customIcons";
import styles from "./styles";
import colors from "../../../utils/colors";
import PersianText from "react-native-persian-text";

const SuccessImagePath =
  "../../../../assets/Icons/App/Transactions/success.png";

const returnBody = (
  type,
  amount,
  date,
  time,
  sourceCard,
  destinationCard,
  description,
  refrenceNumber,
  isTransferMoney,
  operator
) => {
  if (isTransferMoney)
    return (
      <View style={styles.bodyContainer}>
        <Text allowFontScaling={false} style={styles.titleText}>
          {I18n.t("Transactions.transactionDetails")}
        </Text>
        <Image
          source={require(SuccessImagePath)}
          style={styles.successImage}
          resizeMode="contain"
        />
        <View style={styles.listRow}>
          <Text allowFontScaling={false} style={styles.listLabelText}>
            {I18n.t("Transactions.transactionType")}
          </Text>
          <View style={styles.horizontalLine} />
          <Text allowFontScaling={false} style={styles.listDetailText}>
            {type}
          </Text>
        </View>

        <View style={styles.listRow}>
          <Text allowFontScaling={false} style={styles.listLabelText}>
            {I18n.t("Transactions.transactionAmount")}
          </Text>
          <View style={styles.horizontalLine} />
          <Text allowFontScaling={false} style={styles.listDetailText}>
            <PersianText>{amount.toString()}</PersianText> ریال
          </Text>
        </View>

        <View style={styles.listRow}>
          <Text allowFontScaling={false} style={styles.listLabelText}>
            {I18n.t("Transactions.transactionDateAndTime")}
          </Text>
          <View style={styles.horizontalLine} />
          <Text allowFontScaling={false} style={styles.listDetailText}>
            <PersianText>{date.toString()}</PersianText>
            {" - "}
            <PersianText>{time.toString()}</PersianText>
          </Text>
        </View>

        <View style={styles.listRow}>
          <Text allowFontScaling={false} style={styles.listLabelText}>
            {I18n.t("Transactions.transactionSender")}
          </Text>
          <View style={styles.horizontalLine} />
          <Text allowFontScaling={false} style={styles.listDetailText}>
            <PersianText>{sourceCard.toString()}</PersianText>
          </Text>
        </View>

        <View style={styles.listRow}>
          <Text allowFontScaling={false} style={styles.listLabelText}>
            {I18n.t("Transactions.transactionReceiver")}
          </Text>
          <View style={styles.horizontalLine} />
          <Text allowFontScaling={false} style={styles.listDetailText}>
            <PersianText>{destinationCard.toString()}</PersianText>
          </Text>
        </View>

        <View style={styles.listRow}>
          <Text allowFontScaling={false} style={styles.listLabelText}>
            {I18n.t("Transactions.transactionDescription")}
          </Text>
          <View style={styles.horizontalLine} />
          <Text
            allowFontScaling={false}
            style={[
              styles.listDetailText,
              description.toString().length > 35
                ? {
                    width: responsiveWidth(35)
                  }
                : null
            ]}
          >
            {description}
          </Text>
        </View>

        <View style={styles.listRow}>
          <Text allowFontScaling={false} style={styles.listLabelText}>
            {I18n.t("Transactions.transactionRefrence")}
          </Text>
          <View style={styles.horizontalLine} />
          <Text allowFontScaling={false} style={styles.listDetailText}>
            <PersianText>{refrenceNumber.toString()}</PersianText>
          </Text>
        </View>
      </View>
    );
  else
    return (
      <View style={styles.bodyContainer}>
        <Text allowFontScaling={false} style={styles.titleText}>
          {I18n.t("Transactions.transactionDetails")}
        </Text>
        <Image
          source={require(SuccessImagePath)}
          style={styles.successImage}
          resizeMode="contain"
        />
        <View style={styles.listRow}>
          <Text allowFontScaling={false} style={styles.listLabelText}>
            {I18n.t("Transactions.transactionType")}
          </Text>
          <View style={styles.horizontalLine} />
          <Text allowFontScaling={false} style={styles.listDetailText}>
            {type}
          </Text>
        </View>

        <View style={styles.listRow}>
          <Text allowFontScaling={false} style={styles.listLabelText}>
            {I18n.t("Transactions.transactionAmount")}
          </Text>
          <View style={styles.horizontalLine} />
          <Text allowFontScaling={false} style={styles.listDetailText}>
            <PersianText>{amount.toString()}</PersianText> ریال
          </Text>
        </View>

        <View style={styles.listRow}>
          <Text allowFontScaling={false} style={styles.listLabelText}>
            {I18n.t("Transactions.transactionDateAndTime")}
          </Text>
          <View style={styles.horizontalLine} />
          <Text allowFontScaling={false} style={styles.listDetailText}>
            {date} - {time}
          </Text>
        </View>

        <View style={styles.listRow}>
          <Text allowFontScaling={false} style={styles.listLabelText}>
            {I18n.t("Transactions.transactionOperator")}
          </Text>
          <View style={styles.horizontalLine} />
          <Text allowFontScaling={false} style={styles.listDetailText}>
            {operator}
          </Text>
        </View>

        <View style={styles.listRow}>
          <Text allowFontScaling={false} style={styles.listLabelText}>
            {I18n.t("Transactions.transactionRefrence")}
          </Text>
          <View style={styles.horizontalLine} />
          <Text allowFontScaling={false} style={styles.listDetailText}>
            <PersianText>{refrenceNumber.toString()}</PersianText>
          </Text>
        </View>
      </View>
    );
};

const DetailModal = ({
  isVisible,
  handleModalClose,
  type,
  amount,
  date,
  time,
  sourceCard,
  destinationCard,
  description,
  refrenceNumber,
  isTransferMoney,
  operator
}) => (
  <Modal isVisible={isVisible} style={styles.modalContainer}>
    <View style={styles.content}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => handleModalClose()}
          style={styles.closeIcon}
        >
          <CustomIcon name="cross" size={24} color={colors.LIGHT_BLACK} />
        </TouchableOpacity>
      </View>

      {returnBody(
        type,
        amount,
        date,
        time,
        sourceCard,
        destinationCard,
        description,
        refrenceNumber,
        isTransferMoney,
        operator
      )}
    </View>
  </Modal>
);

export default DetailModal;
