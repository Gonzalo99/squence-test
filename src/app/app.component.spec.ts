import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './components/header/header.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('AppComponent', () => {
  let translateService: TranslateService;
  let mockStore: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['select', 'dispatch', 'pipe']);
    mockStore.select.and.returnValue(of({}));
    mockStore.pipe.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        AppComponent,
        HeaderComponent
      ],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } }
      ]
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should configure TranslateService with languages', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(translateService.getLangs()).toEqual(['en', 'es']);
    expect(translateService.getDefaultLang()).toBe('es');
    expect(translateService.currentLang).toBe('es');
  });
});