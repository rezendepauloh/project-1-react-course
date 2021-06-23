import './App.css';
import { Component } from 'react';

class App extends Component {

  //Hard code, o objeto direto na mesma página
  state = {
    counter: 0,
    posts: [
      {
        id: 1,
        title: 'Título 1',
        body: 'Corpo 01'
      },
      {
        id: 2,
        title: 'Título 2',
        body: 'Corpo 02'
      },
      {
        id: 3,
        title: 'Título 3',
        body: 'Corpo 03'
      }
    ]
  };
  timeoutUpdate = null;

  //Life Cycle methods: Quando o componente é atualizado,
  //Esse método roda
  componentDidUpdate() {

    this.handleTimeout();
    console.log('Componente atualizado');

  }

  //Life Cycle methods: O componente é montado, 
  //ele executa esse método
  componentDidMount() {

    this.handleRefreshPosts();
    this.handleTimeout();

    console.log('Componente montado');

  }

  //Life Cycle methods: Quando o componente é desmontado,
  //Ele chama esse método 
  componentWillUnmount() {
    clearTimeout(this.timeoutUpdate);
    console.log('Componente foi desmontado');
  }

  handleTimeout = () => {

    const { posts, counter } = this.state;
    posts[0].title = 'O título mudou';

    //simulação de um carregamento de dados com setTimeout
    this.timeoutUpdate = setTimeout(() => {
      this.setState({ posts, counter: counter + 1 })
    }, 1000);

  }

  handleRefreshPosts = () => {

    //simulação de um carregamento de dados com setTimeout
    // setTimeout(() => {
    //   this.setState({
    //     posts: [
    //       {
    //         id: 1,
    //         title: 'Título 1',
    //         body: 'Corpo 01'
    //       },
    //       {
    //         id: 2,
    //         title: 'Título 2',
    //         body: 'Corpo 02'
    //       },
    //       {
    //         id: 3,
    //         title: 'Título 3',
    //         body: 'Corpo 03'
    //       }
    //     ]
    //   }
    //   );
    // }, 1000);

  }

  render() {

    const { posts, counter } = this.state;

    return (
      <div className="App">

        <h1>{counter}</h1>

        {posts.map(post => (
          <div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div>
        ))}

      </div>
    );
  }

}

export default App;