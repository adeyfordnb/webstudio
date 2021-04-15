import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {SlideService} from '../admin/shared/slide.service';

@NgModule({
  imports: [
    HttpClientModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  exports: [
    HttpClientModule,
    AngularFireStorageModule
  ],
  providers: [
    SlideService
  ]
})

export class SharedModule{

}
