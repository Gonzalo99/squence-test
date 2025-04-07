import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    // Config language
    this.translate.addLangs(['en', 'es']);
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }
}
