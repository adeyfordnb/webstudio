//Modules
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SharedModule} from "../shared/shared.module";

//Components
import {AdminLayoutComponent} from "../shared/mainlayouts/admin-layout/admin-layout.component";
import {LoginPageComponent} from './components/login-page/login-page.component';
import { SliderComponent } from './components/slider/slider.component';
import { PostsComponent } from './components/posts/posts.component';

//Services
import {AuthGuard} from "./shared/auth.guard";
import {AuthService} from "./shared/auth.service";
import {FlashMessagesModule} from 'flash-messages-angular';


@NgModule ({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    SliderComponent,
    PostsComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'posts', component: PostsComponent, canActivate: [AuthGuard]},
          {path: 'slider', component: SliderComponent, canActivate: [AuthGuard]}
        ]
      }
    ]),
    FontAwesomeModule,
    FlashMessagesModule
  ],
  exports: [RouterModule],
  providers: [
    AuthService,
    AuthGuard,
  ]
})

export class AdminModule {
}
