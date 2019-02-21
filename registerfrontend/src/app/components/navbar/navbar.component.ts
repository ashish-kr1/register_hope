import { Component, OnInit } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    title = 'app';
    // username = 'ashihs@';
    constructor(private router: Router,
        public authservice: AuthService,
        private validatservice: ValidateService,
        private flashmessageservice: FlashMessagesService) { }
    isLoggedIn: boolean;
    user: any;
    a: boolean;
    b: boolean;
    ngOnInit() {
        this.authservice.loadToken();
        this.isLoggedIn = this.authservice.loggedIn();
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
    }

    logoutSubmit() {
        this.authservice.LogOut();
        this.flashmessageservice.show('You are logged out', {
            cssClass: 'alert-success', timeout: 3000
        });
        
        this.router.navigate(['/login']);
        return false;
    }
}


