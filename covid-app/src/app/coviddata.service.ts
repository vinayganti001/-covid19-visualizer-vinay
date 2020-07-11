import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NotificationService } from './notification.service';
@Injectable({
  providedIn: 'root',
})
export class CoviddataService {
  constructor(
    private http: HttpClient,
    private notifyService: NotificationService
  ) {}
  getOverViewData(): Observable<any> {
    return this.http
      .get('https://covid19.mathdro.id/api/countries/india/')
      .pipe(
        catchError((err) => {
          console.log(err);
          this.notifyService.showError(err);
          return err;
        })
      );
  }

  getStateWiseData(): Observable<any> {
    return this.http
      .get('https://covid19.mathdro.id/api/countries/india/confirmed')
      .pipe(
        catchError((err) => {
          console.log(err);
          this.notifyService.showError(err);
          return err;
        })
      );
  }
  getDailyData(): Observable<any> {
    return this.http.get('https://api.covid19india.org/states_daily.json').pipe(
      catchError((err) => {
        console.log(err);
        this.notifyService.showError(err);
        return err;
      })
    );
  }

  getTotalData(): Observable<any> {
    return this.http.get(' https://api.covidindiatracker.com/total.json').pipe(
      catchError((err) => {
        console.log(err);
        this.notifyService.showError(err);
        return err;
      })
    );
  }
  getStateDistrictWiseData(): Observable<any> {
    return this.http
      .get('https://api.covidindiatracker.com/state_data.json')
      .pipe(
        catchError((err) => {
          console.log(err);
          this.notifyService.showError(err);
          return err;
        })
      );
  }
  getDistrictWiseData(): Observable<any> {
    return this.http
      .get('https://api.covid19india.org/state_district_wise.json')
      .pipe(
        catchError((err) => {
          console.log(err);
          this.notifyService.showError(err);
          return err;
        })
      );
  }

  loginService(email: string, password: string): Observable<any> {
    let data = {
      email: email,
      password: password,
    };

    return this.http
      .post('http://zen-user-api.herokuapp.com/users/authenticate', data)
      .pipe(
        catchError((err) => {
          console.log(err);
          this.notifyService.showError(err.error.message);
          return err;
        })
      );
  }
  registerService(
    fname: string,
    lname: string,
    email: string,
    password: string
  ): Observable<any> {
    let data = {
      firstName: fname,
      lastName: lname,
      email: email,
      password: password,
    };
    return this.http
      .post('http://zen-user-api.herokuapp.com/users/register', data)
      .pipe(
        catchError((err) => {
          console.log(err.message);
          this.notifyService.showError(err.error.message);
          return err;
        })
      );
  }
}
