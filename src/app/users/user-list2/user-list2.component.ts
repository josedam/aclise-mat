import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-list2',
  templateUrl: './user-list2.component.html',
  styleUrls: ['./user-list2.component.scss']
})
export class UserList2Component implements OnInit {
  rowData : any;

  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Usuarios');
    this.logger.log('Users loaded');
    this.getAllUsers();
  }

  private getAllUsers() {
    
    this.rowData = this.userService.getAll();
  }
}
