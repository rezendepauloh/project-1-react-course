import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from ".";

describe("<Button />", () => {
  it('should render the button with the text "Load more"', () => {
    const fn = jest.fn();

    render(<Button text="Load more" disabled={false} onClick={fn} />);

    //Espero que aja apenas uma "asserção"
    expect.assertions(1);

    //Screen getByRole revela se existe memso um "button"
    const button = screen.getByRole("button", { name: /load more/i });

    //Espero que esse botão esteja no documento...
    expect(button).toBeInTheDocument();

    //Espero que o botão tenha a classe "button"
    //Aqui vai dar erro pois ele espera apenas "uma" asserção
    //expect(button).toHaveAttribute('class', 'button');
  });

  it('should the button have a class with the text "button"', () => {
    const fn = jest.fn();

    render(<Button text="Load more" disabled={false} onClick={fn} />);

    //Espero que aja apenas uma "asserção"
    expect.assertions(1);

    //Screen getByRole revela se existe memso um "button"
    const button = screen.getByRole("button", { class: /button/i });

    //Espero que o botão tenha a classe "button"
    expect(button).toHaveAttribute("class", "button");
  });

  it("should call function on button click", () => {
    //Cria uma função com o jest, só para efetuar o teste
    const fn = jest.fn();

    render(<Button text="Load more" disabled={false} onClick={fn} />);

    const button = screen.getByRole("button", { name: /Load more/i });

    //Isso "simula" um click no botão
    //fireEvent.click(button);

    //Essa "simula" um click de forma mais "real"
    userEvent.click(button);

    //A função foi chamada?
    expect(fn).toHaveBeenCalled();

    //A função foi chamada apenas uma vez?
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when disabled is true", () => {
    const fn = jest.fn();

    render(<Button text="Load more" disabled={true} onClick={fn} />);

    const button = screen.getByRole("button", { name: /Load more/i });

    //O botão está desativado?
    expect(button).toBeDisabled();

    //O botão não está desativado?
    //expect(button).not.toBeDisabled();

    //O botão está ativado?
    //expect(button).toBeEnabled();
  });

  it("should be enabled when disabled is false", () => {
    const fn = jest.fn();

    render(<Button text="Load more" disabled={false} onClick={fn} />);

    const button = screen.getByRole("button", { name: /Load more/i });

    //O botão está ativado?
    expect(button).toBeEnabled();
  });

  it("should match snapshot", () => {
    const fn = jest.fn();

    const { container } = render(
      <Button text="Load more" disabled={false} onClick={fn} />
    );

    screen.debug(container.firstChild);

    expect(container.firstChild).toMatchSnapshot();
  });
});
