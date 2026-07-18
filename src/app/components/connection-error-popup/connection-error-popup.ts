import { Component, DestroyRef, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, interval, map, of, startWith, switchMap, timeout } from 'rxjs';
import { ApiEndpoints } from '../../constants/ApiEndpointsEnum';

@Component({
  selector: 'app-connection-error-popup',
  imports: [],
  templateUrl: './connection-error-popup.html',
  styleUrl: './connection-error-popup.css',
})
export class ConnectionErrorPopup {
  protected readonly connectionLost = signal(false);

  private readonly destroyRef = inject(DestroyRef);

  constructor(private http: HttpClient) {
    interval(10000)
      .pipe(
        startWith(0),
        switchMap(() => this.checkBackendConnection()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((isConnected) => {
        this.connectionLost.set(!isConnected);
      });
  }

  private checkBackendConnection() {
    return this.http
      .get(ApiEndpoints.GET_PING, {
        observe: 'response',
        responseType: 'text',
      })
      .pipe(
        timeout(5000),
        map(() => true),
        catchError(() => of(false)),
      );
  }
}
