import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  NetInfo,
  ActivityIndicator,
  TextInput,
  I18nManager,
  AsyncStorage
} from "react-native";
import { Container, Content, Text, Button, Spinner } from "native-base";
import { NavigationActions } from "react-navigation";
import axios from "axios";
import firebase, { Notification } from "react-native-firebase";
import PersianNumber from "react-native-persian-text";

import I18n from "../../utils/i18n";
import styles from "./styles";
import CustomIcon from "../../utils/customIcons";
import colors from "../../utils/colors";
import strings from "../../utils/strings";

const HeaderImagePath = "../../../assets/Icons/App/Transactions/header.png";
const SHARE_ICON = "../../../assets/Icons/App/PayBills/share.png";
const GOLD_ICON = "../../../assets/Icons/App/PayBills/gold.png";
const INCOME_ICON = "../../../assets/Icons/App/PayBills/income.png";

class PayBills extends Component {
  constructor(props) {
    super(props);

    this.state = {
      charges: [],
      isFetchingCharges: false,
      selectedCategory: 2,
      selectedISP: 0,
      selectedCharge: null,
      messageText: "",
      amountValue: "",
      peopleErrorAmount: false,
      creditCardErrorAmount: false,
      errorAddress: false,
      isPressed: false,
      loading: false,
      successAlert: false,
      errorInputAlert: false,
      errorAlert: false,
      isConnected: true,
      balanceLoading: false,
      currentBalance: "",
      peopleAmountInput: "",
      creditCardAmountInput: "",
      peopleDescriptionInput: "",
      creditCardDescriptionInput: "",
      addressInput: "",
      isModalSuccessOpen: false,
      isModalServerErrorOpen: false,
      isModalBalanceOpen: false,
      isButtonClicked: false,
      isModalErrorOpen: false,
      waterMeterInput: "",
      waterMeterInputError: false,
      mobilePhoneInput: "",
      mobilePhoneInputError: false,
      electricityInput: "",
      electricityInputError: false,
      userToken: "",
      userName: "",
      userCardNum: "",
      userPhoneNum: ""
    };

    this.availableCharges = [];
  }

  componentDidMount() {
    // Get Token, Name, Card number and Phone number from AsyncStorage
    this.bootstrapAsync();

    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );

