import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDeleteConfirmationComponent } from './book-delete-confirmation.component';

describe('BookDeleteConfirmationComponent', () => {
  let component: BookDeleteConfirmationComponent;
  let fixture: ComponentFixture<BookDeleteConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookDeleteConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
