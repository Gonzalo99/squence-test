import { Component } from '@angular/core';
import { SlideMenuComponent } from "../slide-menu/slide-menu.component";
import { IMenu } from '../../interfaces/menu.interface';
import { Store } from '@ngrx/store';
import { MenuState } from '../../states/menu/menu.state';
import { updateMenu } from '../../states/menu/action/menu.action';
import { TranslateModule } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule, SlideMenuComponent, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public rootUrl: string = '';
  public menuItems: Array<{ name: string, url: string }> = [];

  constructor(private readonly store: Store<MenuState>, private router: Router) {
    this.menuItems = [
      { name: 'SONGS', url: '/songs' },
      { name: 'ARTISTS', url: '/artists' },
      { name: 'RECORD-COMPANIES', url: '/record-companies' },
    ];

    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.rootUrl = (event as NavigationEnd).url.split('/')[1].toUpperCase();
    });
  }

  openMenu() {
    const menu: IMenu = {
      visible: true
    };
    this.store.dispatch(updateMenu({ menu: menu }));
  }

  // Function to check if the current root URL is in the menu items
  isRootUrlInMenu(): boolean {
    return this.menuItems.some(item => item.name === this.rootUrl);
  }
}
