import { createAction, props } from '@ngrx/store';
import { IMenu } from '../../../interfaces/menu.interface';

export const updateMenu = createAction('[Menu] Update',  props<{ menu: IMenu }>());