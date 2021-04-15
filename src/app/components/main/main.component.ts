import {Component, OnInit, ViewChild} from '@angular/core';
import { SlickCarouselComponent } from "ngx-slick-carousel";

import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";
import { faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook";
import {SlideService} from '../../admin/shared/slide.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @ViewChild('slickModalImg', {static: false}) slickCarouselImg!: SlickCarouselComponent;
  @ViewChild('slickModalText', {static: false}) slickCarouselText!: SlickCarouselComponent;
  @ViewChild('slickModalCounter', {static: false}) slickCarouselCounter!: SlickCarouselComponent;

  //classes for nav menu
  navActiveMenu:boolean = false;
  navActive: boolean = false;
  classes = {};

  //icons
  telegram = faTelegram;
  instagram = faInstagram;
  facebook = faFacebook;

  //Current slide index
  current_slide_index!: number;

  //Slider config
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1, "swipe": true, arrows: false};
  slideConfigCounter = {"slidesToShow": 2, "slidesToScroll": 1, "vertical": true, swipe: false, arrows: false}
  slideConfigText = {"slidesToShow": 1, "slidesToScroll": 1, "swipe": false, arrows: false};

  slides:any= [];

  slide = {
    img: 'https://images.unsplash.com/photo-1570158268183-d296b2892211?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    imgText: 'portrait'
  }

  constructor(
    private sc: SlideService
  ) {
    //nav menu
    this.classes = {
      navActiveMenu: 'nav-menu-active',
      navActive: 'nav-active'
    }
  }

  ngOnInit() {
    this.sc.getSlides().subscribe(slides =>{
      this.slides = slides;
    }, error => {
      console.log(error);
    })
  }


  //nav menu events
  nav_event(){
    this.navActiveMenu = !this.navActiveMenu;
    this.navActive = !this.navActive;
  }

  close_nav(){
    this.navActiveMenu = false;
    this.navActive = false;
  }

  //slides events
  slide_pre(){
    this.slickCarouselImg.slickPrev();
  }
  slide_next(){
    this.slickCarouselImg.slickNext()
  }
  slick_init(event: any){
    this.current_slide_index = event.currentSlide;
    this.slickCarouselText.slickGoTo(this.current_slide_index);
    this.slickCarouselCounter.slickGoTo(this.current_slide_index);
  }

}
