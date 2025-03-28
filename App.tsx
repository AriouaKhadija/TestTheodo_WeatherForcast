/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import WeatherView from './src/screens/WeatherView';
import {store} from './src/store/store';
import {Provider} from 'react-redux';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <WeatherView />
    </Provider>
  );
}

export default App;
