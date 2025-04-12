import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SongsComponent } from './songs.component';
import { SongService } from '../../services/song.service';
import { Song } from '../../models/song.model';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

describe('SongsComponent', () => {
  let component: SongsComponent;
  let fixture: ComponentFixture<SongsComponent>;
  let mockSongService: jasmine.SpyObj<SongService>;

  beforeEach(async () => {
    mockSongService = jasmine.createSpyObj('SongService', ['getSongs']);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [SongsComponent, CommonModule, TranslateModule.forRoot()],
      providers: [
        { provide: SongService, useValue: mockSongService },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SongsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch songs on ngOnInit', async () => {
    const mockSongs: Song[] = [
      { id: "1", title: 'Song 1', poster: "test", genre: ["test"], year: 2023, duration: 3, rating: 5, artist: 1 },
      { id: "2", title: 'Song 2', poster: "test", genre: ["test"], year: 2023, duration: 3, rating: 5, artist: 1 }
    ];
    mockSongService.getSongs.and.returnValue(Promise.resolve(mockSongs));

    await component.ngOnInit();

    expect(mockSongService.getSongs).toHaveBeenCalled();
    expect(component.songs).toEqual(mockSongs);
  });

  it('should handle empty song list', async () => {
    mockSongService.getSongs.and.returnValue(Promise.resolve([]));

    await component.ngOnInit();

    expect(mockSongService.getSongs).toHaveBeenCalled();
    expect(component.songs).toEqual([]);
  });
});