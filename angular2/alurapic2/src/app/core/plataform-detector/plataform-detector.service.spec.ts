import { TestBed, inject } from '@angular/core/testing';

import { PlataformDetectorService } from './plataform-detector.service';

describe('PlataformDetectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlataformDetectorService]
    });
  });

  it('should be created', inject([PlataformDetectorService], (service: PlataformDetectorService) => {
    expect(service).toBeTruthy();
  }));
});
