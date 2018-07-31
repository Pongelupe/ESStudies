import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./core/auth/auth.guard";
import { NotFoundComponent } from "./errors/not-found/not-found.component";
import { SigninComponent } from './home/signin/signin.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoListResolver } from "./photos/photo-list/photo-list.resolver";
import { SignupComponent } from "./home/signup/signup.component";


const routes: Routes = [
    { path: '', component: SigninComponent, canActivate: [AuthGuard] },
    { path: 'signup', component: SignupComponent },
    { path: 'user/:userName', component: PhotoListComponent, resolve: { photos: PhotoListResolver } },
    { path: 'p/add', component: PhotoFormComponent },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }