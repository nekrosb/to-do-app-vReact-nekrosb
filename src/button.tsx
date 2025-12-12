import './App.css';

type Props = {
  title: string;
  classss: string;
  onClick: (...args: any[]) => void;
};

export function Button({ title, classss, onClick }: Props): JSX.Element {
  return (
    <button type="button" className={classss} onClick={onClick}>
      {title}
    </button>
  );
}
