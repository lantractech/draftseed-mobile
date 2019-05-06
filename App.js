import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon, AdMobBanner } from 'expo';

import { applyMiddleware, createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
// import logger from 'redux-logger'

// Here to import root component, reducer, saga
import AppNavigator from 'navigation/AppNavigator';
import rootReducer from 'reducers/index';
import rootSaga from 'sagas/index';

// confiure store
const sagaMiddleware = createSagaMiddleware();

// View for good sample of navigation: https://github.com/michchan/expo-redux-saga-boilerplate
// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
// const navigationMiddleware = createReactNavigationReduxMiddleware(
//   "root",
//   state => state.nav,
// );
// export const addListener = createReduxBoundAddListener("root");

const middleware = [
  // navigationMiddleware,
  sagaMiddleware,
  // logger,
];

const store = createStore(rootReducer, {}, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);


export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }

  bannerError(){
    //currently does nothing
  }

  displayAdmobBanner() {
    const hideBanner = false //for future implementation of user settings
    return hideBanner ? null : <AdMobBanner
      bannerSize="smartBannerPortrait"
      adUnitID="ca-app-pub-9405365311679620/1490126862"
      // testDeviceID="EMULATOR"
      onDidFailToReceiveAdWithError={(e) => console.log(e)} />
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
            {this.displayAdmobBanner()}
          </View>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
