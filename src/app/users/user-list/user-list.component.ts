import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { NotificationService } from '../../core/services/notification.service';
import { NGXLogger } from 'ngx-logger';
import { UserService } from '../../core/services/user.service';
import { AgGridAngular } from 'ag-grid-angular';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  title = 'app';

  columnDefs = ['username','fullname','email','rol','datecreate','acciones'];

  //   { headerName: 'Usuario', field: 'username' },
  //   { headerName: 'Nombre', field: 'fullname' },
  //   { headerName: 'eMail', field: 'email' },
  //   { headerName: 'rol', field: 'rol' },
  //   { headerName: 'creado', field: 'datecreate' },
  // ];

  rowData: any;

  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Usuarios');
    this.logger.log('Users loaded');
    this.getAllUsers();
  }

  private getAllUsers() {
    this.userService.getAll().subscribe(
      (data) => {
        this.rowData = data;
        console.log(this.rowData);
      },
      (err) => {
        this.notificationService.openSnackBar(err);
      }
    );
  }

  getSelectedRows() {
    // const selectedNodes = this.agGrid.api.getSelectedNodes();
    // const selectedData = selectedNodes.map((node) => node.data);
    // const selectedDataStringPresentation = selectedData
    //   .map((node) => node.username + ' ' + node.fullnamemodel)
    //   .join(', ');
    // alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }
}
