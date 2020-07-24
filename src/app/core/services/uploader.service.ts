import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpEvent,
} from '@angular/common/http';
import { map, tap, last } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { BACK_URL } from 'src/app/auth/auth.config';

@Injectable({
  providedIn: 'root',
})
export class UploaderService {
  public progressSource = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  upload(file: File, sectionName: string = 'file') {
    const url = `${BACK_URL}/upload`;

    let formData = new FormData();
    formData.append('file', file);

    // const req = new HttpRequest(
    //   'POST',
    //   url,
    //   formData,
    //   {
    //     reportProgress: true,
    //   }
    // );
    
    return  this.http.post(url, formData, {reportProgress:true, observe:'events'}).pipe(
        map((event) => this.getEventMessage(event, file)),
        tap((envelope: any) => this.processProgress(envelope)),
        last()       
      );

    // return this.http.request(req).pipe(
    //   map((event) => this.getEventMessage(event, file)),
    //   tap((envelope: any) => this.processProgress(envelope)),
    //   last()
    // );
  }

  processProgress(envelope: any): void {
    if (typeof envelope === 'number') {
      this.progressSource.next(envelope);
    }
  }

  private getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Enviando "${file.name}", peso ${file.size}.`;
      case HttpEventType.UploadProgress:
        return Math.round((100 * event.loaded) / event.total);
      case HttpEventType.Response:
        return `Archivo "${file.name}" envío finalizado!`;
      default:
        return `Archivo "${file.name}" envio erroneo ... : ${event.type}.`;
    }
  }
}
