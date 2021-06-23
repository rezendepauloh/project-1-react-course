//Maneiras de fazer:

//3. Método enxuto: Sem as chaves e com desestruturação
export const PostCard = ({ id, title, cover, body }) => (
  <div className="post">
    <img src={cover} alt={title} />

    <div className="post-content">
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  </div>
);

//1. export com desestruturação direto no parâmetro do método
// export const PostCard = ({ id, title, cover, body }) => {

//   return (
//     <div className="post">

//       <img src={cover} alt={title} />

//       <div key={id} className="post-content">

//         <h1>{title}</h1>
//         <p>{body}</p>

//       </div>
//     </div>
//   );

// }

//2. Props sendo passado nas variáveis
// export const PostCard = (props) => {
//   return (
//     <div className="post">

//       <img src={props.cover} alt={props.title} />

//       <div key={props.id} className="post-content">

//         <h1>{props.title}</h1>
//         <p>{props.body}</p>

//       </div>
//     </div>
//   );

// }
