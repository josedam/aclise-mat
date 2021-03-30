import { Injectable } from '@angular/core';

import { faTrash, faSpinner, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt, faEdit, faUserCircle  } from '@fortawesome/free-regular-svg-icons';
import {
  faTwitterSquare,
  faFacebookSquare,
  faGoogle,
  faInstagramSquare,
} from '@fortawesome/free-brands-svg-icons';

@Injectable({
  providedIn: 'root',
})
export class CustomIconsService {
  faTrash = faTrash;
  faSpinner = faSpinner;
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  faUserCircle = faUserCircle;
  faTwitterSquare = faTwitterSquare;
  faFacebookSquare = faFacebookSquare;
  faGoogle = faGoogle;
  faInstagramSquare = faInstagramSquare;

  constructor() {}
}
