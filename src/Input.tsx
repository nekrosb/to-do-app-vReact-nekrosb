import './App.css';

type Props = {
  classss: string;
  onClick: (...args: any[]) => void;
  typeInput: string;
  plaseholderInput: string;
  refInput?: React.RefObject<HTMLInputElement>;
};

export function Input({
  classss,
  onClick,
  typeInput,
  plaseholderInput,
  refInput,
}: Props): JSX.Element {
  return (
    <input
      type={typeInput}
      className={classss}
      onKeyDown={onClick}
      ref={refInput}
      placeholder={plaseholderInput}
    />
  );
}
