import { AsyncStorage } from "react-native";

const loginFlag = "@LOGIN_FLAG";
const userToken = "userToken";
const firstTimeFlag = "@FIST_TIME_FLAG";
const language = "@LANG";

export const onSignedIn = () => AsyncStorage.setItem(loginFlag, "true");

export const onSignedOut = () => AsyncStorage.removeItem(loginFlag);

export const onDoneIntroduction = () =>
  AsyncStorage.setItem(firstTimeFlag, "false");

// export const onSelectingLanguage = () =>
//   AsyncStorage.setItem(languageFlag, "false");

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(loginFlag)
      .then(result => {
        if (result !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};

export const isTokenAssigned = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(userToken)
      .then(result => {
        if (result !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};

export const isFirstTime = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(firstTimeFlag)
      .then(result => {
        if (result !== null) {
          resolve(false);
        } else {
          resolve(true);
        }
      })
      .catch(err => reject(err));
  });
};

export const onLanguageSelected = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(language)
      .then(result => {
        resolve(result);
      })
      .catch(err => reject(err));
  });
};
