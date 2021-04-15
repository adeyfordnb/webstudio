import { NgModule } from '@angular/core';
import {MainComponent} from '../components/main/main.component';
import {MainLayoutComponent} from '../shared/mainlayouts/main-layout/main-layout.component';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: MainComponent}
    ]
  },
  {path: 'admin', loadChildren: () => import('../admin/admin.module').then( m => m.AdminModule)}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
