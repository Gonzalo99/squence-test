import { Component, Input } from '@angular/core';
import gsap from 'gsap';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { MenuState } from '../../states/menu/menu.state';
import { Observable } from 'rxjs';
import { IMenu } from '../../interfaces/menu.interface';
import { selectMenu } from '../../states/menu/selector/menu.selector';
import { updateMenu } from '../../states/menu/action/menu.action';

@Component({
  selector: 'app-slide-menu',
  imports: [CommonModule, RouterModule],
  templateUrl: './slide-menu.component.html',
  styleUrl: './slide-menu.component.scss'
})
export class SlideMenuComponent {
  public visible: boolean = false;
  public menuObs: Observable<IMenu>;
  public menuItems: Array<{ name: string, url: string }> = [];

  constructor(private readonly store: Store<MenuState>) {
    this.menuObs = this.store.pipe(select(selectMenu));
    this.menuObs.subscribe((menu: IMenu) => {
      this.visible = menu.visible;
      this.slideMenu();
    });
    this.menuItems = [
      { name: 'SONGS', url: '/songs' },
      { name: 'ARTISTS', url: '/artists' },
      { name: 'RECORD-COMPANIES', url: '/record-companies' },
    ];
  }

  closeMenu() {
    const menu: IMenu = {
      visible: false
    };
    this.store.dispatch(updateMenu({ menu: menu }));
  }

  slideMenu() {
    if(!this.visible) {
      gsap.to("#left-menu-panel", {
          marginLeft: -360,
      });
    } else {
        gsap.to("#left-menu-panel", {
            marginLeft: 0,
        });
    }
  }
}
