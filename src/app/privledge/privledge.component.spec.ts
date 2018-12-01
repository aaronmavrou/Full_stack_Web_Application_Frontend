import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivledgeComponent } from './privledge.component';

describe('PrivledgeComponent', () => {
  let component: PrivledgeComponent;
  let fixture: ComponentFixture<PrivledgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivledgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
