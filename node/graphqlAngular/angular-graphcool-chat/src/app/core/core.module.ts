import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApolloConfigModuleModule } from '../apollo-config-module.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule, MatToolbarModule } from '@angular/material';

@NgModule({
  exports: [
    BrowserModule,
    ApolloConfigModuleModule,
    BrowserAnimationsModule,
    MatListModule,
    MatToolbarModule
  ]
})
export class CoreModule {

  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) { throw new Error('CoreModule is already loaded. Import it in the AppModule only'); }
  }

}
