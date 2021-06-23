import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextInput } from ".";

describe("<TextInput />", () => {
  it("should have a value of searchValue", () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue={"testando"} />);

    const input = screen.getByPlaceholderText(/Digite aqui sua busca/i);

    expect(input).toBeInTheDocument();

    expect(input.value).toBe("testando");
  });

  it("should call handleChange function on each key press", () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue={"o valor"} />);

    const input = screen.getByPlaceholderText(/Digite aqui sua busca/i);

    const value = "o valor";

    userEvent.type(input, value);
    screen.debug(input);

    expect(input.value).toBe(value);
    expect(fn).toHaveBeenCalledTimes(value.length);
  });

  it("should match snapshot", () => {
    const fn = jest.fn();
    const { container } = render(
      <TextInput handleChange={fn} searchValue={"testando"} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
