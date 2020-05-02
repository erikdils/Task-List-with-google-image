import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})

export class MainComponent implements OnInit {

  taskList: any = [];      // Array<any>;
  titleInput: string;
  descriptionInput: string;
  constructor(private http: HttpClient) { }

  async ngOnInit() {
    this.refreshTaskList()
  }

  async refreshTaskList() {
    this.taskList = await this.getTasks()
  }

  getTasks() {
    return this.http.get('http://localhost:3007/task').toPromise()
  }

  editPrice(i) {
    console.log(i)
    this.taskList[i][0].edit = true;
  }

  total() {
    let total = 0
    this.taskList.forEach((el) => {
      if (el[0].price) total += el[0].price
    })
    return total
  }

amounthInprogres() {
  return this.taskList.filter((t) => (!t[0].done) ? true : false).length
  };

 amounthDone() {
  return this.taskList.filter((t) => (!t[0].done) ? false : true).length
  };

  async add() {
    const task = {
      title: this.titleInput,
      description: this.descriptionInput
    }
    await this.sendTask(task);
    this.refreshTaskList();
  }

  sendTask(task) {
    return this.http.post('http://localhost:3007/task', task).toPromise();
  }



}

// cors and cross domain access
