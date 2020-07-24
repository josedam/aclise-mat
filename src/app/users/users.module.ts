import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { SharedModule } from '../shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { UserList2Component } from './user-list2/user-list2.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule,
    AgGridModule.withComponents([]),
  ],
  declarations: [UserListComponent, UserList2Component]
})
export class UsersModule { }
