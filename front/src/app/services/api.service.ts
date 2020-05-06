import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})


export class ApiService {

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get('http://localhost:3007/task').toPromise()
  };

  sendTask(task) {
    return this.http.post('http://localhost:3007/task', task, httpOptions).toPromise();
  };

  newPrice(_id, price) {
    return this.http.put('http://localhost:3007/task-price', {_id, price}, httpOptions).toPromise();
  };

  done(_id) {
    return this.http.put('http://localhost:3007/task-done', { _id }, httpOptions).toPromise();
  };

}
