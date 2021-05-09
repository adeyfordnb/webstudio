import { Component, OnInit } from '@angular/core';
//Icons
import { faFileImage } from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';

import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {SlideService} from '../../shared/slide.service';
import {FlashMessagesService} from 'flash-messages-angular';
import {MainObj} from '../../../shared/interfaces';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  formSlider: FormGroup = new FormGroup({});
  formMainPage: FormGroup = new FormGroup({});
  path: string = '';
  fullInput:boolean = false;

  //Icons
  image = faFileImage;
  img = faImage;
  text = faAlignJustify;
  description = faAlignLeft;
  social = faUserFriends;

  //Slider example text
  exsText: string = '';

  //URLS for template
  placeholder: any = 'assets/placeholders/525x650.jpg';
  downloadUrl: string = '';

  //The object which will be send to firebase
  mainPageObj: MainObj = {
    mainText: {
      firstBlock: '',
      secondBlock: ''
    },
    description: '',
    links: {
      instagram: '',
      telegram: '',
      facebook: ''
    }
  }

  links = {
    instagram: '',
    telegram: '',
    facebook: ''
  }

  constructor(
    private angularFire: AngularFireStorage,
    private slideService: SlideService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {

    this.slideService.getMainObj().subscribe(doc => {
      if(doc) {
        this.mainPageObj = doc;
        this.links = doc.links;
        console.log(this.mainPageObj)
      }
    })

    this.formSlider = new FormGroup({
      textSlide: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ])
    })

    this.formMainPage = new FormGroup({
      firstTextBlock: new FormControl(null, Validators.required),
      secondTextBlock: new FormControl(null, Validators.required),
      textareaDescription: new FormControl(null, Validators.required),
      instagramControl: new FormControl(null, Validators.required),
      telegramControl: new FormControl(null, Validators.required),
      facebookControl: new FormControl(null, Validators.required)
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

    switch ($event.target.attributes.getNamedItem('ng-reflect-name').value) {
      case 'firstTextBlock':
        this.mainPageObj.mainText.firstBlock = $event.target.value
        break
      case 'secondTextBlock':
        this.mainPageObj.mainText.secondBlock = $event.target.value
        break
      case 'textSlide':
        this.exsText = $event.target.value
        break
      case 'textareaDescription':
        this.mainPageObj.description = $event.target.value
    }
  }

  setLinks($event: any){
    switch ($event.target.attributes.getNamedItem('ng-reflect-name').value) {
      case 'instagramControl':
        this.links.instagram = $event.target.value
        break
      case 'telegramControl':
        this.links.telegram = $event.target.value
        break
      case 'facebookControl':
        this.links.facebook = $event.target.value
        break
    }
    console.log(this.links)

  }

  //Update main object
  updateMainObj() {
    this.slideService.updateMainObjService(this.mainPageObj)
  }

  //Update links
  updateLinks(){
    this.mainPageObj.links = this.links;
    this.slideService.updateMainObjService(this.mainPageObj)
  }
}
