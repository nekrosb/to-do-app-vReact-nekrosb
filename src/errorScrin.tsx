import { Button } from './Buttons';

type props = {
  errorMsg: string;
  onClose?: () => void;
};

export function ErrorScrin({ errorMsg, onClose }: props): JSX.Element {
  return (
    <div className="error-screen">
      <div className="error-box">
        <h2>
          oouuuu! you have error? it is not our problem!!!😆 Just kidding, maybe
          you have internet problems or we have server problems. Check your
          internet connection or wait until we fix it.
        </h2>

        <p>{errorMsg}</p>

        <Button
          type="button"
          classss="error-btn"
          onClick={onClose}
          title="ok"
        />
      </div>
    </div>
  );
}
