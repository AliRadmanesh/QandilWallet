import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  NetInfo,
  ActivityIndicator,
  I18nManager
} from "react-native";
import { Container, Content, Text, Button, Spinner } from "native-base";
import { NavigationActions } from "react-navigation";
import axios from "axios";
import firebase, { Notification } from "react-native-firebase";
import ScrollableTabView from "react-native-scrollable-tab-view";

import CharityTasks from "./CharityTasks";
import CharityReport from "./CharityReport";

import I18n from "../../utils/i18n";

import styles from "./styles";
import CustomIcon from "../../utils/customIcons";
import colors from "../../utils/colors";
import strings from "../../utils/strings";
import { responsiveHeight } from "react-native-responsive-dimensions";
import PersianText from "react-native-persian-text";

const HeaderImagePath = "../../../assets/Icons/App/Transactions/header.png";
const TISHKNET_LOGO = "../../../assets/Icons/App/Internet/ISP/tishkNet.png";
const GORANNET_LOGO = "../../../assets/Icons/App/Internet/ISP/goranNet.png";
const NEWROZ_LOGO = "../../../assets/Icons/App/Internet/ISP/Newroz.png";
const MINET_LOGO = "../../../assets/Icons/App/Internet/ISP/MiNET.jpg";
const TNET_LOGO = "../../../assets/Icons/App/Internet/ISP/TNet.png";

