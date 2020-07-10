import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';

import Routes from './src/routes';
import { YellowBox } from 'react-native';

export default function App() {
  YellowBox.ignoreWarnings([
    'Invalid prop `color` supplied'
  ])

  return (
    <Routes />
  );
}
 