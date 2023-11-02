import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GallerySearchComponent } from './gallery-search.component';

describe('GallerySearchComponent', () => {
  let component: GallerySearchComponent;
  let fixture: ComponentFixture<GallerySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GallerySearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GallerySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
