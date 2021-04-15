import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieEntryDialogComponent } from './movie-entry-dialog.component';

describe('MovieEntryDialogComponent', () => {
  let component: MovieEntryDialogComponent;
  let fixture: ComponentFixture<MovieEntryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieEntryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
