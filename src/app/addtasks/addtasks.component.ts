import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import {AddtasksService} from './addtasks.service';
@Component({
  selector: 'app-addtasks',
  templateUrl: './addtasks.component.html',
  styleUrls: ['./addtasks.component.css']
})
export class AddtasksComponent implements OnInit {

  taskTypes=[];
  task={};
  websites=[];
  task_type;
  task_website;
  task_title;
  task_startDate;
  task_endDate;
  task_link;
  task_remarks;
  alert: string = "none";
  alertSuccess: string = "none";
  message: string = "";


  constructor(private commonService: CommonService,private router:Router,
    private addtasksService:AddtasksService ) { 
    this.tasktypes();
    this.taskwebsites();
  }

  ngOnInit() {
    
  }

  tasktypes( )
  {
    
    var obj={}
    this.addtasksService.gettasktypes(obj).subscribe((data)=>{
            this.taskTypes = data;
      console.log(data)
    },
    (error)=>{
      console.log(error);
    });

  }

  taskwebsites( )
  {
    
    var obj={}
    this.addtasksService.gettaskwebsites(obj).subscribe((data)=>{
            this.websites = data;
      console.log(data)
    },
    (error)=>{
      console.log(error);
    });

  }

  saveAsset(form:NgForm): void {
    console.log('Task details', this.task);

    this.task_type=form.value.taskType;
    this.task_website=form.value.website;
    this.task_title=form.value.tasktitle;
    this.task_startDate=form.value.startDate;
    this.task_endDate=form.value.endDate;
    this.task_link=form.value.link;
    this.task_remarks = form.value.remarks;

    this.addtasksService.saveTask(this.task).subscribe(suc => {
      console.log('After Saving', suc);
      form.resetForm();
      this.alertSuccess ="block";
      this.message = "Task Successfully Added";
    },
      err => {
        console.log(err);
      });
  }
  
  


}
