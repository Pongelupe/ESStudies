import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DarkenOnHoverDirective } from './darken-on-hover.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [DarkenOnHoverDirective],
  declarations: [DarkenOnHoverDirective]
})
export class DarkenOnHoverModule { }
