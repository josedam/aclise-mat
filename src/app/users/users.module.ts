import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { SharedModule } from '../shared/shared.module';

import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
import {
  faStackOverflow,
  faGithub,
  faMedium,
} from '@fortawesome/free-brands-svg-icons';
import { UserComponent } from './user/user.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserDetalleComponent } from './user-detalle/user-detalle.component';

@NgModule({
  imports: [FontAwesomeModule, CommonModule, SharedModule, UsersRoutingModule],
  declarations: [
    UserListComponent,
    UserComponent,
    UserAddComponent,
    UserUpdateComponent,
    UserDetalleComponent,

  ],
})
export class UsersModule {
  constructor(private faIconLibrary: FaIconLibrary) {
    this.faIconLibrary.addIcons(
      faStackOverflow,
      faGithub,
      faMedium,
      faTrash,
      faTrashAlt,
      faEdit
    );
  }
}
