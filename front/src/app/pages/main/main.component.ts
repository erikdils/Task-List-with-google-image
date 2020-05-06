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
  }


}

// cors and cross domain access
