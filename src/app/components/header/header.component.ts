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

  constructor(private readonly store: Store<MenuState>, private router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.rootUrl = (event as NavigationEnd).url.substring(1).toUpperCase();
    });
  }

  openMenu() {
    const menu: IMenu = {
      visible: true
    };
    this.store.dispatch(updateMenu({ menu: menu }));
  }
}
