import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApolloConfigModuleModule } from '../apollo-config-module.module';

@NgModule({
  exports: [
    BrowserModule,
    ApolloConfigModuleModule,
    BrowserAnimationsModule
  ]
})
export class CoreModule {

  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) { throw new Error('CoreModule is already loaded. Import it in the AppModule only'); }
  }

}
