import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paint } from '../paint';
import { Observable, map } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaintStockService {
  apiUrl: string = environment.apiUrl + 'paints';

  private http: HttpClient = inject(HttpClient);

  /**
   * Gets the list of paints from the server.
   * @returns An observable that emits an array of Paint objects.
   */
  getPaints(): Observable<Paint[]> {
    return this.http.get<Paint[]>(this.apiUrl);
  }

  /**
   * Updates the list of paints on the server with the new statuses.
   * @param paints The array of Paint objects to update.
   * @returns An observable that emits the updated array of Paint objects.
   */
  updatePaints(paints: Paint[]): Observable<Paint[]> {
    return this.http.put<Paint[]>(this.apiUrl, paints);
  }
}
