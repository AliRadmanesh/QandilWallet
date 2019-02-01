import I18n from "react-native-i18n";

import en from "./en";
import fa from "./fa";

I18n.fallbacks = true;

I18n.translations = {
  en,
  fa
};

export default I18n;
