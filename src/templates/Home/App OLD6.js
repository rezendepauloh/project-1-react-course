import './styles.css';
import { Component } from 'react';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { loadPosts } from '../../util/load-posts';
import { TextInput } from '../../components/TextInput';

export class Home extends Component {

  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: ''
  };

  async componentDidMount() {

    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();

    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    });
    console.log('Componente montado');
  }

  loadMorePosts = () => {

    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });

    console.log(page, postsPerPage, nextPage, nextPage + postsPerPage);
    console.log('Carregando mais posts');
  }

  handleChange = (e) => {

    const { value } = e.target;
    this.setState({ searchValue: value });

    console.log(`Valor eh: ${value}`);
  }

  render() {

    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ?
      allPosts.filter(post => {

        return post.title.toLowerCase().includes(
          searchValue.toLowerCase()
        );

      })
      : posts;

    return (
      <section className="container">

        <div className="search-container">

          {!!searchValue && (
            <h3>Search value: {searchValue}</h3>
          )}

          <TextInput
            searchValue={searchValue}
            handleChange={this.handleChange}
          />
        </div>

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <p>Não existem posts</p>
        )}

        <div className="button-container">

          {!searchValue && (

            <Button
              text="Load more posts"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />

          )}

        </div>
      </section>
    );
  }

}