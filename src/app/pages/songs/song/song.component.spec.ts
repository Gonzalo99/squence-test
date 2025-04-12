import { CommonModule } from "@angular/common";
import { SongComponent } from "./song.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CompanieService } from "../../../services/companie.service";
import { SongService } from "../../../services/song.service";
import { ModalService } from "../../../services/utils/modal.service";
import { SnackService } from '../../../services/utils/snack.service';
import { ActivatedRoute } from "@angular/router";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from "rxjs";

describe('SongComponent', () => {
  let component: SongComponent;
  let fixture: ComponentFixture<SongComponent>;
  let mockActivatedRoute: any;
  let mockSongService: jasmine.SpyObj<SongService>;
  let mockCompanieService: jasmine.SpyObj<CompanieService>;
  let mockModalService: jasmine.SpyObj<ModalService>;
  let mockSnackService: jasmine.SpyObj<SnackService>;
  let mockTranslateService: jasmine.SpyObj<TranslateService>;

  beforeEach(async () => {
    mockActivatedRoute = { snapshot: { paramMap: { get: jasmine.createSpy('get').and.returnValue('123') } } };
    mockSongService = jasmine.createSpyObj('SongService', ['getSong']);
    mockCompanieService = jasmine.createSpyObj('CompanieService', ['getCompanies']);
    mockModalService = jasmine.createSpyObj('ModalService', ['openLoader']);
    mockSnackService = jasmine.createSpyObj('SnackService', ['show']);
    mockTranslateService = jasmine.createSpyObj('TranslateService', ['instant', 'get']);

    await TestBed.configureTestingModule({
      imports: [SongComponent, CommonModule, TranslateModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: SongService, useValue: mockSongService },
        { provide: CompanieService, useValue: mockCompanieService },
        { provide: ModalService, useValue: mockModalService },
        { provide: SnackService, useValue: mockSnackService },
        { provide: TranslateService, useValue: mockTranslateService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SongComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch songId from route on ngOnInit', async () => {
    const mockSong = { id: "123", title: 'Test Song', poster: "test", genre: ["test"], year: 2023, duration: 3, rating: 5, artist: 1 };
    const mockCompanies = [{ id: '1', name: 'Company 1', country: 'ES', createYear: 1997, employees: 100, rating: 45, songs: ['123'] }];

    mockSongService.getSong.and.returnValue(Promise.resolve(mockSong));
    mockCompanieService.getCompanies.and.returnValue(Promise.resolve(mockCompanies));

    await component.ngOnInit();

    expect(mockActivatedRoute.snapshot.paramMap.get).toHaveBeenCalledWith('id-song');
    expect(mockSongService.getSong).toHaveBeenCalledWith('123');
    expect(mockCompanieService.getCompanies).toHaveBeenCalled();
    expect(component.song).toEqual(mockSong);
    expect(component.companies).toEqual(mockCompanies);
  });

  it('should handle errors with handleError', async () => {
    mockTranslateService.get.and.returnValue(of('Translated Error'));

    await component.handleError('ERROR.UNEXPECTED_ERROR');

    expect(mockTranslateService.get).toHaveBeenCalledWith('ERROR.UNEXPECTED_ERROR');
    expect(mockSnackService.show).toHaveBeenCalledWith('Translated Error', '', {
      duration: 5000,
      panelClass: ['warning-snackbar'],
    });
  });
});