import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  showSuccess(message) {
    this.toastr.success(message, 'COVID-19 Visualizer');
  }

  showError(message) {
    this.toastr.error(message, 'COVID-19 Visualizer');
  }

  showInfo(message) {
    this.toastr.info(message, 'COVID-19 Visualizer');
  }

  showWarning(message) {
    this.toastr.warning(message, 'COVID-19 Visualizer');
  }
}
