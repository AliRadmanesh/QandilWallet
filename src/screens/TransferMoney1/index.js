import React, { Component } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage,
  NetInfo,
  ActivityIndicator,
  I18nManager
} from "react-native";
import { Container, Content, Text, Button, Spinner } from "native-base";
import TextInputMask from "react-native-text-input-mask";
import { NavigationActions } from "react-navigation";
import axios from "axios";
import firebase, { Notification } from "react-native-firebase";
import PersianNumber from "react-native-persian-text";

import I18n from "../../utils/i18n";

import styles from "./styles";
import CustomIcon from "../../utils/customIcons";
import colors from "../../utils/colors";
import strings from "../../utils/strings";
import CardListModal from "./CardListModal";

const HeaderImagePath = "../../../assets/Icons/App/Transactions/header.png";
const CREDIT_CARD_IMAGE = "../../../assets/Icons/App/Recharge/creditCard.png";
const PHONE_IMAGE = "../../../assets/Icons/App/TransferMoney/phone.png";
const QR_CODE_IMAGE = "../../../assets/Icons/App/TransferMoney/qrCode.png";

class TransferMoney1 extends Component {
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
      phoneOrCardListStatus: 1
    };

    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
    this.tempCards = [];
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

  onSelectMethod = index => {
    if (index === 1) {
      // Credit Card Selected
      this.setState({
        cardNumberSelected: true,
        phoneSelected: false,
        qrCodeSelected: false
      });
    } else if (index === 2) {
      // Phone Selected
      this.setState({
        cardNumberSelected: false,
        phoneSelected: true,
        qrCodeSelected: false
      });
    } else if (index === 3) {
      // QR Code Selected
      this.setState({
        cardNumberSelected: false,
        phoneSelected: false,
        qrCodeSelected: true
      });
    }
  };

  goToAnotherScreen = (routeName, index) => {
    switch (routeName) {
      case "TransferMoney2": {
        const {
          cardNumberDestinationInput,
          cardNumberAmountInput,
          cardNumberDescriptionInput,
          phoneNumberDestinationInput,
          phoneNumberAmountInput,
          phoneNumberDescriptionInput,
          receiverName,
          receiverStatus,
          receiverIndexSaved
        } = this.state;
        const {
          userToken,
          userPhoneNum,
          userCardNum
        } = this.props.navigation.state.params;

        let destination = "";
        let amount = "";
        let description = "";

        switch (index) {
          case 1: {
            // Card Number
            destination = cardNumberDestinationInput;
            amount = cardNumberAmountInput;
            description = cardNumberDescriptionInput;
            break;
          }
          case 2: {
            // Phone Number
            destination = phoneNumberDestinationInput;
            amount = phoneNumberAmountInput;
            description = phoneNumberDescriptionInput;
            break;
          }
        }

        const navigateAction = NavigationActions.navigate({
          routeName,
          params: {
            index, // 1 => Transfer with Card #, 2 => Transfer with Phone #, 3 => Transfer with QR, 4 => Transfer with Shopping
            userToken,
            userPhoneNum,
            userCardNum,
            destination,
            amount,
            description,
            receiverName,
            receiverStatus,
            receiverIndexSaved
          }
        });
        this.props.navigation.dispatch(navigateAction);
        break;
      }
      case "ChargeCenter": {
        const navigateAction = NavigationActions.navigate({
          routeName
        });
        this.props.navigation.dispatch(navigateAction);
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

  checkCreditCardInputs = async index => {
    const { cardNumberAmountInput, cardNumberDestinationInput } = this.state;

    const patternPositiveNaturalNumber = /^[+]?\d+?$/;
    const checkAmount = cardNumberAmountInput.match(
      patternPositiveNaturalNumber
    );
    const checkDestination = cardNumberDestinationInput.match(
      patternPositiveNaturalNumber
    );

    switch (index) {
      case 1: {
        if (cardNumberAmountInput === "" || checkAmount == null) {
          this.setState({ cardNumberErrorAmount: true });
        }
        break;
      }
      case 2: {
        if (
          cardNumberDestinationInput.length < 16 ||
          checkDestination == null
        ) {
          this.setState({ cardNumberErrorCard: true });
        }
        break;
      }
      default: {
        if (cardNumberAmountInput === "" || checkAmount == null) {
          this.setState({ cardNumberErrorAmount: true });
        }
        if (
          cardNumberDestinationInput.length < 16 ||
          checkDestination == null
        ) {
          this.setState({ cardNumberErrorCard: true });
        }
      }
    }
  };

  checkPhoneInputs = async index => {
    const { phoneNumberDestinationInput, phoneNumberAmountInput } = this.state;

    const patternPositiveNaturalNumber = /^[+]?\d+?$/;
    const checkAmount = phoneNumberAmountInput.match(
      patternPositiveNaturalNumber
    );
    const checkDestination = phoneNumberDestinationInput.match(
      patternPositiveNaturalNumber
    );

    switch (index) {
      case 1: {
        if (phoneNumberAmountInput === "" || checkAmount == null) {
          this.setState({ phoneNumberErrorAmount: true });
        }
        break;
      }
      case 2: {
        if (
          phoneNumberDestinationInput.length < 10 ||
          checkDestination == null
        ) {
          this.setState({ phoneNumberError: true });
        }
        break;
      }
      default: {
        if (phoneNumberAmountInput === "" || checkAmount == null) {
          this.setState({ phoneNumberErrorAmount: true });
        }
        if (
          phoneNumberDestinationInput.length < 10 ||
          checkDestination == null
        ) {
          this.setState({ phoneNumberError: true });
        }
      }
    }
  };

  checkValuesFromServer = index => {
    switch (index) {
      case 1: {
        // Card Number
        const {
          userToken,
          userCardNum,
          userPhoneNum
        } = this.props.navigation.state.params;

        this.checkCreditCardInputs(3).then(() => {
          const {
            cardNumberDestinationInput,
            cardNumberAmountInput,
            cardNumberErrorAmount,
            cardNumberErrorCard
          } = this.state;
          if (!cardNumberErrorAmount && !cardNumberErrorCard) {
            this.setState({ isRequestingToServer: true });

            // console.log(
            //   "hei hei what you mean!!!",
            //   userCardNum,
            //   userPhoneNum,
            //   cardNumberDestinationInput,
            //   cardNumberAmountInput
            // );

            axios
              .post(
                strings.API_CHECK_VALUES,
                {
                  fcard: userCardNum,
                  tcard: cardNumberDestinationInput,
                  amount: cardNumberAmountInput,
                  mobile: userPhoneNum
                },
                {
                  headers: {
                    Authorization: `Bearer ${userToken}`,
                    "Content-Type": "application/json"
                  }
                }
              )
              .then(response => {
                if (response.data !== 0) {
                  this.setState({ receiverName: response.data }, () =>
                    this.checkIfDestCardSavedBefore()
                  );
                  this.checkBalance(1);
                } else {
                  this.setState({ isRequestingToServer: false });
                  alert("Dest Card or Amount value is not valid.");
                }
              })
              .catch(error => {
                this.setState({ isRequestingToServer: false });
                console.log(
                  "For use KP services you must connect to internet",
                  error
                );
              });
          }
        });
        break;
      }
      case 2: {
        // Phone Number
        const {
          userToken,
          userCardNum,
          userPhoneNum
        } = this.props.navigation.state.params;

        this.checkPhoneInputs(3).then(() => {
          const {
            phoneNumberDestinationInput,
            phoneNumberAmountInput,
            phoneNumberErrorAmount,
            phoneNumberError
          } = this.state;
          if (!phoneNumberErrorAmount && !phoneNumberError) {
            this.setState({ isRequestingToServer: true });

            axios
              .post(
                strings.API_CHECK_VALUES,
                {
                  fcard: userCardNum,
                  tcard: phoneNumberDestinationInput,
                  amount: phoneNumberAmountInput,
                  mobile: userPhoneNum
                },
                {
                  headers: {
                    Authorization: `Bearer ${userToken}`,
                    "Content-Type": "application/json"
                  }
                }
              )
              .then(response => {
                if (response.data !== 0) {
                  this.setState({ receiverName: response.data }, () =>
                    this.checkIfDestPhoneSavedBefore()
                  );
                  this.checkBalance(2);
                } else {
                  this.setState({ isRequestingToServer: false });
                  alert("Dest Phone Number or Amount value is not valid.");
                }
              })
              .catch(error => {
                this.setState({ isRequestingToServer: false });
                console.log(
                  "For use KP services you must connect to internet",
                  error
                );
              });
          }
        });
        break;
      }
    }
  };

  checkIfDestPhoneSavedBefore = () => {
    const { phoneNumberDestinationInput, receiverName } = this.state;
    const newData = this.tempCards.filter(item => {
      return item.phoneNumber.indexOf(phoneNumberDestinationInput) > -1;
    });
    console.log("newData", newData);
    if (newData.length !== 0) {
      // Destination Phone is available in CardLists
      if (receiverName !== newData.cardName) {
        console.log("receiverName", receiverName);
        // Receiver has changed his/her name (update name needed)
        this.setState({
          receiverStatus: 2,
          receiverIndexSaved: parseInt(newData.id) + 1
        });
      } else {
        // Everything is OK. Don't save anything!
        this.setState({ receiverStatus: 3 });
      }
    } else {
      // Destination Card is New
      this.setState({ receiverStatus: 1 });
    }
  };

  checkIfDestCardSavedBefore = () => {
    const { cardNumberDestinationInput, receiverName } = this.state;
    const newData = this.tempCards.filter(item => {
      return item.cardNumber.indexOf(cardNumberDestinationInput) > -1;
    });
    console.log("newData", newData);
    if (newData.length !== 0) {
      // Destination Card is available in CardLists
      if (receiverName !== newData.cardName) {
        console.log("receiverName", receiverName);
        // Receiver has changed his/her name (update name needed)
        this.setState({
          receiverStatus: 2,
          receiverIndexSaved: parseInt(newData.id) + 1
        });
      } else {
        // Everything is OK. Don't save anything!
        this.setState({ receiverStatus: 3 });
      }
    } else {
      // Destination Card is New
      this.setState({ receiverStatus: 1 });
    }
  };

  checkBalance = async index => {
    const {
      userToken,
      userPhoneNum,
      userCardNum
    } = this.props.navigation.state.params;
    const { cardNumberAmountInput, phoneNumberAmountInput } = this.state;

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

      this.setState({ isRequestingToServer: false });

      switch (index) {
        case 1: {
          // Card Number
          if (response.data >= cardNumberAmountInput) {
            this.goToAnotherScreen("TransferMoney2", index);
          } else {
            alert("Amount not enough");
          }
          break;
        }
        case 2: {
          // Phone Number
          if (response.data >= phoneNumberAmountInput) {
            this.goToAnotherScreen("TransferMoney2", index);
          } else {
            alert("Amount not enough");
          }
          break;
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  renderFooterButton = () => {
    const { cardNumberSelected, phoneSelected, qrCodeSelected } = this.state;

    if (cardNumberSelected) {
      return (
        <View style={styles.buttonContainer}>
          <Button
            block
            style={styles.nextButton}
            onPress={() => this.checkValuesFromServer(1)}
            disabled={this.state.isRequestingToServer}
          >
            {this.state.isRequestingToServer ? (
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
    } else if (phoneSelected) {
      return (
        <View style={styles.buttonContainer}>
          <Button
            block
            style={styles.nextButton}
            onPress={() => this.checkValuesFromServer(2)}
            disabled={this.state.isRequestingToServer}
          >
            {this.state.isRequestingToServer ? (
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
    } else if (qrCodeSelected) {
      // Go to QR Screen
      return (
        <View style={styles.buttonContainer}>
          <Button
            block
            style={styles.nextButton}
            onPress={() => this.goToQRCodeScanner()}
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
    }
  };

  goToQRCodeScanner = () => {
    const {
      userToken,
      userPhoneNum,
      userCardNum
    } = this.props.navigation.state.params;

    this.props.navigation.navigate("TransferMoneyScanQR1", {
      userToken,
      userPhoneNum,
      userCardNum
    });
  };

  getPhones = async () => {
    // Get saved cards from AsyncStorage
    // For that I need two things:
    // 1. The number of cards (#number)
    // 2. All card number values (@CardNumebr#number)
    const numberOfPhones = await AsyncStorage.getItem("@numberOfPhones");
    this.tempCards = [];

    if (numberOfPhones !== null) {
      // Get list of cards + their names
      // Open modal with list of card numbers
      for (let index = 1; index <= parseInt(numberOfPhones); index++) {
        const phoneNumber = await AsyncStorage.getItem(`@phoneNumber${index}`);
        const cardName = await AsyncStorage.getItem(`@cardName${index}`);
        const tempCard = {
          id: index - 1,
          phoneNumber: phoneNumber,
          cardName: cardName
        };
        this.tempCards.push(tempCard);
      }

      this.setState({
        phones: this.tempCards,
        phoneOrCardListStatus: 2, // for Phones
        isCardListModalVisible: true
      });
    } else {
      // Show modal saying there is no saved cards
      this.setState({
        phoneOrCardListStatus: 2, // for Phones
        isCardListModalVisible: true
      });
    }
  };

  getCards = async () => {
    // await AsyncStorage.setItem("@numberOfCards", "2");
    // await AsyncStorage.removeItem("@cardNumber3");
    // await AsyncStorage.removeItem("@cardName3");
    // await AsyncStorage.setItem("@cardNumber2", "7107202428464209");
    // await AsyncStorage.setItem("@cardName2", "Milad");
    // await AsyncStorage.setItem("@cardNumber3", "9856541232569645");
    // await AsyncStorage.setItem("@cardName3", "Arash");

    // Get saved cards from AsyncStorage
    // For that I need two things:
    // 1. The number of cards (#number)
    // 2. All card number values (@CardNumebr#number)
    const numberOfCards = await AsyncStorage.getItem("@numberOfCards");
    this.tempCards = [];

    if (numberOfCards !== null) {
      // Get list of cards + their names
      // Open modal with list of card numbers
      for (let index = 1; index <= parseInt(numberOfCards); index++) {
        const cardNumber = await AsyncStorage.getItem(`@cardNumber${index}`);
        const cardName = await AsyncStorage.getItem(`@cardName${index}`);
        const tempCard = {
          id: index - 1,
          cardNumber: cardNumber,
          cardName: cardName
        };
        this.tempCards.push(tempCard);
      }

      this.setState({
        cards: this.tempCards,
        phoneOrCardListStatus: 1, // for Cards
        isCardListModalVisible: true
      });
    } else {
      // Show modal saying there is no saved cards
      this.setState({
        phoneOrCardListStatus: 1, // for Cards
        isCardListModalVisible: true
      });
    }
  };

  renderBasedOnMethod = () => {
    const { userPhoneNum, userCardNum } = this.props.navigation.state.params;
    const { cardNumberSelected, phoneSelected, qrCodeSelected } = this.state;

    if (cardNumberSelected) {
      return (
        <View style={styles.peopleRequestCard}>
          <Text allowFontScaling={false} style={styles.peopleCardText}>
            {I18n.t("Recharge.peopleCardText")}
          </Text>

          <Text style={styles.fromCardText} allowFontScaling={false}>
            {I18n.t("TransferMoney1.fromCardText")}
          </Text>
          <TextInput
            editable={false}
            underlineColorAndroid="transparent"
            style={styles.fromInput}
            value={this.spacedCardNumber(userCardNum, 4).join(" - ")}
            allowFontScaling={false}
            ref={input => {
              this.inputs["one"] = input;
            }}
          />
          <View style={styles.fieldBorder} />

          <View style={styles.toCardTextButtonContainer}>
            <View style={styles.toCardTextContainer}>
              <Text style={styles.toCardText} allowFontScaling={false}>
                {I18n.t("TransferMoney1.toCardText")}
              </Text>
            </View>

            <View style={styles.addButtonContainer}>
              <Button style={styles.addButton} onPress={this.getCards}>
                <Text
                  allowFontScaling={false}
                  uppercase={false}
                  style={styles.addButtonText}
                >
                  {I18n.t("TransferMoney1.addCardText")}
                </Text>
              </Button>
            </View>
          </View>
          <TextInputMask
            underlineColorAndroid="transparent"
            style={styles.toInput}
            value={this.state.cardNumberDestinationInput}
            allowFontScaling={false}
            keyboardType="numeric"
            ref={input => (this.inputs["two"] = input)}
            onFocus={() => this.setState({ cardNumberErrorCard: false })}
            onSubmitEditing={() => this.checkCreditCardInputs(2)}
            onEndEditing={() => this.checkCreditCardInputs(2)}
            refInput={ref => {
              this.input = ref;
            }}
            onChangeText={(formatted, extracted) => {
              // console.log(formatted); // 1234 - 5678 - 1234 - 5678
              // console.log(extracted); // 1234567812345678
              this.setState({ cardNumberDestinationInput: extracted });
            }}
            mask={"[0000] - [0000] - [0000] - [0000]"}
          />
          <View
            style={
              this.state.cardNumberErrorCard
                ? styles.fieldBorderError
                : styles.fieldBorder
            }
          />
          {this.showErrorCard(this.state.cardNumberErrorCard)}

          <TextInput
            value={this.state.cardNumberAmountInput}
            style={styles.amountInput}
            underlineColorAndroid="transparent"
            keyboardType="numeric"
            placeholder="Amount *"
            maxLength={10}
            onFocus={() => this.setState({ cardNumberErrorAmount: false })}
            onChangeText={cardNumberAmountInput =>
              this.setState({ cardNumberAmountInput })
            }
            onSubmitEditing={() => this.checkCreditCardInputs(1)}
            onEndEditing={() => this.checkCreditCardInputs(1)}
          />
          <View
            style={
              this.state.cardNumberErrorAmount
                ? styles.fieldBorderError
                : styles.fieldBorder
            }
          />
          {this.showErrorAmount(this.state.cardNumberErrorAmount)}

          <TextInput
            multiline
            value={this.state.cardNumberDescriptionInput}
            style={styles.descriptionInput}
            underlineColorAndroid="transparent"
            placeholder="Description"
            onChangeText={cardNumberDescriptionInput =>
              this.setState({ cardNumberDescriptionInput })
            }
          />
          <View style={styles.fieldBorder} />
        </View>
      );
    } else if (phoneSelected) {
      return (
        <View style={styles.peopleRequestCard}>
          <Text allowFontScaling={false} style={styles.peopleCardText}>
            {I18n.t("Recharge.peopleCardText")}
          </Text>

          <Text style={styles.fromCardText} allowFontScaling={false}>
            {I18n.t("TransferMoney3.fromPhoneText")}
          </Text>
          <TextInput
            editable={false}
            underlineColorAndroid="transparent"
            style={styles.fromInput}
            value={userPhoneNum}
            allowFontScaling={false}
            ref={input => {
              this.inputs["one"] = input;
            }}
          />
          <View style={styles.fieldBorder} />

          <View style={styles.toCardTextButtonContainer}>
            <View style={styles.toCardTextContainer}>
              <Text style={styles.toCardText} allowFontScaling={false}>
                {I18n.t("TransferMoney3.toPhoneText")}
              </Text>
            </View>

            <View style={styles.addButtonContainer}>
              <Button style={styles.addButton} onPress={this.getPhones}>
                <Text
                  allowFontScaling={false}
                  uppercase={false}
                  style={styles.addButtonText}
                >
                  {I18n.t("TransferMoney3.addPhoneText")}
                </Text>
              </Button>
            </View>
          </View>
          <TextInputMask
            underlineColorAndroid="transparent"
            style={styles.toInput}
            value={this.state.phoneNumberDestinationInput}
            allowFontScaling={false}
            keyboardType="numeric"
            ref={input => (this.inputs["two"] = input)}
            onFocus={() => this.setState({ phoneNumberError: false })}
            onSubmitEditing={() => this.checkPhoneInputs(2)}
            onEndEditing={() => this.checkPhoneInputs(2)}
            refInput={ref => {
              this.input = ref;
            }}
            onChangeText={(formatted, extracted) => {
              // console.log(formatted); // 1234 - 5678 - 1234 - 5678
              // console.log(extracted); // 1234567812345678
              this.setState({ phoneNumberDestinationInput: extracted });
            }}
            mask={"[00000000000]"}
          />
          <View
            style={
              this.state.phoneNumberError
                ? styles.fieldBorderError
                : styles.fieldBorder
            }
          />
          {this.showErrorPhone(this.state.phoneNumberError)}

          <TextInput
            value={this.state.phoneNumberAmountInput}
            style={styles.amountInput}
            underlineColorAndroid="transparent"
            keyboardType="numeric"
            placeholder="Amount *"
            maxLength={10}
            onFocus={() => this.setState({ phoneNumberErrorAmount: false })}
            onChangeText={phoneNumberAmountInput =>
              this.setState({ phoneNumberAmountInput })
            }
            onSubmitEditing={() => this.checkPhoneInputs(1)}
            onEndEditing={() => this.checkPhoneInputs(1)}
          />
          <View
            style={
              this.state.phoneNumberErrorAmount
                ? styles.fieldBorderError
                : styles.fieldBorder
            }
          />
          {this.showErrorAmount(this.state.phoneNumberErrorAmount)}

          <TextInput
            multiline
            value={this.state.phoneNumberDescriptionInput}
            style={styles.descriptionInput}
            underlineColorAndroid="transparent"
            placeholder="Description"
            onChangeText={phoneNumberDescriptionInput =>
              this.setState({ phoneNumberDescriptionInput })
            }
          />
          <View style={styles.fieldBorder} />
        </View>
      );
    } else if (qrCodeSelected) {
      // return (
      //   <View style={styles.peopleRequestCard}>
      //     <Text allowFontScaling={false} style={styles.peopleCardText}>
      //       {I18n.t("TransferMoney1.qrCodeCardText")}
      //     </Text>

      {
        /* <QRCodeScanner
            showMarker
            onRead={this.onSuccess}
            containerStyle={styles.qrScannerStyle}
            cameraStyle={styles.cameraContainer}
          /> */
      }

      {
        /* <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.qrScannerStyle}
            type={RNCamera.Constants.Type.back}
            permissionDialogTitle={"Permission to use camera"}
            permissionDialogMessage={
              "We need your permission to use your camera phone"
            }
            onGoogleVisionBarcodesDetected={({ barcodes }) => {
              console.log(barcodes);
            }}
          /> */
      }
      //   </View>
      // );
    }
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

  showErrorCard = errorCard => {
    if (errorCard) {
      return (
        <Text style={styles.errorText}>
          {I18n.t("TransferMoney1.cardError")}
        </Text>
      );
    }
  };

  showErrorPhone = errorPhone => {
    if (errorPhone) {
      return (
        <Text style={styles.errorText}>
          {I18n.t("TransferMoney3.phoneError")}
        </Text>
      );
    }
  };

  onModalButtonPressed = modalType => {
    const {
      isModalSuccessOpen,
      isModalRequestErrorOpen,
      isModalServerErrorOpen
    } = this.state;
    switch (modalType) {
      case modalType === isModalSuccessOpen: {
        this.setState({ isModalSuccessOpen: false }, () => {
          this.props.navigation.navigate("Drawer");
        });
        break;
      }
      case modalType === isModalRequestErrorOpen: {
        this.setState({ isModalRequestErrorOpen: false });
        break;
      }
      case modalType === isModalServerErrorOpen: {
        this.setState({ isModalServerErrorOpen: false });
        break;
      }
    }
  };

  handleCardListModalClose = () => {
    this.setState({ isCardListModalVisible: false });
  };

  handleRowSelected = number => {
    if (number.length > 11) {
      this.setState({
        cardNumberDestinationInput: number,
        cardNumberErrorCard: false,
        isCardListModalVisible: false
      });
    } else {
      this.setState({
        phoneNumberDestinationInput: number,
        phoneNumberError: false,
        isCardListModalVisible: false
      });
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <CardListModal
          isVisible={this.state.isCardListModalVisible}
          handleModalClose={this.handleCardListModalClose}
          handleRowSelected={this.handleRowSelected}
          cards={this.state.cards}
          phones={this.state.phones}
          status={this.state.phoneOrCardListStatus}
        />

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
              {I18n.t("TransferMoney1.title")}
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
              {I18n.t("TransferMoney1.mainText")}
            </Text>
            <View style={styles.chargeMethodsContainer}>
              <View
                style={
                  this.state.cardNumberSelected
                    ? styles.chargeMethodsButtonsSelected
                    : styles.chargeMethodsButtons
                }
              >
                <TouchableOpacity
                  onPress={() => this.onSelectMethod(1)}
                  style={styles.cardNumberContainer}
                >
                  <Image
                    source={require(CREDIT_CARD_IMAGE)}
                    style={styles.cardNumberImage}
                    resizeMode="contain"
                  />
                  <Text allowFontScaling={false} style={styles.cardNumberText}>
                    {I18n.t("TransferMoney1.cardNumberText")}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={
                  this.state.phoneSelected
                    ? styles.chargeMethodsButtonsSelected
                    : styles.chargeMethodsButtons
                }
              >
                <TouchableOpacity
                  onPress={() => this.onSelectMethod(2)}
                  style={styles.chargeCenterContainer}
                >
                  <Image
                    source={require(PHONE_IMAGE)}
                    style={styles.chargeCenterImage}
                    resizeMode="contain"
                  />
                  <Text
                    allowFontScaling={false}
                    style={styles.chargeCenterText}
                  >
                    {I18n.t("TransferMoney1.phoneText")}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={[
                  this.state.qrCodeSelected
                    ? styles.chargeMethodsButtonsSelected
                    : styles.chargeMethodsButtons,
                  { marginRight: 0 }
                ]}
              >
                <TouchableOpacity
                  onPress={() => this.onSelectMethod(3)}
                  style={styles.peopleContainer}
                >
                  <Image
                    source={require(QR_CODE_IMAGE)}
                    style={styles.peopleImage}
                    resizeMode="contain"
                  />
                  <Text allowFontScaling={false} style={styles.peopleText}>
                    {I18n.t("TransferMoney1.qrCodeText")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {this.renderBasedOnMethod()}
        </Content>
        {this.renderFooterButton()}
      </Container>
    );
  }
}

export default TransferMoney1;
