import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../admin/shared/auth.service";
import { faFileImage } from '@fortawesome/free-solid-svg-icons';
import { faPortrait} from '@fortawesome/free-solid-svg-icons';
import { faCog} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit{

  //Icons
  slideIcon = faFileImage;
  post = faPortrait;
  settings = faCog;

  constructor(
    private router: Router,
    public auth: AuthService
  ) { }

  ngOnInit() {
  }

  logout(event: Event) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/admin', 'login'])

  }
}
