import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOneDocumentComponent } from './show-one-document.component';

describe('ShowOneDocumentComponent', () => {
  let component: ShowOneDocumentComponent;
  let fixture: ComponentFixture<ShowOneDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowOneDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOneDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
