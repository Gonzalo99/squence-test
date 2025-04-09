import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewSongComponent } from './preview-song.component';

describe('PreviewSongComponent', () => {
  let component: PreviewSongComponent;
  let fixture: ComponentFixture<PreviewSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewSongComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
