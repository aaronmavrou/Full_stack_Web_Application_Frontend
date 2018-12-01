import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicCollectionComponent } from './public-collection.component';

describe('PublicCollectionComponent', () => {
  let component: PublicCollectionComponent;
  let fixture: ComponentFixture<PublicCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
