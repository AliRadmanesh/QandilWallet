import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput
} from "react-native";
import {
  Container,
  Content,
  Text,
  Button,
  Spinner,
  CheckBox,
  Picker
} from "native-base";
import { NavigationActions } from "react-navigation";

import I18n from "../../../utils/i18n";
import styles from "./styles";
import colors from "../../../utils/colors";

const MAHAK_LOGO = "../../../../assets/Icons/App/Charity/mahak.png";
const BEHZISTI_LOGO = "../../../../assets/Icons/App/Charity/behzisti.png";
const KAHRIZAK_LOGO = "../../../../assets/Icons/App/Charity/kahrizak.png";
const KOMITE_LOGO = "../../../../assets/Icons/App/Charity/komite.png";
const BEHNAM_LOGO = "../../../../assets/Icons/App/Charity/behnam.png";
const EB_LOGO = "../../../../assets/Icons/App/Charity/eb.png";

class CharityTasks extends Component {
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
      isModalErrorOpen: false,
      waterMeterInput: "",
      waterMeterInputError: false,
      mobilePhoneInput: "",
      mobilePhoneInputError: false,
      electricityInput: "",
      electricityInputError: false,
      selected: "key0",
      amountInput: "",
      timeInput: "",
      isCheckBoxEnabled: false
    };
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

  checkInputs = index => {};

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
            {this.numberWithCommas(this.state.currentBalance)}
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
  };

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  renderBasedOnBillType = () => {
    return (
      <View style={styles.chargeMethodsCard}>
        <Text allowFontScaling={false} style={styles.mainText}>
          {I18n.t("Charity.charityPayText")}
        </Text>
        {/* 
        <Text style={styles.amountTopTextInput} allowFontScaling={false}>
          {I18n.t("Charity.amountTopTextInput")}
        </Text>
        */}
        <TextInput
          placeholder={I18n.t("Charity.amountPlaceholder")}
          value={this.state.amountInput}
          onChangeText={amountInput => this.setState({ amountInput })}
          allowFontScaling={false}
          underlineColorAndroid="transparent"
          keyboardType="numeric"
          style={styles.electricityInput}
          maxLength={20}
        />
        <View style={styles.fieldBorder} />

        <TouchableOpacity
          style={styles.checkBoxContainer}
          onPress={() =>
            this.setState({
              isCheckBoxEnabled: !this.state.isCheckBoxEnabled
            })
          }
        >
          <CheckBox
            style={styles.checkBox}
            color={colors.GREEN_BUTTONS}
            checked={this.state.isCheckBoxEnabled}
            onPress={() =>
              this.setState({
                isCheckBoxEnabled: !this.state.isCheckBoxEnabled
              })
            }
          />
          <Text style={styles.checkBoxText}>پرداخت دوره ای</Text>
        </TouchableOpacity>

        <Picker
          iosHeader={I18n.t("Comments.typeOfMessage.iosHeader")}
          mode="dropdown"
          selectedValue={this.state.selected}
          onValueChange={this.onValueChange.bind(this)}
          style={styles.picker}
          enabled={this.state.isCheckBoxEnabled}
        >
          <Picker.Item
            label={I18n.t("Charity.typeOfMessage.item0")}
            value="key0"
          />
          <Picker.Item
            label={I18n.t("Charity.typeOfMessage.item1")}
            value="key1"
          />
          <Picker.Item
            label={I18n.t("Charity.typeOfMessage.item2")}
            value="key2"
          />
          <Picker.Item
            label={I18n.t("Charity.typeOfMessage.item3")}
            value="key3"
          />
        </Picker>
        <View style={styles.inputBorder} />

        <TextInput
          placeholder={I18n.t("Charity.timePlaceholder")}
          value={this.state.timeInput}
          onChangeText={timeInput => this.setState({ timeInput })}
          allowFontScaling={false}
          underlineColorAndroid="transparent"
          style={styles.timeInput}
          maxLength={20}
          editable={this.state.isCheckBoxEnabled}
        />
        <View style={styles.fieldBorder} />

        <TouchableOpacity
          style={styles.checkBoxContainer2}
          disabled={!this.state.isCheckBoxEnabled}
          onPress={() =>
            this.setState({
              isSecondCheckBoxEnabled: !this.state.isSecondCheckBoxEnabled
            })
          }
        >
          <CheckBox
            style={styles.checkBox2}
            color={colors.GREEN_BUTTONS}
            checked={this.state.isSecondCheckBoxEnabled}
            disabled={!this.state.isCheckBoxEnabled}
            onPress={() =>
              this.setState({
                isSecondCheckBoxEnabled: !this.state.isSecondCheckBoxEnabled
              })
            }
          />
          <Text style={styles.checkBoxText2}>
            مبلغ به طور خودکار از کارت اعتباری ام کسر شود.
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  showErrorInput = error => {
    const {
      electricityMeterInputError,
      mobilePhoneInputError,
      waterMeterInputError
    } = this.state;

    switch (error) {
      case electricityMeterInputError: {
        // Electricity Input Error
        break;
      }
      case mobilePhoneInputError: {
        // Mobile Phone Input Error
        break;
      }
      case waterMeterInputError: {
        // Water Input Error
        break;
      }
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content padder>
          <View style={styles.chargeMethodsCard}>
            <Text allowFontScaling={false} style={styles.mainText}>
              {I18n.t("Charity.mainTextTasks")}
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
                    source={require(MAHAK_LOGO)}
                    style={styles.electricityImage}
                    resizeMode="contain"
                  />
                  <Text allowFontScaling={false} style={styles.electricityText}>
                    {I18n.t("Charity.mahakText")}
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
                    source={require(BEHZISTI_LOGO)}
                    style={styles.mobilePhoneImage}
                    resizeMode="contain"
                  />
                  <Text allowFontScaling={false} style={styles.mobilePhoneText}>
                    {I18n.t("Charity.behzistiText")}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={[
                  this.state.selectedCategory === 3
                    ? styles.chargeMethodsButtonsSelected
                    : styles.chargeMethodsButtons,
                  {
                    marginRight: 0
                  }
                ]}
              >
                <TouchableOpacity
                  onPress={() => this.onSelectCategory(3)}
                  style={styles.waterContainer}
                >
                  <Image
                    source={require(KAHRIZAK_LOGO)}
                    style={styles.waterImage}
                    resizeMode="contain"
                  />
                  <Text allowFontScaling={false} style={styles.waterText}>
                    {I18n.t("Charity.kahrizakText")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.chargeMethodsContainer}>
              <View
                style={
                  this.state.selectedCategory === 4
                    ? styles.chargeMethodsButtonsSelected
                    : styles.chargeMethodsButtons
                }
              >
                <TouchableOpacity
                  onPress={() => this.onSelectCategory(4)}
                  style={styles.electricityContainer}
                >
                  <Image
                    source={require(KOMITE_LOGO)}
                    style={styles.electricityImage}
                    resizeMode="contain"
                  />
                  <Text allowFontScaling={false} style={styles.electricityText}>
                    {I18n.t("Charity.komiteText")}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={
                  this.state.selectedCategory === 5
                    ? styles.chargeMethodsButtonsSelected
                    : styles.chargeMethodsButtons
                }
              >
                <TouchableOpacity
                  onPress={() => this.onSelectCategory(5)}
                  style={styles.electricityContainer}
                >
                  <Image
                    source={require(BEHNAM_LOGO)}
                    style={styles.electricityImage}
                    resizeMode="contain"
                  />
                  <Text allowFontScaling={false} style={styles.electricityText}>
                    {I18n.t("Charity.behnamText")}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={[
                  this.state.selectedCategory === 6
                    ? styles.chargeMethodsButtonsSelected
                    : styles.chargeMethodsButtons,
                  {
                    marginRight: 0
                  }
                ]}
              >
                <TouchableOpacity
                  onPress={() => this.onSelectCategory(6)}
                  style={styles.electricityContainer}
                >
                  <Image
                    source={require(EB_LOGO)}
                    style={styles.electricityImage}
                    resizeMode="contain"
                  />
                  <Text allowFontScaling={false} style={styles.electricityText}>
                    {I18n.t("Charity.EBText")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {this.renderBasedOnBillType()}
          {this.renderFooterButton()}
        </Content>
      </Container>
    );
  }
}

export default CharityTasks;
