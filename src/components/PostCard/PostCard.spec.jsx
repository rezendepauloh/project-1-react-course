import { render, screen } from "@testing-library/react";
import { PostCard } from ".";
import { postCardPropsMock } from "./mock";

//Um mock para facilitar a adição dos atributos
//Veja no componente o {...props}
const props = postCardPropsMock;

describe("<PostCard />", () => {
  it("should render PostCard correctly", () => {
    //O const {debug} nos ajuda a debugar a renderização do PostCard
    //const { debug } = render(<PostCard {...props} />);
    render(<PostCard {...props} />);

    //Aqui executamos o debug
    //debug();

    expect(screen.getByAltText(/title 1/i)).toHaveAttribute(
      "src",
      "img/img.png"
    );

    expect(
      screen.getByRole("heading", { name: /title 1/i })
    ).toBeInTheDocument();

    expect(screen.getByText("body 1")).toBeInTheDocument();
  });

  //Snapshot
  it("should match snapshot", () => {
    const { container } = render(<PostCard {...props} />);

    screen.debug(container.firstChild);

    //Cria o snapshot, ele serve para mostrar, em código jsx,
    //na pasta criada, como criamos nosso componente
    //Caso ele venha a mudar, por nós ou por alguém da equipe
    //o teste falhará, pois o snapshot estará diferente do que já existe
    //o console apresentará uma mensagem, dizendo que é para analisarmos
    //o código e, caso ok, pressionar "u"
    //para ele atualizar o snapshot
    expect(container.firstChild).toMatchSnapshot();
  });

  //Execute: npm test -- --coverage
  //Ese comando criará a pasta "coverage" na raiz
  //Essa pasta lista todos os testes, o que testar e o que
  //Falta para testar, bem útil. Só acessar
  //o index.html gerado nessa pasta

  //npm test -- --watchAll="false" --coverage
});
