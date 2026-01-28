import './loader.css';

export function LoaderScrin(): JSX.Element {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>loading...</p>
    </div>
  );
}
