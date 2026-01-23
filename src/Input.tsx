import './App.css';

type Props = {
  classss: string;
  nameInput: string,
  typeInput: string;
  placeholderInput: string;
  refInput?: React.RefObject<HTMLInputElement>;
};

export function Input({
  nameInput,
  classss,
  typeInput,
  placeholderInput,
  refInput,
}: Props): JSX.Element {
  return (
    <input
    name={nameInput}
      type={typeInput}
      className={classss}
      ref={refInput}
      placeholder={placeholderInput}
    />
  );
}
