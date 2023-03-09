import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Alert, AlertType } from 'src/app/_interfaces/alert.interface';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<Alert>();
    private defaultId = 'default-alert';

    // enable subscribing to alerts observable
    onAlert(id = this.defaultId): Observable<Alert> {
        return this.subject.asObservable().pipe(filter(x => x && x.id === id));
    }

    // convenience methods
    success(message: string, options?: any) {
        this.alert(({ ...options, type: AlertType.Success, message: message }));
    }

    error(message: string, options?: any) {
        this.alert(({ ...options, type: AlertType.Error, message:message }));
    }

    info(message: string, options?: any) {
        this.alert(({ ...options, type: AlertType.Info, message:message }));
    }

    warn(message: string, options?: any) {
        this.alert(({ ...options, type: AlertType.Warning, message:message }));
    }

    // main alert method
    alert(alert: Alert) {
        alert.id = alert.id || this.defaultId;
        this.subject.next(alert);
    }

    // clear alerts
    clear(id = this.defaultId) {
        var alert!:Alert;
        this.onAlert(id).subscribe(x => alert=x);
        this.subject.next(alert);
    }
}
