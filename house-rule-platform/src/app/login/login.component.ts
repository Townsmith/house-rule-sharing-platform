import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../user.service';
import {BackEndService} from '../back-end.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logInForm: FormGroup;
  registerForm: FormGroup;
  usernameReg: FormControl;
  emailReg: FormControl;
  pwReg: FormControl;

  constructor(public router: Router,
              public user: UserService,
              public back: BackEndService) { }

  ngOnInit(): void {
    this.logInForm = new FormGroup({
      user: new FormControl(''),
      pw: new FormControl('')
    });
    this.usernameReg = new FormControl('', Validators.required);
    this.emailReg = new FormControl('', [Validators.required, Validators.email]);
    this.pwReg = new FormControl('', [Validators.required]);
    this.registerForm = new FormGroup({
      usernameReg : this.usernameReg,
      emailReg: this.emailReg,
      pwReg: this.pwReg
    })
  }

  async login() {
    const user = await this.back.login(this.logInForm.value);
    if (user.bggUserName) {
      const bgg = await this.back.getBGGUser(user.bggUserName);
      if (bgg !== undefined) {
        this.user.setBGGInfo(bgg);
      }
    }
    await this.router.navigateByUrl('home');
  }

  async register() {
    const user = await this.back.register(this.registerForm.value);
    if (user.bggUserName) {
      const bgg = await this.back.getBGGUser(user.bggUserName);
      if (bgg !== undefined) {
        this.user.setBGGInfo(bgg);
      }
    }
    await this.router.navigateByUrl('home');
  }

}
