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
import { responsiveHeight } from "react-native-responsive-dimensions";

import I18n from "../../utils/i18n";

import styles from "./styles";
import CustomIcon from "../../utils/customIcons";
import colors from "../../utils/colors";
import strings from "../../utils/strings";

const HeaderImagePath = "../../../assets/Icons/App/Transactions/header.png";

class Questionaire extends Component {
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
      selectedQ1: 0,
      selectedQ2: 0,
      selectedQ3: 0,
      selectedQ4: 0,
      birthdayInput: "",
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
    this.question1 = [
      {
        key: 0,
        label: "دلیل اصلی شما برای سرمایه گذاری؟",
        value: 0
      },
      {
        key: 1,
        label: "سرمایه گذاری بلندمدت",
        value: 1
      },
      {
        key: 2,
        label: "سرمایه گذاری کوتاه مدت",
        value: 2
      },
      {
        key: 3,
        label: "خرید خودرو یا مسافرت",
        value: 3
      },
      {
        key: 4,
        label: "آینده نگری",
        value: 4
      },
      {
        key: 5,
        label: "سایر موارد",
        value: 5
      }
    ];
    this.question2 = [
      {
        key: 0,
        label: "نظر شما در مورد سرمایه گذاری در بورس؟",
        value: 0
      },
      {
        key: 1,
        label: "بهترین شغل دوم",
        value: 1
      },
      {
        key: 2,
        label: "قمار",
        value: 2
      },
      {
        key: 3,
        label: "راهی برای پولدارشدن",
        value: 3
      },
      {
        key: 4,
        label: "کسب سود و زیان با نوسان زیاد",
        value: 4
      },
      {
        key: 5,
        label: "نظری ندارم",
        value: 5
      }
    ];
    this.question3 = [
      {
        key: 0,
        label: "دوست دارید چه سبک شغلی داشته باشید؟",
        value: 0
      },
      {
        key: 1,
        label: "مطمئنا شغل با امنیت بالا و حقوق متعادل",
        value: 1
      },
      {
        key: 2,
        label: "احتمالا شغل با امنیت بالا و حقوق متعادل",
        value: 2
      },
      {
        key: 3,
        label: "مطمئنا شغل با امنیت پایین و حقوق بالا",
        value: 3
      },
      {
        key: 4,
        label: "احتمالا شغل با امنیت پایین و حقوق بالا",
        value: 4
      },
      {
        key: 5,
        label: "باید سایر جواب ها را درنظر بگیرم",
        value: 5
      }
    ];
    this.question4 = [
      {
        key: 0,
        label: "آرزوی پولی که می خواستید برآورده شده. با آن چه می کنید؟",
        value: 0
      },
      {
        key: 1,
        label: "سکه طلا می خرم",
        value: 1
      },
      {
        key: 2,
        label: "خانه می خرم",
        value: 2
      },
      {
        key: 3,
        label: "ماشین می خرم",
        value: 3
      },
      {
        key: 4,
        label: "مسافرت می روم",
        value: 4
      },
      {
        key: 5,
        label: "در بانک سپرده می کنم",
        value: 5
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

  goToAnotherScreen = () => {
    // Go to Chart Screen
    this.props.navigation.navigate("Chart");
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
          onPress={() => this.goToAnotherScreen()}
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
              {I18n.t("Questionaire.title")}
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
          <View style={styles.chargeMethodsCard}>
            <Text allowFontScaling={false} style={styles.mainText}>
              لطفا به سوالات زیر با دقت پاسخ دهید.
            </Text>

            <Picker
              iosHeader={I18n.t("Comments.typeOfMessage.iosHeader")}
              mode="dropdown"
              selectedValue={this.state.selectedQ1}
              onValueChange={selectedQ1 => this.setState({ selectedQ1 })}
              style={styles.picker}
            >
              {this.question1.map((option, index) => (
                <Picker.Item
                  key={option.key}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
            <View style={styles.inputBorder} />

            <Picker
              iosHeader={I18n.t("Comments.typeOfMessage.iosHeader")}
              mode="dropdown"
              selectedValue={this.state.selectedQ2}
              onValueChange={selectedQ2 => this.setState({ selectedQ2 })}
              style={styles.picker}
            >
              {this.question2.map((option, index) => (
                <Picker.Item
                  key={option.key}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
            <View style={styles.inputBorder} />

            <Picker
              iosHeader={I18n.t("Comments.typeOfMessage.iosHeader")}
              mode="dropdown"
              selectedValue={this.state.selectedQ3}
              onValueChange={selectedQ3 => this.setState({ selectedQ3 })}
              style={styles.picker}
            >
              {this.question3.map((option, index) => (
                <Picker.Item
                  key={option.key}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
            <View style={styles.inputBorder} />

            <Picker
              iosHeader={I18n.t("Comments.typeOfMessage.iosHeader")}
              mode="dropdown"
              selectedValue={this.state.selectedQ4}
              onValueChange={selectedQ4 => this.setState({ selectedQ4 })}
              style={styles.picker}
            >
              {this.question4.map((option, index) => (
                <Picker.Item
                  key={option.key}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
            <View style={styles.inputBorder} />

            <TextInput
              placeholder="تاریخ تولد"
              value={this.state.birthdayInput}
              onChangeText={birthdayInput => this.setState({ birthdayInput })}
              allowFontScaling={false}
              style={styles.birthdayInput}
            />
            <View
              style={[
                styles.inputBorderSource,
                {
                  marginBottom: responsiveHeight(2)
                }
              ]}
            />
          </View>
        </Content>
        {this.renderFooterButton()}
      </Container>
    );
  }
}

export default Questionaire;
