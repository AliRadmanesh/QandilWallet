package com.iraqpayment;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.RNTextInputMask.RNTextInputMaskPackage;
import com.rnfingerprint.FingerprintAuthPackage;
import com.henninghall.date_picker.DatePickerPackage;

import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import org.reactnative.camera.RNCameraPackage;
import com.centaurwarchief.smslistener.SmsListenerPackage;
import com.microsoft.codepush.react.CodePush;
import io.invertase.firebase.RNFirebasePackage;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import cl.json.RNSharePackage;
import com.github.wumke.RNImmediatePhoneCall.RNImmediatePhoneCallPackage;
import com.imagepicker.ImagePickerPackage;
// RTL layout configuration module
import com.facebook.react.modules.i18nmanager.I18nUtil;

// optional packages - add/remove as appropriate
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;

import cl.json.ShareApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ShareApplication, ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
        }
    
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNTextInputMaskPackage(),
            new FingerprintAuthPackage(),
            new DatePickerPackage(),
            new ReactNativeRestartPackage(),
            new RNI18nPackage(),
            new RNCameraPackage(),
            new SmsListenerPackage(),
            new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), getApplicationContext(), BuildConfig.DEBUG),
            new RNFirebasePackage(),
            new RNViewShotPackage(),
            new VectorIconsPackage(),
            new RNSharePackage(),
            new RNImmediatePhoneCallPackage(),
            new ImagePickerPackage(),
      			// add/remove these packages as appropriate
      			new RNFirebaseNotificationsPackage(),
      			new RNFirebaseMessagingPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
	
	// FORCE TO MANUAL LAYOUT CHANGING ON LANGUAGE CHANGE
    I18nUtil sharedI18nUtilInstance = I18nUtil.getInstance();
    sharedI18nUtilInstance.allowRTL(getApplicationContext(), false);
  }
  
  @Override
  public String getFileProviderAuthority() {
    return "com.iraqpayment.provider";
  }
  
}
