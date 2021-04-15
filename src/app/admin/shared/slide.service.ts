import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Slide} from '../../shared/interfaces';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()

export class SlideService {

  slidesCollection: AngularFirestoreCollection<Slide>;
  slides: Observable<Slide[]>

  constructor(
    private afs:AngularFirestore
  ) {
    this.slidesCollection = this.afs.collection('slides');
  }

  //PostSlide
  sendSlide(slide: Slide){
    this.slidesCollection.add(slide)
  }

  getSlides(){
    this.slides = this.slidesCollection.snapshotChanges().pipe(
      map(action => action.map(a =>{
        const data = a.payload.doc.data() as Slide;
        data.id = a.payload.doc.id;
        return data
      }))
    )

    return this.slides;
  }

}
