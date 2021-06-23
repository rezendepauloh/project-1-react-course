import P from "prop-types";
import { PostCard } from "../PostCard";
import "./styles.css";

export const Posts = ({ posts = [] }) => (
  <div className="posts">
    {posts.map((post) => (
      <PostCard
        key={post.id}
        id={post.id}
        title={post.title}
        cover={post.cover}
        body={post.body}
      />
    ))}
  </div>
);

//Adicionando os "tipos" das props, para isso, é preciso
//instalar o prop-types, o npm abaixo
//npm i prop-types
//E escrever isso:

Posts.defaultProps = {
  posts: [],
};

Posts.propTypes = {
  posts: P.arrayOf(
    P.shape({
      title: P.string.isRequired,
      cover: P.string.isRequired,
      body: P.string.isRequired,
      id: P.number.isRequired,
    })
  ),
};
