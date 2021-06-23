import P from "prop-types";
import "./styles.css";

export const Button = ({ text, onClick, disabled = false }) => (
  <button className="button" onClick={onClick} disabled={disabled}>
    {text}
  </button>
);

//Adicionando os "tipos" das props, para isso, é preciso
//instalar o prop-types, o npm abaixo
//npm i prop-types
//E escrever isso:
Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  text: P.string.isRequired,
  onClick: P.func.isRequired,
  disabled: P.bool,
};