class Charity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charges: [],
      isFetchingCharges: false,
      selectedCategory: 0,
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
      isModalErrorOpen: false
    };
    this.availableCharges = [];
  }

  componentDidMount() {
    // Get Token, Name, Card number and Phone number from AsyncStorage
    this.getBalance();

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

  async getBalance() {
    const {
      userToken,
      userPhoneNum,
      userCardNum
    } = this.props.navigation.state.params;

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
            <PersianText>
              {this.numberWithCommas(this.state.currentBalance)}
            </PersianText>
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
    }
  };

  renderISPSection = () => {
    const { selectedCategory } = this.state;

    if (selectedCategory === 1) {
      return (
        <View>
          <View
            style={[
              styles.chargeMethodsCard,
              { marginBottom: responsiveHeight(2) }
            ]}
          >
            <Text allowFontScaling={false} style={styles.mainText}>
              {I18n.t("Internet.mainISPText")}
            </Text>
            <View style={styles.chargeMethodsContainer}>
              <View
                style={
                  this.state.selectedISP === 1
                    ? styles.chargeMethodsButtonsSelected
                    : styles.chargeMethodsButtons
                }
              >
                <TouchableOpacity
                  onPress={() => this.onSelectISP(1)}
                  style={styles.asiacellContainer}
                >
                  <Image
                    source={require(TISHKNET_LOGO)}
                    style={styles.asiacellImage}
                    resizeMode="contain"
                  />
                  <Text allowFontScaling={false} style={styles.asiacellText}>
                    {I18n.t("Internet.TishkNetText")}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={
                  this.state.selectedISP === 2
                    ? styles.chargeMethodsButtonsSelected
                    : styles.chargeMethodsButtons
                }
              >
                <TouchableOpacity
                  onPress={() => this.onSelectISP(2)}
                  style={styles.asiacellContainer}
                >
                  <Image
                    source={require(GORANNET_LOGO)}
                    style={styles.asiacellImage}
                    resizeMode="contain"
                  />
                  <Text allowFontScaling={false} style={styles.asiacellText}>
                    {I18n.t("Internet.GoranNetText")}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={[
                  this.state.selectedISP === 3
                    ? styles.chargeMethodsButtonsSelected
                    : styles.chargeMethodsButtons,
                  { marginRight: 0 }
                ]}
              >
                <TouchableOpacity
                  onPress={() => this.onSelectISP(3)}
                  style={styles.asiacellContainer}
                >
                  <Image
                    source={require(NEWROZ_LOGO)}
                    style={styles.asiacellImage}
                    resizeMode="contain"
                  />
                  <Text allowFontScaling={false} style={styles.asiacellText}>
                    {I18n.t("Internet.NewrozText")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.chargeMethodsContainer}>
              <View
                style={
                  this.state.selectedISP === 4
                    ? styles.chargeMethodsButtonsSelected
                    : styles.chargeMethodsButtons
                }
              >
                <TouchableOpacity
                  onPress={() => this.onSelectISP(4)}
                  style={styles.asiacellContainer}
                >
                  <Image
                    source={require(MINET_LOGO)}
                    style={styles.asiacellImage}
                    resizeMode="contain"
                  />
                  <Text allowFontScaling={false} style={styles.asiacellText}>
                    {I18n.t("Internet.MiNetText")}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={
                  this.state.selectedISP === 5
                    ? styles.chargeMethodsButtonsSelected
                    : styles.chargeMethodsButtons
                }
              >
                <TouchableOpacity
                  onPress={() => this.onSelectISP(5)}
                  style={styles.asiacellContainer}
                >
                  <Image
                    source={require(TNET_LOGO)}
                    style={styles.asiacellImage}
                    resizeMode="contain"
                  />
                  <Text allowFontScaling={false} style={styles.asiacellText}>
                    {I18n.t("Internet.TNetText")}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.blankCard} />
            </View>
          </View>

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
        </View>
      );
    } else if (selectedCategory === 2) {
      return (
        <View style={styles.chargeMethodsCard}>
          <Text allowFontScaling={false} style={styles.mainText}>
            {I18n.t("Internet.mainISPText")}
          </Text>
          <View style={styles.chargeMethodsContainer}>
            <View
              style={
                this.state.selectedDataISP === 1
                  ? styles.chargeMethodsButtonsSelected
                  : styles.chargeMethodsButtons
              }
            >
              <TouchableOpacity
                onPress={() => this.onSelectDataISP(1)}
                style={styles.asiacellContainer}
              >
                <Image
                  source={require(TISHKNET_LOGO)}
                  style={styles.asiacellImage}
                  resizeMode="contain"
                />
                <Text allowFontScaling={false} style={styles.asiacellText}>
                  {I18n.t("Internet.TishkNetText")}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={
                this.state.selectedDataISP === 2
                  ? styles.chargeMethodsButtonsSelected
                  : styles.chargeMethodsButtons
              }
            >
              <TouchableOpacity
                onPress={() => this.onSelectDataISP(2)}
                style={styles.asiacellContainer}
              >
                <Image
                  source={require(GORANNET_LOGO)}
                  style={styles.asiacellImage}
                  resizeMode="contain"
                />
                <Text allowFontScaling={false} style={styles.asiacellText}>
                  {I18n.t("Internet.GoranNetText")}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.blankCard} />
          </View>
        </View>
      );
    }
  };

  onModalButtonPressed = modalType => {
    const {
      isModalSuccessOpen,
      isModalBalanceOpen,
      isModalServerErrorOpen
    } = this.state;
    switch (modalType) {
      case modalType === isModalSuccessOpen: {
        this.setState({ isModalSuccessOpen: false }, () => {
          this.props.navigation.navigate("Drawer");
        });
        break;
      }
      case modalType === isModalBalanceOpen: {
        this.setState({ isModalBalanceOpen: false }, () => {
          this.props.navigation.navigate("Recharge");
        });
        break;
      }
      case modalType === isModalServerErrorOpen: {
        this.setState({ isModalServerErrorOpen: false });
        break;
      }
    }
  };

  render() {
    const {
      userName,
      userCardNum,
      userPhoneNum
    } = this.props.navigation.state.params;

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
              {I18n.t("Charity.title")}
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
                {I18n.t("Charity.currentBalanceText")}
              </Text>
            </View>
            {this.renderBalance()}
          </View>

          <View style={styles.cardContainer}>
            <ScrollableTabView
              locked
              initialPage={0}
              tabBarUnderlineStyle={{ backgroundColor: "#fff" }}
              style={styles.tabViewStyle}
              tabBarTextStyle={styles.tabTextStyle}
              tabBarActiveTextColor={colors.GREEN_BUTTONS}
              tabBarInactiveTextColor={colors.LIGHT_BLACK}
            >
              <CharityTasks
                tabLabel="کار نیک"
                userCardNumber={userCardNum}
                userPhoneNumber={userPhoneNum}
                username={userName}
              />
              <CharityReport
                tabLabel="گزارش نیکوکاری"
                userCardNumber={userCardNum}
                userPhoneNumber={userPhoneNum}
                username={userName}
              />
            </ScrollableTabView>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Charity;
