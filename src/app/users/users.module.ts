import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { SharedModule } from '../shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule,
    AgGridModule.withComponents([]),
  ],
  declarations: [UserListComponent]
})
export class UsersModule { }
