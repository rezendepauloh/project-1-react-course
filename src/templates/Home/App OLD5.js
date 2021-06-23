import './App.css';
import { Component } from 'react';
import { Posts } from './components/Posts';
import { loadPosts } from './util/load-posts';

class App extends Component {

  state = {
    posts: []
  };

  //Com o import do loadPosts, passamos a função para cá e colocamos async aqui
  //componentDidMount() {
  async componentDidMount() {

    //this.loadPosts();
    const postsAndPhotos = await loadPosts();
    this.setState({ posts: postsAndPhotos });
    console.log('Componente montado');
  }

  // loadPosts = async () => {

  //   const postsAndPhotos = await loadPosts();
  //   this.setState({ posts: postsAndPhotos });

  // }

  render() {

    const { posts } = this.state;

    return (
      <section className="container">
        <Posts posts={posts} />
      </section>
    );
  }

}

export default App;