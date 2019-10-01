import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtasksComponent } from './listtasks.component';

describe('ListtasksComponent', () => {
  let component: ListtasksComponent;
  let fixture: ComponentFixture<ListtasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListtasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListtasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
