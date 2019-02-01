import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  NetInfo,
  ActivityIndicator,
  I18nManager,
  TextInput
} from "react-native";
import { Container, Content, Text, Button, Picker, Spinner } from "native-base";
import { NavigationActions } from "react-navigation";
import axios from "axios";
import firebase, { Notification } from "react-native-firebase";
import PersianText from "react-native-persian-text";

import I18n from "../../utils/i18n";

import styles from "./styles";
import CustomIcon from "../../utils/customIcons";
import colors from "../../utils/colors";
import strings from "../../utils/strings";

const HeaderImagePath = "../../../assets/Icons/App/Transactions/header.png";
const IRANCELL_LOGO = "../../../assets/Icons/App/SIMCharge/irancell.png";
const MCI_ICON = "../../../assets/Icons/App/SIMCharge/mci.png";
const RIGHTEL_ICON = "../../../assets/Icons/App/SIMCharge/rightel.png";

class Internet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      charges: [],
      isFetchingCharges: false,
      selectedOperator: 0,
      selectedCharge: null,
      isPressed: false,
      isConnected: true,
      balanceLoading: false,
      currentBalance: "",
      isHelpModalVisible: false,
      isModalBalanceVisible: false,
      isModalServerErrorOpen: false,
      selectedCharge: 0,
      selectedType: 0,
      selectedData: 0,
      amountInput: ""
    };
    this.typeOfSIMCard = [
      {
        key: 0,
        label: "اعتباری",
        value: 0
      },
      {
        key: 1,
        label: "دائمی",
        value: 1
      }
    ];
    this.typeOfCharge = [
      {
        key: 0,
        label: "روزانه",
        value: 0
      },
      {
        key: 1,
        label: "هفتگی",
        value: 1
      },
      {
        key: 2,
        label: "ماهانه",
        value: 2
      },
      {
        key: 3,
        label: "سالانه",
        value: 3
      }
    ];
    this.typeOfData = [
      {
        key: 0,
        label: "1 گیگابایت، روزانه، 6400 تومان",
        value: 0
      },
      {
        key: 1,
        label: "3 گیگابایت، هفت روزه، 14000 تومان",
        value: 1
      },
      {
        key: 2,
        label: "12 گیگابایت، 30 روزه، 10000 تومان",
        value: 2
      },
      {
        key: 3,
        label: "70 گیگابایت، سالانه، 159000 تومان",
        value: 3
      }
    ];
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

  getBalance() {
    const {
      userToken,
      userPhoneNum,
      userCardNum
    } = this.props.navigation.state.params;
    this.setState({ balanceLoading: true });

    axios({
      method: "post",
      url: strings.API_GET_BALANCE,
      timeout: 1000 * 10, // Wait for 10 seconds
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`
      },
      data: {
        id: userCardNum,
        mobile: userPhoneNum
      }
    })
      .then(response => {
        // console.log(response.data);
        this.setState({
          currentBalance: response.data,
          balanceLoading: false
        });
      })
      .catch(error => {
        // console.log("error", error);
        this.setState({
          balanceLoading: false,
          currentBalance: "-",
          isModalServerErrorVisible: true
        });
      });
  }

  numberWithCommas = value => {
    const parts = value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  onSelectOperator = selectedOperator => {
    this.setState({ selectedOperator });
  };

  // fetchOperatorCharges = selectedOperator => {
  //   this.setState({ isFetchingCharges: true });

  //   axios({
  //     method: "post",
  //     url: strings.API_GET_CHARGE_TYPE,
  //     timeout: 1000 * 10, // Wait for 10 seconds
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     data: {
  //       id: selectedOperator
  //     }
  //   })
  //     .then(response => {
  //       // console.log(response.data);
  //       this.setState({ charges: response.data }, () =>
  //         this.copytypeOfSIMCard(response.data)
  //       );
  //     })
  //     .catch(error => {
  //       // console.log("error", error);
  //       this.setState({
  //         isFetchingCharges: false,
  //         isModalServerErrorVisible: true
  //       });
  //     });
  // };

  goToAnotherScreen = routeName => {
    const { selectedCharge, selectedOperator } = this.state;

    const navigateAction = NavigationActions.navigate({
      routeName,
      params: {
        selectedCharge,
        selectedOperator
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

  checkBalance = () => {
    const { selectedCharge } = this.state;
    const {
      userToken,
      userPhoneNum,
      userCardNum
    } = this.props.navigation.state.params;
    this.setState({ isPressed: true });

    axios({
      method: "post",
      url: strings.API_CHECK_BALANCE,
      timeout: 1000 * 10, // Wait for 10 seconds
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`
      },
      data: {
        id: userCardNum,
        mobile: userPhoneNum,
        chargefee: selectedCharge
      }
    })
      .then(response => {
        // console.log(response.data);
        this.setState({ isPressed: false });
        if (response.data == true) {
          // User can buy this charge
          this.goToAnotherScreen("SIMCharge2");
        } else {
          // User doesn't have enough money to buy this charge...
          this.setState({ isModalBalanceVisible: true });
        }
      })
      .catch(error => {
        // console.log("error", error);
        this.setState({
          isPressed: false,
          isModalServerErrorVisible: true
        });
      });
  };

  renderFooterButton = () => {
    const { selectedOperator } = this.state;

    if (selectedOperator !== 0) {
      return (
        <View style={styles.buttonContainer}>
          <Button
            block
            style={styles.nextButton}
            onPress={() => this.checkBalance()}
            disabled={this.state.isPressed}
          >
            {this.state.isPressed ? (
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

  renderBottomSection = () => {
    const { selectedOperator } = this.state;

    if (selectedOperator !== 0) {
      return (
        <View style={styles.peopleRequestCard}>
          <Text allowFontScaling={false} style={styles.peopleCardText}>
            {I18n.t("Internet.operatorChargesSection")}
          </Text>

          <TextInput
            placeholder="شماره تلفن"
            keyboardType="numeric"
            value={this.state.amountInput}
            onChangeText={amountInput => this.setState({ amountInput })}
            allowFontScaling={false}
            style={styles.amountInput}
          />
          <View style={styles.fieldBorder} />

          <Picker
            iosHeader={I18n.t("SIMCharge.picker.iosHeaderSIMCharge")}
            mode="dropdown"
            selectedValue={this.state.selectedType}
            onValueChange={selectedType => this.setState({ selectedType })}
            style={styles.picker}
          >
            {this.typeOfSIMCard.map((options, index) => {
              return (
                <Picker.Item
                  key={options.key}
                  label={options.label}
                  value={options.value}
                />
              );
            })}
          </Picker>
          <View style={styles.fieldBorder} />

          <Picker
            iosHeader={I18n.t("SIMCharge.picker.iosHeaderSIMCharge")}
            mode="dropdown"
            selectedValue={this.state.selectedDate}
            onValueChange={selectedDate => this.setState({ selectedDate })}
            style={styles.picker}
          >
            {this.typeOfCharge.map((options, index) => {
              return (
                <Picker.Item
                  key={options.key}
                  label={options.label}
                  value={options.value}
                />
              );
            })}
          </Picker>
          <View style={styles.fieldBorder} />

          <Picker
            iosHeader={I18n.t("SIMCharge.picker.iosHeaderSIMCharge")}
            mode="dropdown"
            selectedValue={this.state.selectedData}
            onValueChange={selectedData => this.setState({ selectedData })}
            style={styles.picker}
          >
            {this.typeOfData.map((options, index) => {
              return (
                <Picker.Item
                  key={options.key}
                  label={options.label}
                  value={options.value}
                />
              );
            })}
          </Picker>
          <View style={styles.fieldBorder} />
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
              {I18n.t("Internet.title")}
            </Text>

            <TouchableOpacity
              onPress={() => this.setState({ isHelpModalVisible: true })}
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
              {I18n.t("Internet.mainText")}
            </Text>
            <View style={styles.chargeMethodsContainer}>
              <View
                style={
                  this.state.selectedOperator === 1
                    ? styles.chargeMethodsButtonsSelected
                    : styles.chargeMethodsButtons
                }
              >
                <TouchableOpacity
                  onPress={() => this.onSelectOperator(1)}
                  style={styles.asiacellContainer}
                >
                  <Image
                    source={require(IRANCELL_LOGO)}
                    style={styles.asiacellImage}
                    irancellresizeMode="contain"
                  />
                  <Text allowFontScaling={false} style={styles.asiacellText}>
                    {I18n.t("SIMCharge.AsiacellText")}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={
                  this.state.selectedOperator === 2
                    ? styles.chargeMethodsButtonsSelected
                    : styles.chargeMethodsButtons
                }
              >
                <TouchableOpacity
                  onPress={() => this.onSelectOperator(2)}
                  style={styles.korekContainer}
                >
                  <Image
                    source={require(MCI_ICON)}
                    style={styles.korekImage}
                    resizeMode="contain"
                  />
                  <Text allowFontScaling={false} style={styles.korekText}>
                    {I18n.t("SIMCharge.KorekText")}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={[
                  this.state.selectedOperator === 3
                    ? styles.chargeMethodsButtonsSelected
                    : styles.chargeMethodsButtons,
                  { marginRight: 0 }
                ]}
              >
                <TouchableOpacity
                  onPress={() => this.onSelectOperator(3)}
                  style={styles.zainContainer}
                >
                  <Image
                    source={require(RIGHTEL_ICON)}
                    style={styles.zainImage}
                    resizeMode="contain"
                  />
                  <Text allowFontScaling={false} style={styles.zainText}>
                    {I18n.t("SIMCharge.ZainText")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {this.renderBottomSection()}
        </Content>
        {this.renderFooterButton()}
      </Container>
    );
  }
}

export default Internet;
