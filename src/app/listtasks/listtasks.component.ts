import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { ListtasksService } from './listtasks.service'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-listtasks',
  templateUrl: './listtasks.component.html',
  styleUrls: ['./listtasks.component.css']
})
export class ListtasksComponent implements OnInit {

  taskDetails: any;
  searchMessage:string="none";
  searchValue:string="";
  searchdisabled:boolean=false;
  searchText:string;

  constructor(private commonService: CommonService, private listTasksservice: ListtasksService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadtaskDetails();
  }

  loadtaskDetails() {
    this.listTasksservice.loadTaskDetails().subscribe(succ => {
      this.taskDetails = succ;
      console.log(this.taskDetails);
    });
  }

}
