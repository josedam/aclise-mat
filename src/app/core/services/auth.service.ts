import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap, filter } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import * as moment from 'moment';

import { environment } from '../../../environments/environment';
import { of, throwError, Observable, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators'
import { BACK_URL } from 'src/app/auth/auth.config';
import { User } from 'src/app/models/user.model';
import { UserRol } from 'src/app/auth/user-rol-enum';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {
    private CURRENT_USER = 'currentUser';
    private _currentUser: User ; //= new User;

    public onChangeUser = new BehaviorSubject<User>(this._currentUser);
    
    constructor(
        private http: HttpClient,
        @Inject('LOCALSTORAGE') private localStorage: Storage) {

           this.loadCurrentUser();
    }

    login(username: string, password: string):Observable<any> {
        const url = `${BACK_URL}/auth/login`;
        return this.http.post(url, {username, password})
        .pipe(
            tap(resp => {
                this._currentUser = {
                    ...resp['user'],
                    token: resp['accessToken'],
                    isAdmin: this.isUserRolAdmin(resp['user']['rol']) 
                };
                this.saveCurrentUser();
                return true;
            }),
            catchError(e => {
                return throwError(e);
            })
        );
    }
    
    isUserAdmin() {
        return this.isUserLoged() && this.getCurrentUser().isAdmin;
    }

    private isUserRolAdmin(rol: string): boolean {
        return rol === UserRol.ADMIN || rol === UserRol.SUPER_USER;
    }

    // return of(true)
    //         .pipe(delay(1000), map((/*response*/) => {
    //             // set token property
    //             // const decodedToken = jwt_decode(response['token']);

    //             // store email and jwt token in local storage to keep user logged in between page refreshes
    //             this.localStorage.setItem('currentUser', JSON.stringify({
    //                 token: 'aisdnaksjdn,axmnczm',
    //                 isAdmin: true,
    //                 email: 'john.doe@gmail.com',
    //                 id: '12312323232',
    //                 alias: 'john.doe@gmail.com'.split('@')[0],
    //                 expiration: moment().add(1, 'days').toDate(),
    //                 fullName: 'John Doe'
    //             }));

    //             return true;
    //         }));
    // }


    private loadCurrentUser() {
        this._currentUser = JSON.parse(this.localStorage.getItem(this.CURRENT_USER));
    }

    private saveCurrentUser() {
        this.localStorage.setItem(this.CURRENT_USER,JSON.stringify(this._currentUser));
    }

    private deleteCurrentUser() {
        this.localStorage.removeItem(this.CURRENT_USER);
    }

    changeUserNotify() {
        this.onChangeUser.next(this._currentUser);
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        // this.localStorage.removeItem('currentUser');
        this._currentUser = null;
        this.deleteCurrentUser();
    }

    isUserLoged(){
        return (this._currentUser != null) && (this._currentUser.token.length > 0);
    } 

    getCurrentUser(): any {
        // TODO: Enable after implementation
        // return JSON.parse(this.localStorage.getItem('currentUser'));
        return this._currentUser;
    }    
    //     return {
    //         token: 'aisdnaksjdn,axmnczm',
    //         isAdmin: true,
    //         email: 'john.doe@gmail.com',
    //         id: '12312323232',
    //         alias: 'john.doe@gmail.com'.split('@')[0],
    //         expiration: moment().add(1, 'days').toDate(),
    //         fullName: 'John Doe'
    //     };
    // }

    passwordResetRequest(email: string) {
        return of(true).pipe(delay(1000));
    }

    changePassword(username: string, password: string, newPassword: string) {
        const url = `${BACK_URL}/users/psw`;
        return this.http.patch(url, {username, password, newPassword});
    }        
    //     return of(true).pipe(delay(1000));
    // }

    changeData({ username, fullname, email }: { username: string; fullname: string; email: string; }):Observable<any> {
        const url = `${BACK_URL}/users/upd`;
        console.log(username, fullname, email);
        return this.http.patch(url, {username, fullname, email });
        // return of(true).pipe(delay(1000));
    }

    passwordReset(email: string, token: string, password: string, confirmPassword: string): any {
        return of(true).pipe(delay(1000));
    }

    renovarToken():Observable<any> {
        return of(true).pipe(delay(1000));
    }

    VerificarRenovarToken(fechaExpSegundos: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
          if (!this.isTokenExpired(5)) {
            resolve(true);
          } else {
            this.renovarToken()
              .subscribe(
                () => {
                  resolve(true);
                },
                () => {
                  reject(false);
                });
          }
        });
      }
    
      isTokenExpired(limiteMinutos: number = 0) {
    
        const token =  this._currentUser['token'];   //     this.suarioService.token;
        const payload = JSON.parse(atob(token.split('.')[1]));
        const fechaExpSegundos = payload['exp'];
                
        const fechaToken = new Date(fechaExpSegundos * 1000);
        const fechaLimite = new Date();
        fechaLimite.setTime(fechaLimite.getTime() + limiteMinutos * 60 * 1000); // en minutos 
        return fechaToken.getTime() < fechaLimite.getTime();
      }
    

}
