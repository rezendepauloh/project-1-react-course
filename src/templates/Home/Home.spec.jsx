import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Home } from ".";
import userEvent from "@testing-library/user-event";

//Vamos usar o Mock Service Worker (msw) para
//simular um server e para pegar as requisições
//rest. Simulamos isso para que nosso teste
//Não fique muito pesado
const handlers = [
  rest.get("*//jsonplaceholder.typicode.com/*", async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: "title1",
          body: "body1",
          url: "ima1.jpg",
        },
        {
          userId: 2,
          id: 2,
          title: "title2",
          body: "body2",
          url: "ima2.jpg",
        },
        {
          userId: 3,
          id: 3,
          title: "title3",
          body: "body3",
          url: "ima3.jpg",
        },
      ])
    );
  }),
];

const server = setupServer(...handlers);

describe("<Home />", () => {
  //Antes de todos os testes...
  beforeAll(() => {
    server.listen();
  });

  //Depois de cada teste...
  afterEach(() => server.resetHandlers());

  //Depois de todos os testes...
  afterAll(() => {
    server.close();
  });

  it("should render search posts and load more", async () => {
    render(<Home />);
    const noMorePosts = screen.getByText("Não existem posts");

    expect.assertions(3);

    //Como a função é assincrona, ela renderiza o
    //componente para depois executar a função useEffect e os
    //callbacks, enquanto isso, aparece o "Não existem posts"
    //Esse teste verifica se ele "some" depois que é
    //carregado
    await waitForElementToBeRemoved(noMorePosts);
    screen.debug();

    //Botão de busca
    const search = screen.getByPlaceholderText(/Digite aqui sua busca/i);

    expect(search).toBeInTheDocument();

    //Imagens
    const images = screen.getAllByRole("img", { name: /title/i });

    expect(images).toHaveLength(3);

    //Button
    const button = screen.getByRole("button", { name: /Load more posts/i });

    expect(button).toBeInTheDocument();
  });

  it("should search for posts", async () => {
    render(<Home />);
    const noMorePosts = screen.getByText("Não existem posts");

    expect.assertions(16);

    await waitForElementToBeRemoved(noMorePosts);
    //screen.debug();

    //Botão de busca
    const search = screen.getByPlaceholderText(/Digite aqui sua busca/i);

    //Esses estão na tela?
    expect(
      screen.getByRole("heading", { name: "1 - title1" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "2 - title2" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "3 - title3" })
    ).toBeInTheDocument();

    //Esse não está na tela?
    expect(
      screen.queryByRole("heading", { name: "4 - title4" })
    ).not.toBeInTheDocument();

    //Digitar no botão o título do 1
    userEvent.type(search, "title1");

    //Consultar de novo os expects
    expect(
      screen.getByRole("heading", { name: "1 - title1" })
    ).toBeInTheDocument();

    //Esses não estão na tela?
    expect(
      screen.queryByRole("heading", { name: "2 - title2" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "3 - title3" })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("heading", { name: "4 - title4" })
    ).not.toBeInTheDocument();

    //Verifica se o H3 aparece na tela depois de digitar no input
    expect(
      screen.getByRole("heading", { name: "Search value: title1" })
    ).toBeInTheDocument();

    //Limpar a busca
    userEvent.clear(search);

    //Esses estão na tela?
    expect(
      screen.getByRole("heading", { name: "1 - title1" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "2 - title2" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "3 - title3" })
    ).toBeInTheDocument();

    //Digitar no botão algo que não exista
    userEvent.type(search, "isso nao existe");

    //Esses estão na tela?
    expect(
      screen.queryByRole("heading", { name: "1 - title1" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "2 - title2" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "3 - title3" })
    ).not.toBeInTheDocument();

    expect(screen.getByText("Não existem posts")).toBeInTheDocument();
  });
});
