import { ComponentFixture, TestBed } from '@angular/core/testing';
// [ENH] Basic unit test scaffolding (quality/maintainability). Not usually required unless stated.

import { HomePage } from './home.page';
// [REQ] HomePage is the key feature page (search + student number + navigation icons). :contentReference[oaicite:1]{index=1}

describe('HomePage', () => {
  // [ENH] Smoke test suite: ensures component can be created without runtime errors.
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    // [ENH] TestBed creates the component in an Angular testing environment.
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;

    // [ENH] Triggers Angular bindings so the template renders for the test.
    fixture.detectChanges();
  });

  it('should create', () => {
    // [ENH] “Does it load?” test. Useful as a safety net after refactors.
    expect(component).toBeTruthy();
  });
});
