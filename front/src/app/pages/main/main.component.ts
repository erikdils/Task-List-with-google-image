import { HttpClient } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})

export class MainComponent implements OnInit {

  taskList: any;      // Array<any>;
  constructor(private http: HttpClient) { }

  async ngOnInit() {
    this.taskList = await this.getTasks()
    console.log(this.taskList);
  }

  getTasks() {
    return this.http.get('http://localhost:3007/task').toPromise()
  }

  editPrice(i) {
    console.log(i)
    this.taskList[i][0].edit = true;
  }


}

// cors and cross domain access
