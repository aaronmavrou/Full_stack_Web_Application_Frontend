import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakedownComponent } from './takedown.component';

describe('TakedownComponent', () => {
  let component: TakedownComponent;
  let fixture: ComponentFixture<TakedownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakedownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakedownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
