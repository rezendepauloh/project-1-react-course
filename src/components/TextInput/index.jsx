import P from "prop-types";
import "./styles.css";

export const TextInput = ({ searchValue, handleChange }) => {
  return (
    <input
      className="text-input"
      onChange={handleChange}
      value={searchValue}
      type="search"
      placeholder="Digite aqui sua busca"
    />
  );
};

//Adicionando os "tipos" das props, para isso, é preciso
//instalar o prop-types, o npm abaixo
//npm i prop-types
//E escrever isso:
TextInput.propTypes = {
  searchValue: P.string.isRequired,
  handleChange: P.func.isRequired,
};
