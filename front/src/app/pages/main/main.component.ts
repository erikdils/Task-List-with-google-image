import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})

export class MainComponent implements OnInit {

  taskList: any = [];      // Array<any>;
  titleInput: string;
  descriptionInput: string;

  constructor(private api: ApiService) { }

  async ngOnInit() {
    this.refreshTaskList()
  }

  async refreshTaskList() {
    this.taskList = await this.api.getTasks()
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

  async savePrice(i, card) {

    const fromServer = await this.api.newPrice(card._id, card.newPrice);
    this.refreshTaskList();
  }

  async done(i, _id) {
    const fromServer = await this.api.done(_id);
    this.refreshTaskList();
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
    await this.api.sendTask(task);
    this.refreshTaskList();
  };

  async delete(_id) {
    await this.api.delete(_id);
    this.refreshTaskList();
  };

  currentDate() {
    const date = new Date();
    return date.getDate() + ' ' + this.getMonthName(date);
  };

  getMonthName(date) {
    let monthName = '';
    const month = date.getMonth()
    if (month == 1) monthName = 'January';
    if (month == 2) monthName = 'February';
    if (month == 3) monthName = 'March';
    if (month == 4) monthName = 'April';
    if (month == 5) monthName = 'May';
    if (month == 6) monthName = 'June';
    if (month == 7) monthName = 'July';
    if (month == 8) monthName = 'August';
    if (month == 9) monthName = 'September';
    if (month == 10) monthName = 'October';
    if (month == 11) monthName = 'November';
    if (month == 12) monthName = 'December';

    return monthName
  };

}

// cors and cross domain access
