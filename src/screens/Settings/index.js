import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  NetInfo,
  FlatList,
  AsyncStorage,
  Switch
} from "react-native";
import { Container, Content, Button } from "native-base";
import firebase, { Notification } from "react-native-firebase";
import Share from "react-native-share";
import _ from "lodash";

import LogOutModal from "./LogOutModal";
import { onSignedOut } from "../../boot/initialConfigs";
import I18n from "../../utils/i18n";

import styles from "./styles";
import CustomIcon from "../../utils/customIcons";
import colors from "../../utils/colors";

const HeaderImagePath = "../../../assets/Icons/App/Transactions/header.png";

export class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 0,
          title: I18n.t("Settings.notification"),
          icon: "alarm",
          switch: true
        },
        {
          id: 1,
          title: I18n.t("Settings.changeLanguage"),
          icon: "language"
        },
        {
          id: 2,
          title: I18n.t("Settings.aboutUs"),
          icon: "question-mark"
        },
        {
          id: 3,
          title: I18n.t("Settings.privacy"),
          icon: "lock"
        },
        {
          id: 4,
          title: I18n.t("Settings.rules"),
          icon: "balance"
        },
        {
          id: 5,
          title: I18n.t("Settings.withdraw"),
          icon: "withdraw"
        },
        {
          id: 6,
          title: I18n.t("Settings.inviteFriends"),
          icon: "share"
        },
        {
          id: 7,
          title: I18n.t("Settings.logOut"),
          icon: "exit"
        }
      ],
      userToken: "",
      userName: "",
      userCardNum: "",
      userPhoneNum: "",
      visible: false,
      isLogoutModalVisible: false
    };
  }

  componentDidMount() {
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
  };

  // START: Share functions //
  onCancel() {
    console.log("CANCEL");
    this.setState({ visible: false });
  }

  onOpen() {
    console.log("OPEN");
    this.setState({ visible: true });
  }

  shareReceipt() {
    const shareOptions = {
      title: I18n.t("Settings.shareSubject"),
      message: I18n.t("Settings.inviteShareText")
    };

    Share.open(shareOptions);
  }
  // END: Share functions //

  closeModal = () => {
    this.setState({ isLogoutModalVisible: false });
  };

  logOut = async () => {
    const { navigation } = this.props;
    const keys = ["userToken", "userName", "userCardNum", "userPhoneNum"];
    await AsyncStorage.multiRemove(keys);
    onSignedOut().then(() => navigation.navigate("AuthFlow"));
  };

  onPressItem = index => {
    const { navigate } = this.props.navigation;
    const { data, userToken, userName, userCardNum, userPhoneNum } = this.state;

    switch (index) {
      case 0: {
        // Notification
        this.setSwitchValue(!data[0].switch, 0);
        break;
      }
      case 1: {
        // Choose Language
        navigate("ChangeLanguage");
        break;
      }
      case 2: {
        // About us
        navigate("AboutUs");
        break;
      }
      case 3: {
        // Privacy
        navigate("Privacy");
        break;
      }
      case 4: {
        // Rules
        navigate("Rules");
        break;
      }
      case 5: {
        // Withdraw
        navigate("Withdraw", {
          userToken,
          userName,
          userCardNum,
          userPhoneNum
        });
        break;
      }
      case 6: {
        // Invite Friends
        // Open share popup and send a text + link to IraqPayment.com
        this.shareReceipt();
        break;
      }
      case 7: {
        // Log out
        // Open popup to make sure of logging out
        // Clear persisted data
        // Go back to Login Stack
        this.setState({ isLogoutModalVisible: true });

        break;
      }
    }
  };

  setSwitchValue = (value, index) => {
    const tempData = _.cloneDeep(this.state.data);
    tempData[index].switch = value;
    this.setState({ data: tempData });
    this.persistNotoficationStatus(value);
  };

  persistNotoficationStatus = async value => {
    await AsyncStorage.setItem("@isNotifEnabled", value.toString()).then(() =>
      console.log("done!", value)
    );
  };

  separator = () => {
    return <View style={styles.separator} />;
  };

  renderItem = (item, index) => {
    return (
      <TouchableOpacity onPress={() => this.onPressItem(item.id)}>
        <View style={styles.row}>
          <CustomIcon
            name={item.icon}
            size={item.icon === "language" ? 16 : 22}
            color={colors.BLACK}
            style={styles.rowIcon}
          />
          <Text allowFontScaling={false} style={styles.rowText}>
            {item.title}
          </Text>
          {item.title === "Notification" ? (
            <View style={styles.switchContainer}>
              <Switch
                onValueChange={value => this.setSwitchValue(value, index)}
                value={item.switch}
              />
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <Container style={styles.container}>
        <LogOutModal
          isVisible={this.state.isLogoutModalVisible}
          onPressNO={this.closeModal}
          onPressYES={this.logOut}
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
              <CustomIcon name="cross" size={26} color={colors.WHITE} />
            </TouchableOpacity>

            <Text allowFontScaling={false} style={styles.titleText}>
              {I18n.t("Settings.title")}
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
          {/* <Form>
            <Picker
              iosHeader={I18n.t("Settings.languagePicker.iosHeader")}
              mode="dropdown"
              selectedValue={this.selectedLang}
              onValueChange={this.onValueChange.bind(this)}
              style={styles.picker}
            >
              <Picker.Item
                label={I18n.t("Settings.languagePicker.item0")}
                value="en"
              />
              <Picker.Item
                label={I18n.t("Settings.languagePicker.item1")}
                value="ar"
              />
              <Picker.Item
                label={I18n.t("Settings.languagePicker.item2")}
                value="ku"
              />
            </Picker>
          </Form> */}

          <FlatList
            data={this.state.data}
            renderItem={({ item, index }) => this.renderItem(item, index)}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={this.separator}
          />
        </Content>
      </Container>
    );
  }
}

export default Settings;
