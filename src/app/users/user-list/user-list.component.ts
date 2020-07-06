import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { NotificationService } from '../../core/services/notification.service';
import { NGXLogger } from 'ngx-logger';
import { UserService } from '../../core/services/user.service';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridAngular;

  title = 'app';

  columnDefs = [
      {headerName: 'Usuario', field: 'username' },
      {headerName: 'Nombre' , field: 'fullname' },
      {headerName: 'eMail'  , field: 'email'},
      {headerName: 'rol'    , field: 'rol'},

  ];

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

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map( node => node.data );
    const selectedDataStringPresentation = selectedData.map( node => node.username + ' ' + node.fullnamemodel).join(', ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
}

}
