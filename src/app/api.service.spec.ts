import { TestBed, inject } from '@angular/core/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService]
    });
  });

  it('should be created', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));

  it('#getContacts() should fetch results and show', () => {
    //const comp = new LightswitchComponent();
    //expect(component.message).toMatch(/is off/i, 'off at first');
   // ApiService.getContacts();
   this.service.getContacts();
    //expect(component.message).toMatch(/is on/i, 'on after clicked');
  });
});
