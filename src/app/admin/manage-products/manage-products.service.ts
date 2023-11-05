import { Injectable, Injector } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { UploadResponse } from './upload.interface';
import { HttpStatusCode } from '@angular/common/http';
import { NotificationService } from 'src/app/core/notification.service';

@Injectable()
export class ManageProductsService extends ApiService {
  constructor(
    injector: Injector,
    private notificationService: NotificationService
  ) {
    super(injector);
  }

  uploadProductsCSV(file: File): Observable<unknown> {
    if (!this.endpointEnabled('import')) {
      console.warn(
        'Endpoint "import" is disabled. To enable change your environment.ts config'
      );
      return EMPTY;
    }

    return this.getPreSignedUrl(file.name).pipe(
      // eslint-disable-next-line rxjs/no-implicit-any-catch
      catchError((err: any) => {
        if (err.status === HttpStatusCode.Forbidden) {
          this.notificationService.showError(
            `Forbidden to gather pre-signed URL.`
          );
        } else if (err.status === HttpStatusCode.Unauthorized) {
          this.notificationService.showError(
            `Unauthorized to gather pre-signed URL.`
          );
        }
        return of(err);
      }),
      switchMap((resp: any) => {
        console.log(resp);
        {
          if (resp.status === 200) {
            return this.http.put(resp.url, file, {
              headers: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                'Content-Type': 'text/csv',
              },
            });
          }
          return of(null);
        }
      })
    );
  }

  private getPreSignedUrl(fileName: string): Observable<UploadResponse> {
    const url = this.getUrl('import', 'import');
    const authToken = localStorage.getItem('authToken');

    return authToken
      ? this.http.get<UploadResponse>(url, {
          params: {
            name: fileName,
          },
          headers: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Authorization: `Basic ${authToken}`,
          },
        })
      : this.http.get<UploadResponse>(url, {
          params: {
            name: fileName,
          },
        });
  }
}
