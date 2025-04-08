import { createReducer, on } from '@ngrx/store';
import { MenuState } from '../menu.state';
import { updateMenu } from '../action/menu.action';

export const initialState: MenuState = {
  menu: { visible: false },
};

export const menuReducer = createReducer(
  initialState,
  on(updateMenu, (state, { menu }) => (
    {
      menu
    }
  ))
);