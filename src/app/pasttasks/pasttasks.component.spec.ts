import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasttasksComponent } from './pasttasks.component';

describe('PasttasksComponent', () => {
  let component: PasttasksComponent;
  let fixture: ComponentFixture<PasttasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasttasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasttasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
