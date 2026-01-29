import type {filterState} from './types';
import { Button } from './Buttons';

type props = {
    click: (filterName: string) => void;
    filter: filterState
    onClose: () => void;
}

export function FilterMenu({click, filter, onClose}: props): JSX.Element {
    return (
        <div className="create-menu-buttons">
                      <Button
            type="button"
            classss="btn btn-open"
            onClick={() => click("date")}
            title={filter.date ? "filter by date ✅": "filter by date ❌"}
          />

                      <Button
            type="button"
            classss="btn btn-open"
            onClick={() => click("name")}
            title={filter.name ? "filter by name [A-z] ✅": "filter by name [A-Z] ❌"}
          />

                      <Button
            type="button"
            classss="btn btn-open"
            onClick={() => click("done")}
            title={filter.done ? "filter by done ✅": "filter by done ❌"}
          />

                      <Button
            type="button"
            classss="btn btn-open"
            onClick={() => click("unDone")}
            title={filter.unDone ? "filter by unDone ✅": "filter by unDone ❌"}
          />

          <Button
            type="button"
            classss="btn btn-delete-all"
            onClick={onClose ?? (() => {})}
            title="go back"
          />



        </div>
    )
}