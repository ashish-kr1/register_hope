import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  cnfpassword: string;
  user: Object;
  login: Boolean = true;
  forget: Boolean = false;
  constructor(private authservice: AuthService,
    private validateservice: ValidateService,
    private flashmessages: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {

    if (this.authservice.checkStorage() == false) {
      const user = {
        email: this.email,
        password: this.password
      }

      this.authservice.getProfile().subscribe(profile => {
        this.user = profile.user;
        this.router.navigate(['/dashboard']);
      },
        err => {
          console.log(err);
          return false;
        });

    }

  }
  LoginSubmit() {
    const user = {
      email: this.email,
      password: this.password
    }
    this.authservice.authenticateuser(user).subscribe(data => {
      if (data.success) {
        this.authservice.storeUserData(data.token, data.user);
        this.flashmessages.show('Now you are loggedIn', { cssClass: 'alert-success', timeout: 3000 });
        this.authservice.getProfile().subscribe(profile => {
          this.user = profile.user;

          this.router.navigate(['/dashboard']);
        },
          err => {
            console.log(err);
            return false;
          });
      }
      else {
        this.flashmessages.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/login']);
      }
    });
  }
  forgetPassword() {
    this.login = false;
    this.forget = true;
  }
  againLogin() {
    this.login = true;
    this.forget = false;
  }
  ForgetSubmit() {
    const user = {
      email: this.email,
      password: this.password,
      cnfpassword: this.cnfpassword
    }
    if (this.password == this.cnfpassword) {
      this.authservice.forgetPassword(user).subscribe(data => {
        this.flashmessages.show('Password reset successfull', { cssClass: 'alert-success', timeout: 3000 });
        this.login = true;
        this.forget = false;
      },
        err => {
          console.log(err);
          return false;
        })
    } else {
      this.flashmessages.show('Password Mismatch', { cssClass: 'alert-danger', timeout: 3000 });
    }
  }
}

