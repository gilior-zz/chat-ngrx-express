import { TestBed, inject } from '@angular/core/testing';

import { MsgsEffectService } from '../store/effects/msgs-effect.service';

describe('MsgsEffectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MsgsEffectService]
    });
  });

  it('should be created', inject([MsgsEffectService], (service: MsgsEffectService) => {
    expect(service).toBeTruthy();
  }));
});
