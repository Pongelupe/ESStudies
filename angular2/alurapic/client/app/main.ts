import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from './app.module';
const plataform = platformBrowserDynamic();
plataform.bootstrapModule(AppModule);