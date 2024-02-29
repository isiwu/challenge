import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

Injectable({
  providedIn: "root"
})
export class ErrorInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
    .handle(req)
    .pipe(catchError(() => {
      console.log("interceptor")
      return new Observable<any>(subscriber => {
        subscriber.next()
      })
    }))
  }
}
