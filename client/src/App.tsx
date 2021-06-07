import * as React from 'react';
import './App.css';
import BeerList from './BeerList';

class App extends React.Component<{}, any> {
  render() {
    return (
      <div className="App">
        <header>
          <h1>Kaloricke tabulky</h1>
        </header>
        <BeerList/>
      </div>
    );
  }
}

export default App;