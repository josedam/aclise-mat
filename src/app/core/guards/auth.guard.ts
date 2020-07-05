import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import * as moment from 'moment';

import { AuthenticationService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
        private notificationService: NotificationService,
        private authService: AuthenticationService) { }

    canActivate() {
        if( this.authService.isUserLoged()) {
            if( this.authService.isTokenExpired()){
                this.notificationService.openSnackBar('Su sesion ha expirado...');
                this.router.navigate(['auth/login']);
                return false;

            } else {
                return true;
            }
        
        } else {
            this.router.navigate(['auth/login']);
            return false;
        }    
    }    
        
    

    //     const user = this.authService.getCurrentUser();

    //     if (user && user.expiration) {

    //         if (moment() < moment(user.expiration)) {
    //             return true;
    //         } else {
    //             this.notificationService.openSnackBar('Your session has expired');
    //             this.router.navigate(['auth/login']);
    //             return false;
    //         }
    //     }

    //     this.router.navigate(['auth/login']);
    //     return false;
    // }

    
    

}
