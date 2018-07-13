import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PlataformDetectorService {

  constructor(@Inject(PLATFORM_ID) private plataformId: string) { }

  isPlatformBrowser(): boolean {
    return isPlatformBrowser(this.plataformId);
  }
}
