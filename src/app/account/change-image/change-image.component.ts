import { Component, OnInit } from '@angular/core';
import { UploaderService } from 'src/app/core/services/uploader.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-change-image',
  templateUrl: './change-image.component.html',
  styleUrls: ['./change-image.component.scss'],
})
export class ChangeImageComponent implements OnInit {
  file: File;
  imageUrl: string | ArrayBuffer = 'assets/user.png'; // 'https://bulma.io/images/placeholders/480x480.png';

  fileName: string = '';

  constructor(
    private uploader: UploaderService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  saveImage() {
    this.uploader.upload(this.file).subscribe(
      (msg) => {
        this.notificationService.openSnackBar(msg);
      },
      (err) => {
        this.notificationService.openSnackBar(err.error);
      }
    );
  }

  onChange(file: File) {
    if (file) {
      this.fileName = file.name;
      this.file = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        this.imageUrl = reader.result;
      };
    }
  }
}
