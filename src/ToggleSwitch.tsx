import { styled } from "styled-components";

const Container = styled.div`
  height: 20px;
  width: 60px;
  margin-bottom: 2%;
  margin-left: 5%;
`;

const Label = styled.label`
  position: relative;
  display: inline-block;
  height: 20px;
  width: 50px;
`;

const Span = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: grey;
  border-radius: 32px;
  transition: 0.5s all;

  &::before {
    position: absolute;
    content: "";
    height: 15px;
    width: 15px;
    left: 4px;
    bottom: 3px;
    border-radius: 50%;
    background-color: white;
    transition: 0.5s all;
  }
`;

const Input = styled.input`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;

  &:checked + ${Span} {
    background-color: green;

    &:before {
      transform: translate(27px);
    }
  }
`;

interface Props {
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

function ToggleSwitch({ setTheme }: Props) {
  return (
    <Container>
      <Label>
        <Input
          type="checkbox"
          onChange={(e) =>
            e.target.checked ? setTheme("dark") : setTheme("light")
          }
        />
        <Span />
      </Label>
    </Container>
  );
}

export default ToggleSwitch;
