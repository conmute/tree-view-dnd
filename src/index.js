/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles.styl';

import TreeView from './components/TreeView';

import { getData } from './data';

const App = () => (
  <div className="app-wrap">
    <TreeView data={getData(50)} />
  </div>
);

// eslint-disable-next-line no-undef
ReactDOM.render(<App />, document.getElementById('app'));
