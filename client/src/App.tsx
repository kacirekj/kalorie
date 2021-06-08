import * as React from 'react';
import './App.css';
import DayDairy from "./component/DayDairy";

class App extends React.Component<{}, any> {
  render() {
    return (
      <div className="App">
        <header>
          <h1>Kaloricke tabulky</h1>
        </header>
        <DayDairy/>
      </div>
    );
  }
}

export default App;