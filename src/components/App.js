require('../styles/App.css');
require('../styles/Login.css');

import React from 'react';
import ChatApp from './ChatApp';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: 'Admin' };
  }





  render() {

      // Form was submitted, now show the main App
      return (
        <ChatApp username={'Admin'} />
      );

  }

}
App.defaultProps = {
};

export default App;
