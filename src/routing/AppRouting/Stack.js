import { createStackNavigator } from "react-navigation";

import Drawer from "./Drawer";

import SIMCharge1 from "../../screens/SIMCharge1";
import SIMCharge2 from "../../screens/SIMCharge2";
import SIMChargeReceipt from "../../screens/SIMChargeReceipt";

import TransferMoney1 from "../../screens/TransferMoney1";
import TransferMoney2 from "../../screens/TransferMoney2";
import TransferMoneyScanQR1 from "../../screens/TransferMoneyScanQR1";
import TransferMoneyScanQR2 from "../../screens/TransferMoneyScanQR2";
import TransferMoneyReceipt from "../../screens/TransferMoneyReceipt";

import Shopping from "../../screens/Shopping";
import Internet from "../../screens/Internet";
import PayBills from "../../screens/PayBills";
import Recharge from "../../screens/Recharge";
import Charity from "../../screens/Charity";
import Flight from "../../screens/Flight";

const AppStack = createStackNavigator(
  {
    Drawer: { screen: Drawer },

    SIMCharge1: { screen: SIMCharge1 },
    SIMCharge2: { screen: SIMCharge2 },
    SIMChargeReceipt: { screen: SIMChargeReceipt },

    TransferMoney1: { screen: TransferMoney1 },
    TransferMoney2: { screen: TransferMoney2 },
    TransferMoneyScanQR1: { screen: TransferMoneyScanQR1 },
    TransferMoneyScanQR2: { screen: TransferMoneyScanQR2 },
    TransferMoneyReceipt: { screen: TransferMoneyReceipt },

    Shopping: { screen: Shopping },
    Recharge: { screen: Recharge },
    Internet: { screen: Internet },
    PayBills: { screen: PayBills },
    Charity: { screen: Charity },
    Flight: { screen: Flight }
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

export default AppStack;
