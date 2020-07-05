import { NotificationService } from './../../core/services/notification.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

import { AuthenticationService } from './../../core/services/auth.service';
import { SpinnerService } from './../../core/services/spinner.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  form: FormGroup;
  hideCurrentPassword: boolean;
  hideNewPassword: boolean;
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
  disableSubmit: boolean;

  constructor(private authService: AuthenticationService,
    private logger: NGXLogger,
    private spinnerService: SpinnerService,
    private notificationService: NotificationService) {

    this.hideCurrentPassword = true;
    this.hideNewPassword = true;
  }

  ngOnInit() {
    this.form = new FormGroup({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      newPasswordConfirm: new FormControl('', Validators.required),
    });

    this.form.get('currentPassword').valueChanges
      .subscribe(val => { this.currentPassword = val; });

    this.form.get('newPassword').valueChanges
      .subscribe(val => { this.newPassword = val; });

    this.form.get('newPasswordConfirm').valueChanges
      .subscribe(val => { this.newPasswordConfirm = val; });

    this.spinnerService.visibility.subscribe((value) => {
      this.disableSubmit = value;
    });
  }

  changePassword() {

    if (this.newPassword !== this.newPasswordConfirm) {
      this.notificationService.openSnackBar('La confirmacion de Clave No coincide.');
      return;
    }

    const username = this.authService.getCurrentUser().username;

    this.authService.changePassword(username, this.currentPassword, this.newPassword)
      .subscribe(
        data => {
          console.log('Chgpassw...');
          console.log(data);
          this.logger.info(`User ${username} changed password.`);
          this.form.reset();
          this.notificationService.openSnackBar('Su Clave fue actualizada.');
        },
        error => {
          this.notificationService.openSnackBar(error.error);
        }
      );
  }
}
