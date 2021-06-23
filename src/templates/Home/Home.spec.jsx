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
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => {
    server.close();
  });

  it("should render search posts and load more", async () => {
    render(<Home />);
    const noMorePosts = screen.getByText("Não existem posts");

    //Como a função é assincrona, ela renderiza o
    //componente para depois executar a função useEffect e os
    //callbacks, enquanto isso, aparece o "Não existem posts"
    //Esse teste verifica se ele "some" depois que é
    //carregado
    await waitForElementToBeRemoved(noMorePosts);
    //screen.debug();
  });
});
