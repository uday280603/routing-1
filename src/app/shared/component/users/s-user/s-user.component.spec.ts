import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SUserComponent } from './s-user.component';

describe('SUserComponent', () => {
  let component: SUserComponent;
  let fixture: ComponentFixture<SUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
