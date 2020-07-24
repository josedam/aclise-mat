import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-change-data',
  templateUrl: './change-data.component.html',
  styleUrls: ['./change-data.component.css'],
})
export class ChangeDataComponent implements OnInit {
  form: FormGroup;
  fullname: string;
  email: string;

  constructor(
    private authService: AuthenticationService,
    private spinnerService: SpinnerService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      fullname: new FormControl(this.authService.getCurrentUser().fullname, Validators.required),
      email: new FormControl(this.authService.getCurrentUser().email, Validators.email),
    });

    // this.form.get('fullname').valueChanges.subscribe((val) => {
    //   this.fullname = val;
    // });

    // this.form.get('email').valueChanges.subscribe((val) => {
    //   this.email = val;
    // });

  }

  restoreData() {
    this.form.get('fullname').setValue(this.authService.getCurrentUser().fullname);
    this.form.get('email').setValue(this.authService.getCurrentUser().email);
  }

  saveData() {
    const username = this.authService.getCurrentUser().username;
    const {fullname, email } = this.form.value;

   
    this.authService
      .changeData({ username, fullname, email })
      .subscribe(
        (data) => {
          console.log('ChgData...');
          console.log(data);
          // this.logger.info(`User ${username} changed data.`);
          this.notificationService.openSnackBar('Sus datos fueron Actualizados.');
        },
        (error) => {
          this.notificationService.openSnackBar(error.error);
        }
      );
  }
}
