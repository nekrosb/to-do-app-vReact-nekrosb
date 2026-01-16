import './App.css';

type Props = {
  title: string;
  classss: string;
  type: 'button' | 'submit' | 'reset';
  onClick: (...args: any[]) => void;
};

export function Button({ title, classss, type, onClick }: Props): JSX.Element {
  return (
    <button type={type} className={classss} onClick={onClick}>
      {title}
    </button>
  );
}
