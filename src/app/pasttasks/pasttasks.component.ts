import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { PasttasksService } from './pasttasks.service'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-pasttasks',
  templateUrl: './pasttasks.component.html',
  styleUrls: ['./pasttasks.component.css']
})
export class PasttasksComponent implements OnInit {

  taskDetails: any;
  searchMessage:string="none";
  searchValue:string="";
  searchdisabled:boolean=false;
  searchText:string;

  constructor(private commonService: CommonService, private pastTasksservice: PasttasksService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadtaskDetails();
  }

  loadtaskDetails() {
    this.pastTasksservice.loadpastTaskDetails().subscribe(succ => {
      console.log(succ);
      this.taskDetails = succ;
      console.log(this.taskDetails);
    });
  }
}
