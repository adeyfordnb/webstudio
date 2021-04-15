import { Component, OnInit } from '@angular/core';
import { faFileImage } from '@fortawesome/free-solid-svg-icons';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {SlideService} from '../../shared/slide.service';
import {FlashMessagesService} from 'flash-messages-angular';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  formSlider: FormGroup = new FormGroup({});
  path: string = '';
  fullInput:boolean = false;

  //Icons
  image = faFileImage;

  //Slider example text
  exsText: string = '';

  //URLS for template
  placeholder: any = 'assets/placeholders/525x650.jpg';
  downloadUrl: string = '';

  constructor(
    private angularFire: AngularFireStorage,
    private slideService: SlideService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
    this.formSlider = new FormGroup({
      textSlide: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ])
    })
  }

  uploadSlide() {

    const id = Math.random().toString(36);
    const fileRef:AngularFireStorageReference = this.angularFire.ref("slides").child(id);
    const task: AngularFireUploadTask = fileRef.put(this.path);

    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(downloadURL => {
          this.createSlideObj(downloadURL, this.formSlider.value.textSlide)
        });
      })
    ).subscribe(res => {
      //Show success massage
      if(res.state === 'success'){
        this.flashMessage.show('Success', {
          cssClass: 'flash-m-s',
          timeout: 3000
        })
      }
    }, error => {console.error(error)});

  }

  upload($event: any) {
    const reader = new FileReader();
    this.path = $event.target.files[0];
    this.fullInput = true;

    reader.readAsDataURL($event.target.files[0]);
    reader.onload = (e:any) => {
      this.downloadUrl = e.target['result']
    }
  }

  //Create slide object which will be send
  createSlideObj(url: string, text: string){
    //Obj of slider
    const slide = {
      url: url,
      text: text
    }

    //Reset all inputs
    this.slideService.sendSlide(slide);
    this.downloadUrl = '';
    this.exsText = '';
    this.formSlider.reset();
  }

  //Set example text if input is empty
  exsFunc($event: any) {
    this.exsText = $event.target.value
  }
}
