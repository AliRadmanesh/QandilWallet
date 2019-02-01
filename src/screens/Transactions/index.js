import React, { Component } from "react";
import {
  View,
  AsyncStorage,
  ActivityIndicator,
  NetInfo,
  ImageBackground,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { Container, Content, Text, Icon } from "native-base";
import { NavigationActions } from "react-navigation";
import axios from "axios";
import firebase, { Notification } from "react-native-firebase";
import moment from "moment";
import PersianNumber from "react-native-persian-text";

import I18n from "../../utils/i18n";

import CustomIcon from "../../utils/customIcons";
import styles from "./styles";
import colors from "../../utils/colors";
import strings from "../../utils/strings";

import DetailModal from "./DetailModal";
import ModalHelp from "./ModalHelp";
import ModalRequestError from "../Modals/ModalRequestError";
import ModalServerError from "../Modals/ModalServerError";

const HEADER_IMAGE = "../../../assets/Icons/App/Home/Header.png";
const DEFAULT_PROFILE_IMAGE =
  "../../../assets/Icons/App/Home/Profile_default.jpg";

class Transactions extends Component {
  constructor(props) {
    super(props);
    // moment.locale('fa');
    this.state = {
      transactions: [],
      userToken: "",
      userName: "",
      userCardNum: "",
      userPhoneNum: "",
      loading: true,
      isConnected: true,
      ImageSource: null,
      currentBalance: "",
      loyaltyPoint: "1290",
      balanceLoading: true,
      isFilterModalVisible: false,
      filterRadioDateSelected: 0,
      filterSpecificDateSelectedFrom: moment().format("DD MMMM YYYY"),
      filterSpecificDateSelectedTo: moment().format("DD MMMM YYYY"),
      filterMinAmount: "",
      filterMaxAmount: "",
      filterRadioTypeSelected: 0,
      isSortModalVisible: false,
      sortRadioTypeSelected: 0,
      isDetailModalVisible: false,
      transactionType: "",
      transactionAmount: 0,
      transactionDate: 0,
      transactionTime: 0,
      transactionSrcCard: 0,
      transactionDestCard: 0,
      transactionDescription: 0,
      transactionRefNumber: 0,
      isTransactionTransferMoney: false,
      transactionOperator: "",
      isHelpModalVisible: false,
      isModalRequestErrorVisible: false,
      isModalServerErrorVisible: false
    };
    this.arrayholder = [];
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

  getImage = async () => {
    const path = await AsyncStorage.getItem("ProfileImagePath");

    if (path != null) {
      const source = { uri: path };
      this.setState({ ImageSource: source });
    } else {
      const source = require(DEFAULT_PROFILE_IMAGE);
      this.setState({ ImageSource: source });
    }
  };

  getTransctions() {
    const { userToken, userCardNum, userPhoneNum } = this.state;

    axios({
      method: "post",
      url: strings.API_REPORT,
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
          transactions: response.data,
          loading: false
        });
        this.arrayholder = response.data;
        //   console.log(this.arrayholder);
      })
      .catch(error => {
        // console.log("error", error);
        this.setState({ loading: false, isModalServerErrorVisible: true });
      });
  }

  getBalance() {
    const { userToken, userCardNum, userPhoneNum } = this.state;
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
          currentBalance: "-"
        });
      });
  }

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

    this.getTransctions();
    this.getBalance();
    this.getImage();
  };

  sendLog(type) {
    const { isConnected, userPhoneNum, userToken } = this.state;
    if (isConnected) {
      axios({
        method: "post",
        url: strings.API_SEND_LOG,
        timeout: 1000 * 10, // Wait for 10 seconds
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`
        },
        data: {
          type,
          mobile: userPhoneNum
        }
      })
        .then(response => {
          // console.log("response.data", response.data);
        })
        .catch(error => {
          // console.log("error", error);
        });
    }
  }

  numberWithCommas = value => {
    const parts = value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  preventDoubleTap = (component, doFunc) => {
    if (!component.wasClickedYet) {
      //  eslint-disable-next-line no-param-reassign
      component.wasClickedYet = true;
      setTimeout(() => {
        //  eslint-disable-next-line no-param-reassign
        component.wasClickedYet = false;
      }, 1000);
      doFunc();
    }
  };

  returnOperation(transactionsList) {
    // 1,2,3 Card2card - 4 Shopping - 5 SIM charge
    const { type, src } = transactionsList;
    if (type === 1 || type === 2 || type === 3) {
      if (src.toString() === this.state.userCardNum) {
        // Send Money
        return I18n.t("Transactions.sendMoney");
      } else {
        // Receive Money
        return I18n.t("Transactions.sendMoney");
      }
    } else if (type === 4) {
      return I18n.t("Transactions.shopping");
    } else if (type === 5) {
      return I18n.t("Transactions.simCharge");
    } else if (type === 6) {
      return I18n.t("Transactions.recharge");
    }
  }

  isTransactionTransferMoney(transactions) {
    if (transactions.type === 5) return false;
    else if (
      transactions.type === 1 ||
      transactions.type === 2 ||
      transactions.type === 3 ||
      transactions.type === 4
    )
      return true;
  }

  returnTransactionType(transactions) {
    if (this.state.userCardNum === transactions.src.toString()) {
      // Withdraw
      return I18n.t("Transactions.withdraw");
    } else {
      // Deposite
      return I18n.t("Transactions.deposit");
    }
  }

  renderTransactions() {
    const { transactions, loading } = this.state;
    if (loading) {
      return <ActivityIndicator size="large" color={colors.SPINNER_COLOR} />;
    } else {
      if (transactions) {
        return (
          <View>
            <View style={styles.searchRowContainer}>
              <View style={styles.filterContainer}>
                <TouchableOpacity
                  onPress={() => this.setState({ isFilterModalVisible: true })}
                >
                  <CustomIcon
                    style={styles.filterIcon}
                    name="filter"
                    size={24}
                    color={colors.BLACK}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.sortContainer}>
                <TouchableOpacity
                  onPress={() => this.setState({ isSortModalVisible: true })}
                >
                  <CustomIcon
                    style={styles.sortIcon}
                    name="sort"
                    size={24}
                    color={colors.BLACK}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.searchContainer}>
                <Icon
                  style={styles.searchIcon}
                  name="ios-search"
                  size={24}
                  color={colors.BLACK}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder={I18n.t("Transactions.searchPlaceholder")}
                  onChangeText={text => this.searchFilterFunction(text)}
                  underlineColorAndroid="transparent"
                />
              </View>
              <View style={styles.minAmountBorder} />
            </View>
            {transactions.slice(0, 29).map((transactionsList, index) => (
              <TouchableOpacity
                style={styles.transactionCard}
                onPress={() =>
                  this.setState({
                    transactionType: this.returnOperation(transactionsList),
                    transactionAmount: transactions[index].Fee,
                    transactionDate: transactions[index].date,
                    transactionTime: transactions[index].time,
                    transactionSrcCard: transactions[index].src,
                    transactionDestCard: transactions[index].dest,
                    transactionDescription: transactions[index].desc,
                    transactionRefNumber: transactions[index].Refrence,
                    isTransactionTransferMoney: this.isTransactionTransferMoney(
                      transactionsList
                    ),
                    transactionOperator: transactions[index].op,
                    isDetailModalVisible: true
                  })
                }
              >
                <View style={styles.transactionFirstRow}>
                  <View style={styles.depositeWithdrawContainer}>
                    <CustomIcon
                      name="arrow-down"
                      size={18}
                      color={
                        this.returnTransactionType(transactionsList) === "واریز"
                          ? colors.TRANSACTION_GREEN_COLOR
                          : colors.TRANSACTION_RED_COLOR
                      }
                      style={
                        this.returnTransactionType(transactionsList) ===
                        "برداشت"
                          ? { transform: [{ scaleY: -1 }] }
                          : null
                      }
                    />
                    <Text
                      allowFontScaling={false}
                      style={
                        this.returnTransactionType(transactionsList) === "واریز"
                          ? styles.depositeWithdrawText
                          : [
                              styles.depositeWithdrawText,
                              { color: colors.TRANSACTION_RED_COLOR }
                            ]
                      }
                    >
                      {this.returnTransactionType(transactionsList)}
                    </Text>
                  </View>

                  <View style={styles.transactionDateContainer}>
                    <CustomIcon
                      name="calendar"
                      size={18}
                      color={colors.BLACK}
                    />
                    <Text
                      allowFontScaling={false}
                      style={styles.transactionDateText}
                    >
                      {moment(transactionsList.date).format("Do MMM YYYY")}
                    </Text>
                  </View>

                  <View style={styles.transactionTimeContainer}>
                    <CustomIcon name="clock" size={18} color={colors.BLACK} />
                    <Text
                      allowFontScaling={false}
                      style={styles.transactionTimeText}
                    >
                      <PersianNumber>{transactionsList.time}</PersianNumber>
                    </Text>
                  </View>
                </View>

                <View style={styles.transactionSecondRow}>
                  <Text
                    allowFontScaling={false}
                    style={styles.transactionTypeText}
                  >
                    {this.returnOperation(transactionsList)}
                  </Text>
                  <View style={styles.horizontalLine} />
                  <View style={styles.transactionAmountContainer}>
                    <Text
                      allowFontScaling={false}
                      style={
                        this.returnTransactionType(transactionsList) === "واریز"
                          ? styles.transactionAmountText
                          : [
                              styles.transactionAmountText,
                              { color: colors.TRANSACTION_RED_COLOR }
                            ]
                      }
                    >
                      <PersianNumber>
                        {this.numberWithCommas(transactionsList.Fee)}
                      </PersianNumber>
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={
                        this.returnTransactionType(transactionsList) === "واریز"
                          ? styles.transactionAmountUnitText
                          : [
                              styles.transactionAmountUnitText,
                              { color: colors.TRANSACTION_RED_COLOR }
                            ]
                      }
                    >
                      ریال
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );
      } else {
        return (
          <Text style={styles.noTransactionText}>
            {strings.NO_TRANSACTION_TEXT}
          </Text>
        );
      }
    }
  }

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
          <Text allowFontScaling={false} style={styles.BalanceText}>
            <PersianNumber>
              {this.numberWithCommas(this.state.currentBalance)}
            </PersianNumber>
          </Text>
          <Text allowFontScaling={false} style={styles.BalanceUnit}>
            {" ریال"}
          </Text>
        </View>
      );
    }
  }

  renderLoyaltyPoint() {
    const { balanceLoading, loyaltyPoint } = this.state;

    // if (balanceLoading) {
    //   return (
    //     <View style={styles.balanceSpinnerContainer}>
    //       <ActivityIndicator
    //         size="small"
    //         color={colors.SPINNER_COLOR}
    //         style={styles.balanceSpinner}
    //       />
    //     </View>
    //   );
    // } else {
    return (
      <View style={styles.loyaltyPointView}>
        <Text allowFontScaling={false} style={styles.BalanceText}>
          <PersianNumber>{this.numberWithCommas(loyaltyPoint)}</PersianNumber>
        </Text>
        <Text allowFontScaling={false} style={styles.BalanceUnit}>
          {" امتیاز"}
        </Text>
      </View>
    );
    // }
  }

  returnTypeString(type, source) {
    const { userCardNum } = this.state;

    switch (type) {
      case 1: // Transfer Money (with Card Number)
      case 2: // Transfer Money (With Phone Number)
      case 3: {
        // Transfer Money (With QR Code)
        if (userCardNum === source.toString()) {
          // Withdraw == Send Money
          return I18n.t("Transactions.sendMoney");
        } else {
          // Deposite == Receive Money
          return I18n.t("Transactions.sendMoney");
        }
      }
      case 4: {
        // Shopping
        return I18n.t("Transactions.shopping");
      }
      case 5: {
        // SIM Charge
        return I18n.t("Transactions.simCharge");
      }
      case 6: {
        // Internet
        return I18n.t("Transactions.internet");
      }
      case 7: {
        // Charity
        return I18n.t("Transactions.charity");
      }
      case 8: {
        // Pay Bills
        return I18n.t("Transactions.payBills");
      }
      case 9: {
        // Recharge
        return I18n.t("Transactions.recharge");
      }
    }
  }

  goToAnotherScreen(index) {
    switch (index) {
      case 7:
        navigateAction = NavigationActions.navigate({
          routeName: "Recharge",
          params: {
            Index: index,
            userToken: this.state.userToken,
            userName: this.state.userName,
            userCardNum: this.state.userCardNum,
            userPhoneNum: this.state.userPhoneNum
          }
        });
        this.props.navigation.dispatch(navigateAction);
        //Send log to server
        this.sendLog(10);
        break;
    }
  }

  handleFilterModalClose = () => {
    this.setState({ isFilterModalVisible: false });
  };

  handleFilterSelectedDate = index => {
    this.setState({ filterRadioDateSelected: index });
    console.log(index);
  };

  handleFilterDateChange = (index, date) => {
    if (index === 1) this.setState({ filterSpecificDateSelectedFrom: date });
    else if (index === 2) this.setState({ filterSpecificDateSelectedTo: date });
    // console.log(this.state.filterSpecificDateSelected);
  };

  handleFilterAmountChange = (index, amount) => {
    if (index === 1) this.setState({ filterMinAmount: amount });
    else if (index === 2) this.setState({ filterMaxAmount: amount });
  };

  handleFilterSelectedType = index => {
    this.setState({ filterRadioTypeSelected: index });
  };

  handleSortModalClose = () => {
    this.setState({ isSortModalVisible: false });
  };

  handleSortTypeSelection = index => {
    this.setState({ sortRadioTypeSelected: index });
  };

  handleDetailModalClose = () => {
    this.setState({ isDetailModalVisible: false });
  };

  searchFilterFunction = text => {
    const newData = this.arrayholder.filter(item => {
      const itemData = this.returnTypeString(item.type, item.src);
      const textData = text.toLowerCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({ transactions: newData });
  };

  handleSort = () => {
    const { transactions, sortRadioTypeSelected } = this.state;

    if (transactions) {
      if (sortRadioTypeSelected === 1) {
        transactions.sort(function(a, b) {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        });
      } else if (sortRadioTypeSelected === 2) {
        transactions.sort(function(a, b) {
          return b.Fee - a.Fee;
        });
      } else if (sortRadioTypeSelected === 3) {
        // Still don't know how to implement it!
      }

      this.setState({ isSortModalVisible: false });
    }
  };

  onModalButtonPressed = modalType => {
    const {
      isHelpModalVisible,
      isModalRequestErrorVisible,
      isModalServerErrorVisible
    } = this.state;
    switch (modalType) {
      case modalType === isHelpModalVisible: {
        this.setState({ isHelpModalVisible: false });
        break;
      }
      case modalType === isModalRequestErrorVisible: {
        this.setState({ isModalRequestErrorVisible: false });
        break;
      }
      case modalType === isModalServerErrorVisible: {
        this.setState({ isModalServerErrorVisible: false });
        break;
      }
    }
  };

  render() {
    // console.log(this.state.transactions);
    return (
      <Container style={styles.container}>
        <DetailModal
          isVisible={this.state.isDetailModalVisible}
          handleModalClose={this.handleDetailModalClose}
          type={this.state.transactionType}
          amount={this.state.transactionAmount}
          date={this.state.transactionDate}
          time={this.state.transactionTime}
          sourceCard={this.state.transactionSrcCard}
          destinationCard={this.state.transactionDestCard}
          description={this.state.transactionDescription}
          refrenceNumber={this.state.transactionRefNumber}
          isTransferMoney={this.state.isTransactionTransferMoney}
          operator={this.state.transactionOperator}
        />
        <ModalHelp
          isVisible={this.state.isHelpModalVisible}
          onPressReturn={() =>
            this.onModalButtonPressed(this.state.isHelpModalVisible)
          }
        />
        <ModalRequestError
          isVisible={this.state.isModalRequestErrorVisible}
          onPressReturn={() =>
            this.onModalButtonPressed(this.state.isModalRequestErrorVisible)
          }
          messageTitle={I18n.t("Login1.modalRequestErrorTitle")}
          messageBody={I18n.t("Login1.modalRequestErrorBody")}
        />
        <ModalServerError
          isVisible={this.state.isModalServerErrorVisible}
          onPressReturn={() =>
            this.onModalButtonPressed(this.state.isModalServerErrorVisible)
          }
        />

        <KeyboardAvoidingView behavior="position">
          <ImageBackground
            source={require(HEADER_IMAGE)}
            style={styles.headerImage}
          >
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.openDrawer();
                  this.sendLog(2);
                }}
                style={styles.menuIcon}
              >
                <CustomIcon name="menu" size={24} color={colors.WHITE} />
              </TouchableOpacity>

              <Text allowFontScaling={false} style={styles.titleText}>
                {I18n.t("Transactions.title")}
              </Text>

              <TouchableOpacity
                onPress={() => this.setState({ isHelpModalVisible: true })}
                style={styles.helpIcon}
              >
                <CustomIcon name="help" size={24} color={colors.WHITE} />
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: "center" }}>
              <View style={styles.profileImageContainer}>
                {/* <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}> */}
                {this.state.ImageSource === null ? (
                  <Image
                    style={styles.profileImageStyle}
                    source={require(DEFAULT_PROFILE_IMAGE)}
                  />
                ) : (
                  <Image
                    style={styles.profileImageStyle}
                    source={this.state.ImageSource}
                  />
                )}
                {/* </TouchableOpacity> */}
              </View>

              <Text allowFontScaling={false} style={styles.userName}>
                {this.state.userName}
              </Text>

              <View style={styles.currentBalanceContainer}>
                <View style={{ justifyContent: "flex-start" }}>
                  <Text
                    allowFontScaling={false}
                    style={styles.currentBalanceText}
                  >
                    {I18n.t("Home.currentBalance")}
                  </Text>
                </View>

                {this.renderBalance()}
              </View>

              <View style={styles.loyaltyPointContainer}>
                <View style={{ justifyContent: "flex-start" }}>
                  <Text
                    allowFontScaling={false}
                    style={styles.loyaltyPointText}
                  >
                    {I18n.t("Home.loyaltyPoint")}
                  </Text>
                </View>
                {this.renderLoyaltyPoint()}
              </View>

              <View style={styles.rechargeAndRefreshButtons}>
                <TouchableOpacity
                  onPress={() =>
                    this.preventDoubleTap(this, () => this.goToAnotherScreen(6))
                  }
                  style={styles.customeClubButton}
                >
                  <Text
                    allowFontScaling={false}
                    style={styles.rechargeButtonText}
                  >
                    {I18n.t("Home.customerClubButtonText")}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    this.preventDoubleTap(this, () => this.goToAnotherScreen(7))
                  }
                  style={styles.rechargeButton}
                >
                  <Text
                    allowFontScaling={false}
                    style={styles.rechargeButtonText}
                  >
                    {I18n.t("Home.rechargeButtonText")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>

          <Content padder>{this.renderTransactions()}</Content>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

export default Transactions;
