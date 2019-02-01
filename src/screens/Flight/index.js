import React, { Component } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  NetInfo,
  ActivityIndicator,
  I18nManager
} from "react-native";
import {
  Container,
  Content,
  Text,
  Button,
  CheckBox,
  Picker
} from "native-base";
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

class Flight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageText: "",
      amountValue: "",
      peopleErrorAmount: false,
      cardNumberErrorAmount: false,
      isPressed: false,
      loading: false,
      successAlert: false,
      errorInputAlert: false,
      errorAlert: false,
      isConnected: true,
      balanceLoading: false,
      currentBalance: "",
      phoneSelected: false,
      qrCodeSelected: false,
      cardNumberSelected: false,
      peopleAmountInput: "",
      cardNumberAmountInput: "",
      cardNumberDestinationInput: "",
      peopleDescriptionInput: "",
      cardNumberDescriptionInput: "",
      phoneNumberDestinationInput: "",
      phoneNumberAmountInput: "",
      phoneNumberDescriptionInput: "",
      cardNumberErrorCard: false,
      phoneNumberError: false,
      phoneNumberErrorAmount: false,
      isModalServerErrorOpen: false,
      isModalRequestErrorOpen: false,
      isCardListModalVisible: false,
      cards: [],
      phones: [],
      receiverName: "",
      receiverStatus: 0,
      receiverIndexSaved: null,
      phoneOrCardListStatus: 1,
      selectedType: 0,
      selectedAirline: 0,
      selectedSource: 0,
      selectedDestination: 0,
      departureTime: "",
      arrivalTime: "",
      minTimeArrival: "",
      minTimeDeparture: "",
      maxTimeArrival: "",
      maxTimeDeparture: "",
      minAmount: "",
      maxAmount: "",
      isCheckBoxSelected: false,
      isSecondCheckBoxEnabled: false,
      isThirdCheckBoxEnabled: false
    };

    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
    this.airlines = [
      {
        key: 0,
        label: "شرکت هواپیمایی",
        value: 0
      },
      {
        key: 1,
        label: "ایران ایر",
        value: 1
      },
      {
        key: 2,
        label: "ماهان",
        value: 2
      },
      {
        key: 3,
        label: "آسمان",
        value: 3
      },
      {
        key: 4,
        label: "کیش ایر",
        value: 4
      },
      {
        key: 5,
        label: "زاگرس",
        value: 5
      },
      {
        key: 6,
        label: "کاسپین",
        value: 6
      }
    ];
    this.sourceCities = [
      {
        key: 0,
        label: "مبدا",
        value: 0
      },
      {
        key: 1,
        label: "تهران",
        value: 1
      },
      {
        key: 2,
        label: "مشهد",
        value: 2
      },
      {
        key: 3,
        label: "شیراز",
        value: 3
      },
      {
        key: 4,
        label: "اصفهان",
        value: 4
      },
      {
        key: 5,
        label: "تبریز",
        value: 5
      },
      {
        key: 6,
        label: "کرمان",
        value: 6
      }
    ];

    this.destinationCities = [
      {
        key: 0,
        label: "مقصد",
        value: 0
      },
      {
        key: 1,
        label: "تهران",
        value: 1
      },
      {
        key: 2,
        label: "مشهد",
        value: 2
      },
      {
        key: 3,
        label: "شیراز",
        value: 3
      },
      {
        key: 4,
        label: "اصفهان",
        value: 4
      },
      {
        key: 5,
        label: "تبریز",
        value: 5
      },
      {
        key: 6,
        label: "کرمان",
        value: 6
      }
    ];
  }

  focusNextField(id) {
    this.inputs[id].focus();
  }

  componentDidMount() {
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

  spacedCardNumber(str, n) {
    const ret = [];
    let i;
    let len;

    for (i = 0, len = str.length; i < len; i += n) {
      ret.push(str.substr(i, n));
    }
    return ret;
  }

  onSelectMethod = selectedType => {
    this.setState({ selectedType });
  };

  goToAnotherScreen = selectedType => {
    switch (selectedType) {
      case 1: {
        // Smart Transaction Receipt
        this.props.navigation.navigate("ShoppingReceipt");
        break;
      }
    }
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
          style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}
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
    return (
      <View style={styles.buttonContainer}>
        <Button
          block
          style={styles.nextButton}
          onPress={() => this.goToAnotherScreen(1)}
          disabled={this.state.isRequestingToServer}
        >
          <Text
            uppercase={false}
            allowFontScaling={false}
            style={styles.nextButtonText}
          >
            {I18n.t("Recharge.nextButtonText")}
          </Text>
        </Button>
      </View>
    );
  };

  showErrorAmount = errorAmount => {
    if (errorAmount) {
      return (
        <Text style={styles.errorText}>
          {I18n.t("Recharge.peopleAmountError")}
        </Text>
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
              {I18n.t("Flight.title")}
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
            <Picker
              iosHeader={I18n.t("Comments.typeOfMessage.iosHeader")}
              mode="dropdown"
              selectedValue={this.state.selectedAirline}
              onValueChange={selectedAirline =>
                this.setState({ selectedAirline })
              }
              style={styles.picker}
            >
              {this.airlines.map((option, index) => (
                <Picker.Item
                  key={option.key}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
            <View style={styles.inputBorder} />

            <View style={{ flexDirection: "row" }}>
              <View>
                <Picker
                  iosHeader={I18n.t("Comments.typeOfMessage.iosHeader")}
                  mode="dropdown"
                  selectedValue={this.state.selectedSource}
                  onValueChange={selectedSource =>
                    this.setState({ selectedSource })
                  }
                  style={styles.pickerSource}
                >
                  {this.sourceCities.map((option, index) => (
                    <Picker.Item
                      key={option.key}
                      label={option.label}
                      value={option.value}
                    />
                  ))}
                </Picker>
                <View style={styles.inputBorderSource} />
              </View>

              <View>
                <Picker
                  iosHeader={I18n.t("Comments.typeOfMessage.iosHeader")}
                  mode="dropdown"
                  selectedValue={this.state.selectedDestination}
                  onValueChange={selectedDestination =>
                    this.setState({ selectedDestination })
                  }
                  style={styles.pickerDestination}
                >
                  {this.destinationCities.map((option, index) => (
                    <Picker.Item
                      key={option.key}
                      label={option.label}
                      value={option.value}
                    />
                  ))}
                </Picker>
                <View style={styles.inputBorderSource} />
              </View>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View>
                <TextInput
                  placeholder="تاریخ رفت"
                  value={this.state.departureTime}
                  onChangeText={departureTime =>
                    this.setState({ departureTime })
                  }
                  allowFontScaling={false}
                  style={styles.departureTimeInput}
                />
                <View style={styles.inputBorderSource} />
              </View>

              <View>
                <TextInput
                  placeholder="تاریخ برگشت"
                  value={this.state.arrivalTime}
                  onChangeText={arrivalTime => this.setState({ arrivalTime })}
                  allowFontScaling={false}
                  style={styles.arrivalTimeInput}
                />
                <View style={styles.inputBorderSource} />
              </View>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View>
                <TextInput
                  placeholder="کمینه ساعت پرواز رفت"
                  value={this.state.minTimeDeparture}
                  onChangeText={minTimeDeparture =>
                    this.setState({ minTimeDeparture })
                  }
                  allowFontScaling={false}
                  style={styles.departureTimeInput}
                />
                <View style={styles.inputBorderSource} />
              </View>

              <View>
                <TextInput
                  placeholder="بیشینه ساعت پرواز رفت"
                  value={this.state.maxTimeDeparture}
                  onChangeText={maxTimeDeparture =>
                    this.setState({ maxTimeDeparture })
                  }
                  allowFontScaling={false}
                  style={styles.arrivalTimeInput}
                />
                <View style={styles.inputBorderSource} />
              </View>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View>
                <TextInput
                  placeholder="کمینه ساعت پرواز برگشت"
                  value={this.state.minTimeArrival}
                  onChangeText={minTimeArrival =>
                    this.setState({ minTimeArrival })
                  }
                  allowFontScaling={false}
                  style={styles.departureTimeInput}
                />
                <View style={styles.inputBorderSource} />
              </View>

              <View>
                <TextInput
                  placeholder="بیشینه ساعت پرواز برگشت"
                  value={this.state.maxTimeArrival}
                  onChangeText={maxTimeArrival =>
                    this.setState({ maxTimeArrival })
                  }
                  allowFontScaling={false}
                  style={styles.arrivalTimeInput}
                />
                <View style={styles.inputBorderSource} />
              </View>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View>
                <TextInput
                  placeholder="کمینه هزینه"
                  value={this.state.minAmount}
                  onChangeText={minAmount => this.setState({ minAmount })}
                  allowFontScaling={false}
                  style={styles.departureTimeInput}
                />
                <View style={styles.inputBorderSource} />
              </View>

              <View>
                <TextInput
                  placeholder="بیشینه هزینه"
                  value={this.state.maxAmount}
                  onChangeText={maxAmount => this.setState({ maxAmount })}
                  allowFontScaling={false}
                  style={styles.arrivalTimeInput}
                />
                <View style={styles.inputBorderSource} />
              </View>
            </View>

            <TouchableOpacity
              style={styles.checkBoxContainer}
              onPress={() =>
                this.setState({
                  isSecondCheckBoxEnabled: !this.state.isSecondCheckBoxEnabled
                })
              }
            >
              <CheckBox
                style={styles.checkBox}
                color={colors.GREEN_BUTTONS}
                checked={this.state.isSecondCheckBoxEnabled}
                onPress={() =>
                  this.setState({
                    isSecondCheckBoxEnabled: !this.state.isSecondCheckBoxEnabled
                  })
                }
              />
              <Text style={styles.checkBoxText}>
                در صورت موجود شدن، علاوه بر اطلاع رسانی از طریق پیامک، با کسر
                مبلغ از کارت اعتباری ام خریداری شود.
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkBoxContainer}
              onPress={() =>
                this.setState({
                  isThirdCheckBoxEnabled: !this.state.isThirdCheckBoxEnabled
                })
              }
            >
              <CheckBox
                style={styles.checkBox}
                color={colors.GREEN_BUTTONS}
                checked={this.state.isThirdCheckBoxEnabled}
                onPress={() =>
                  this.setState({
                    isThirdCheckBoxEnabled: !this.state.isThirdCheckBoxEnabled
                  })
                }
              />
              <Text style={styles.checkBoxText}>
                با گرد کردن هزینه ی بلیط یافت شده، سهمی در مصارف نیکوکاری و
                خیریه، هرچند کوچک، خواهم داشت.
              </Text>
            </TouchableOpacity>
          </View>
        </Content>
        {this.renderFooterButton()}
      </Container>
    );
  }
}

export default Flight;
