import P from "prop-types";
import "./styles.css";

export const PostCard = ({ id, title, cover, body }) => (
  <div className="post">
    <img src={cover} alt={title} />

    <div className="post-content">
      <h2>
        {id} - {title}
      </h2>
      <p>{body}</p>
    </div>
  </div>
);

//Adicionando os "tipos" das props, para isso, é preciso
//instalar o prop-types, o npm abaixo
//npm i prop-types
//E escrever isso:

PostCard.propTypes = {
  title: P.string.isRequired,
  cover: P.string.isRequired,
  body: P.string.isRequired,
  id: P.number.isRequired,
};
