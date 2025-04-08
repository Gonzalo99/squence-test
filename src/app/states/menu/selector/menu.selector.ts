import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MenuState } from '../menu.state';

// Get complete state of the device in application
export const selectAppState = createFeatureSelector<MenuState>('menu');

// get device
export const selectMenu = createSelector(
  selectAppState,
  (state: MenuState) => state.menu
);