import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLandingComponent } from './navbar-landing.component';

describe('NavbarLandingComponenta', () => {
  let component: NavbarLandingComponent;
  let fixture: ComponentFixture<NavbarLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarLandingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
