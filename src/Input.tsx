import './App.css';

type Props = {
  classss: string;
  nameInput: string,
  onClick?: (...args: any[]) => void;
  typeInput: string;
  placeholderInput: string;
  refInput?: React.RefObject<HTMLInputElement>;
};

export function Input({
  nameInput,
  classss,
  onClick,
  typeInput,
  placeholderInput,
  refInput,
}: Props): JSX.Element {
  return (
    <input
    name={nameInput}
      type={typeInput}
      className={classss}
      onKeyDown={onClick}
      ref={refInput}
      placeholder={placeholderInput}
    />
  );
}