    // Receive Notification from server (if there is any)
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        // Process your notification as required
        const newNotification = new firebase.notifications.Notification()
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title ? notification.title : "Iraq Payment")
          .setBody(notification.body)
          .setSound(notification.sound ? notification.sound : "default");

        // Android-specific properties
        newNotification.android
          .setChannelId(
            notification.channelId ? notification.channelId : "ChannelId"
          )
          .android.setSmallIcon("ic_launcher")
          .android.setAutoCancel(true);

        if (this.state.isConnected) {
          firebase.notifications().displayNotification(newNotification);
        }
      });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
    this.notificationListener();
  }

  handleConnectivityChange = isConnected => {
    this.setState({ isConnected });
  };

  bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    const userName = await AsyncStorage.getItem("userName");
    const userCardNum = await AsyncStorage.getItem("userCardNum");
    const userPhoneNum = await AsyncStorage.getItem("userPhoneNum");
    this.setState({
      userToken: userToken,
      userName: userName,
      userCardNum: userCardNum,
      userPhoneNum: userPhoneNum
    });

    if (AsyncStorage.getItem("userNotifToken")) {
      this.notifTokenFlag = await AsyncStorage.getItem("userNotifToken");
    }

    // Get Balance And Buttons & Profile Image
    this.getBalance();
  };

  async getBalance() {
    const { userToken, userPhoneNum, userCardNum } = this.state;

    this.setState({
      balanceLoading: true
    });

    try {
      // Get Balance
      let response = null;

      response = await axios.post(
        strings.API_GET_BALANCE,
        {
          id: userCardNum,
          mobile: userPhoneNum
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json"
          }
        }
      );

      this.setState({
        currentBalance: response.data,
        balanceLoading: false
      });
    } catch (e) {
      this.setState({
        currentBalance: "-",
        balanceLoading: false
      });
      this.refs.connectionErrorModal.open();
    }
  }

  numberWithCommas = value => {
    const parts = value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  /*
  async sendToServer(paymentCode, amountValue, imagePath) {
    const {
      userToken,
      userName,
      userCardNum,
      userPhoneNum
    } = this.props.navigation.state.params;

    try {
      // Create the form data object
      const data = new FormData();
      data.append("picture", {
        uri: imagePath,
        name: "bill.jpg",
        type: "image/jpg"
      });
      let response = null;

      response = await axios.post(
        strings.API_BILL_PAY,
        {
          pcode: paymentCode,
          amount: amountValue,
          pic: data,
          mobile: userPhoneNum
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (response.data === 1) {
        this.setState({
          isPressed: false,
          loading: false
        });
        // alert('Request sent successfully!');
        this.refs.modalSuccess.open();
      } else {
        this.setState({
          isPressed: false,
          loading: false
        });
        // alert('Address or amount value is not valid.');
        this.refs.modalErrorInput.open();
      }
    } catch (e) {
      this.setState({
        isPressed: false,
        loading: false
      });
      // alert('For use KP services you must connect to internet,
      // please check device connectivity!');
      this.refs.modalError.open();
    }
  }


  selectPhotoTapped() {
    const options = {
      quality: 0.5,
      maxWidth: 500,
      maxHeight: 500,
      mediaType: "photo",
      storageOptions: {
        skipBackup: true
      }
    };
    ImagePicker.launchCamera(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled take photo");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        const source = { uri: response.uri };
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          ImagePath: response.uri,
          ImageSource: source,
          errorImage: false
        });
      }
    });
  }
*/

  onSelectCategory = selectedCategory => {
    this.setState({ selectedCategory });
  };

  onSelectISP = selectedISP => {
    this.setState({ selectedISP });
  };

  onSelectDataISP = selectedDataISP => {
    this.setState({ selectedDataISP });
  };

  goToAnotherScreen = routeName => {
    const { selectedCharge, selectedCategory } = this.state;

    const navigateAction = NavigationActions.navigate({
      routeName,
      params: {
        selectedCharge,
        selectedCategory
      }
    });
    this.props.navigation.dispatch(navigateAction);
  };

  renderBalance() {
    if (this.state.balanceLoading) {
      return (
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <ActivityIndicator
            size="small"
            color={colors.SPINNER_COLOR}
            style={styles.balanceSpinner}
          />
        </View>
      );
    } else {
      return (
        <View
          style={{ flexDirection: "row", flex: 1, justifyContent: "flex-end" }}
        >
          <Text allowFontScaling={false} style={styles.currentBalance}>
            <PersianNumber>
              {this.numberWithCommas(this.state.currentBalance)}
            </PersianNumber>
          </Text>
          <Text allowFontScaling={false} style={styles.currentBalanceUnit}>
            {" ریال"}
          </Text>
        </View>
      );
    }
  }

  renderFooterButton = () => {
    const { selectedCategory } = this.state;

    if (selectedCategory === 1) {
      return (
        <View style={styles.buttonContainer}>
          <Button
            block
            style={styles.nextButton}
            onPress={() => null}
            disabled={this.state.isButtonClicked}
          >
            {this.state.isButtonClicked ? (
              <Spinner color={colors.LIGHT_WHITE} />
            ) : (
              <Text
                uppercase={false}
                allowFontScaling={false}
                style={styles.nextButtonText}
              >
                {I18n.t("Recharge.nextButtonText")}
              </Text>
            )}
          </Button>
        </View>
      );
    } else if (selectedCategory === 2) {
      return (
        <View style={styles.buttonContainer}>
          <Button
            block
            style={styles.nextButton}
            onPress={() => null}
            disabled={this.state.isButtonClicked}
          >
            {this.state.isButtonClicked ? (
              <Spinner color={colors.LIGHT_WHITE} />
            ) : (
              <Text
                uppercase={false}
                allowFontScaling={false}
                style={styles.nextButtonText}
              >
                {I18n.t("Recharge.nextButtonText")}
              </Text>
            )}
          </Button>
        </View>
      );
    } else if (selectedCategory === 3) {
      return (
        <View style={styles.buttonContainer}>
          <Button
            block
            style={styles.nextButton}
            onPress={() => null}
            disabled={this.state.isButtonClicked}
          >
            {this.state.isButtonClicked ? (
              <Spinner color={colors.LIGHT_WHITE} />
            ) : (
              <Text
                uppercase={false}
                allowFontScaling={false}
                style={styles.nextButtonText}
              >
                {I18n.t("Recharge.nextButtonText")}
              </Text>
            )}
          </Button>
        </View>
      );
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <ImageBackground
          source={require(HeaderImagePath)}
          style={styles.headerImage}
        >
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
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
              {I18n.t("PayBills.title")}
            </Text>

            <TouchableOpacity
              onPress={() => alert("help")}
              style={styles.helpIcon}
            >
              <CustomIcon name="help" size={24} color={colors.WHITE} />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <Content padder>
          <View style={styles.currentBalanceContainer}>
            <View style={{ justifyContent: "flex-start" }}>
              <Text allowFontScaling={false} style={styles.currentBalanceText}>
                {I18n.t("Recharge.currentBalanceText")}
              </Text>
            </View>
            {this.renderBalance()}
          </View>

          <View style={styles.chargeMethodsCard}>
            <Text allowFontScaling={false} style={styles.mainText}>
              {I18n.t("PayBills.cardMainText")}
            </Text>
            <View style={styles.chargeMethodsContainer}>
              <View
                style={
                  this.state.selectedCategory === 1
                    ? styles.chargeMethodsButtonsSelected
                    : styles.chargeMethodsButtons
                }
              >
                <TouchableOpacity
                  onPress={() => this.onSelectCategory(1)}
                  style={styles.electricityContainer}
                >
                  <Image
                    source={require(SHARE_ICON)}
                    style={styles.electricityImage}
                    resizeMode="contain"
                  />
                  <Text allowFontScaling={false} style={styles.electricityText}>
                    {I18n.t("PayBills.electricityText")}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={
                  this.state.selectedCategory === 2
                    ? styles.chargeMethodsButtonsSelected
                    : styles.chargeMethodsButtons
                }
              >
                <TouchableOpacity
                  onPress={() => this.onSelectCategory(2)}
                  style={styles.mobilePhoneContainer}
                >
                  <Image
                    source={require(GOLD_ICON)}
                    style={styles.mobilePhoneImage}
                    resizeMode="contain"
                  />
                  <Text allowFontScaling={false} style={styles.mobilePhoneText}>
                    {I18n.t("PayBills.mobilePhoneText")}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={
                  this.state.selectedCategory === 3
                    ? styles.chargeMethodsButtonsSelected
                    : styles.chargeMethodsButtons
                }
              >
                <TouchableOpacity
                  onPress={() => this.onSelectCategory(3)}
                  style={styles.waterContainer}
                >
                  <Image
                    source={require(INCOME_ICON)}
                    style={styles.waterImage}
                    resizeMode="contain"
                  />
                  <Text allowFontScaling={false} style={styles.waterText}>
                    {I18n.t("PayBills.waterText")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Content>
        {this.renderFooterButton()}
      </Container>
    );
  }
}

export default PayBills;
