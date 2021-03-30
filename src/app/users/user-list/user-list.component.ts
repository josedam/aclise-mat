import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { NotificationService } from '../../core/services/notification.service';
import { NGXLogger } from 'ngx-logger';
import { UserService } from '../../core/services/user.service';
import { AgGridAngular } from 'ag-grid-angular';
import { User } from 'src/app/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  title = 'app';

  columnDefs = [
    'username',
    'fullname',
    'email',
    'rol',
    'datecreate',
    'acciones',
  ];

  rowData: any;

  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private userService: UserService,
    private matDialog: MatDialog
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

  editRow(row) {
    console.log('editar');
    console.log(row);
  }

  deleteRow(row) {
    console.log('borrar');
    console.log(row);
  }

  newRow() {
    this.matDialog
      .open(ConfirmDialogComponent, {
        data: new ConfirmDialogModel(
          'Titulo del modal',
          'Mensaje para mostrar'
        ),
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res) => {
        console.log(`res: ${res}`);
      });
    console.log('Nuevo Registro');
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
