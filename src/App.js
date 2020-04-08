import React, { Component } from 'react';
import logo from './logo.svg';
import { Navbar, NavbarBrand } from 'reactstrap';
import './App.css';
import { BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import Main from './components/MainComponent';
import { domainToASCII } from 'url';

const store = ConfigureStore();

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Provider store = {store}>
          <div className="App">
            <Main />
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;

