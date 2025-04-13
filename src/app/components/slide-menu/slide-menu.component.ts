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
  @Input() menuItems: Array<{ name: string; url: string; }> | undefined;

  public visible: boolean = false;
  public menuObs: Observable<IMenu>;
  

  constructor(private readonly store: Store<MenuState>) {
    this.menuObs = this.store.pipe(select(selectMenu));
    this.menuObs.subscribe((menu: IMenu) => {
      this.visible = menu.visible;
      this.slideMenu();
    });
  }

  closeMenu() {
    const menu: IMenu = {
      visible: false
    };
    this.store.dispatch(updateMenu({ menu: menu }));
  }

  // Function to slide the menu in and out
  // This function uses GSAP library to animate the menu sliding
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
