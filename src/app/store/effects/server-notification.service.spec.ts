import { TestBed, inject } from '@angular/core/testing';

import { ServerNotificationService } from '../../../store/effects/server-notification.service';

describe('ServerNotificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerNotificationService]
    });
  });

  it('should be created', inject([ServerNotificationService], (service: ServerNotificationService) => {
    expect(service).toBeTruthy();
  }));
});
