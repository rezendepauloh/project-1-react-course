import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Home } from ".";

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
});
