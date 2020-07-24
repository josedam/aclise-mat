import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ProfileComponent } from './profile/profile.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeDataComponent } from './change-data/change-data.component';
import { ChangeImageComponent } from './change-image/change-image.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AccountRoutingModule
  ],
  declarations: [ProfileComponent, ChangePasswordComponent, ProfileDetailsComponent, ChangeDataComponent, ChangeImageComponent],
  exports: [ProfileComponent]
})
export class AccountModule { }
