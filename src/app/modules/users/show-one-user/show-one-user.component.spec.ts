import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOneUserComponent } from './show-one-user.component';

describe('ShowOneUserComponent', () => {
  let component: ShowOneUserComponent;
  let fixture: ComponentFixture<ShowOneUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowOneUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOneUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
