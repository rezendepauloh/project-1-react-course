import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

//Classe (Com estado, statefull)
class App extends Component {

  //Public class fields
  state = {
    name: 'Paulo Rezende',
    counter: 0
  }
  //Aqui é um construtor, mas como o public class fields
  //Não precisamos mais dele
  // constructor(props) {
  //   super(props);
  //   this.handlePClick = this.handlePClick.bind(this);

  //   this.state = {
  //     name: 'Paulo Rezende',
  //     counter: 0
  //   };
  // }

  //Esse metodo "comum" precisa ser referenciado lá no constructor
  //com um bind para pegar a sua referência
  // handlePClick() {
  //   const { name } = this.state;

  //   this.setState({ name: 'Bruno' });
  //   console.log(`<p> clicado ${name}`);
  // }

  //Como essa é uma arrow function, não precisa de um bind no
  //constructor, legal né?
  handleAClick = (event) => {
    event.preventDefault();
    const { counter } = this.state;

    this.setState({ counter: counter + 1 });

  }

  handlePClick = () => {
    const { name } = this.state;

    this.setState({ name: 'Bruno' });
    console.log(`<p> clicado ${name}`);
  }

  render() {

    //const name = this.state.name;
    const { name, counter } = this.state;

    return (
      <div className="App">
        <header className="App-header">

          <img src={logo} className="App-logo" alt="logo" />

          <p onClick={this.handlePClick}>
            {1 + 2} - {'Oi'} - {name} - {counter}
          </p>

          <a
            onClick={this.handleAClick}
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>

        </header>
      </div>
    );
  }

}

//Função - Sem estado (stateless)
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           {1 + 2} Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
