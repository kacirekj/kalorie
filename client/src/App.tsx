import * as React from 'react';
import './App.css';
import Menu from "./component/Menu";

class App extends React.Component<{}, any> {
  render() {
    return (
      <div className="App">
        <br/>
        <br/>
        <br/>

        <Menu/>
      </div>
    );
  }
}

export default App;