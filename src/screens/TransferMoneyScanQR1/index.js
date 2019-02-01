import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  I18nManager
} from "react-native";
import { NavigationActions } from "react-navigation";
import QRCodeScanner from "react-native-qrcode-scanner";

import I18n from "../../utils/i18n";
import CustomIcon from "../../utils/customIcons";
import styles from "./styles";
import colors from "../../utils/colors";
import strings from "../../utils/strings";

const HeaderImagePath = "../../../assets/Icons/App/Transactions/header.png";

const TransferMoneyScanQR1 = props => (
  <View style={styles.container}>
    <ImageBackground
      source={require(HeaderImagePath)}
      style={styles.headerImage}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.closeIcon}
        >
          <CustomIcon
            name="arrow-left"
            size={24}
            color={colors.WHITE}
            style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}
          />
        </TouchableOpacity>

        <Text allowFontScaling={false} style={styles.titleText}>
          {I18n.t("TransferMoneyQR1.title")}
        </Text>

        <TouchableOpacity onPress={() => alert("help")} style={styles.helpIcon}>
          <CustomIcon name="help" size={24} color={colors.WHITE} />
        </TouchableOpacity>
      </View>
    </ImageBackground>

    <QRCodeScanner
      showMarker
      onRead={() => onSuccess(response, props)}
      containerStyle={styles.qrScannerStyle}
      cameraStyle={styles.cameraContainer}
    />

    {/* <Button
      block
      onPress={() =>
        props.navigation.navigate("TransferMoneyScanQR2", {
          index: 3, // For Transfer with Scan QR Code
          userToken: props.navigation.state.params.userToken,
          userPhoneNum: props.navigation.state.params.userPhoneNum,
          userCardNum: props.navigation.state.params.userCardNum,
          destinationCardNumber: "7107202437655023",
          destinationName: "Ali"
        })
      }
    >
      <Text>GO!</Text>
    </Button> */}
  </View>
);

const onSuccess = (response, props) => {
  const string = response.data;
  const isValid = string.indexOf("#");

  if (isValid !== -1) {
    const splited = string.split("#");
    const userName = splited[0];
    const userCardNum = splited[1];
    const userPhoneNum = splited[2];

    const navigateAction = NavigationActions.navigate({
      routeName: "TransferMoneyScanQR2",
      params: {
        index: 3, // For Transfer with Scan QR Code
        userToken: props.navigation.state.params.userToken,
        userPhoneNum: props.navigation.state.params.userPhoneNum,
        userCardNum: props.navigation.state.params.userCardNum,
        destinationCardNumber: "7107202437655023",
        destinationName: "Ali"
      }
    });
    props.navigation.dispatch(navigateAction);
  } else {
    alert(strings.QR_NOT_VALID); // Then it must reactivate
  }
};

export default TransferMoneyScanQR1;
