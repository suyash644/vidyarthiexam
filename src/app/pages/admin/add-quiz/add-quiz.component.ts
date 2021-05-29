import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  category:any = [{
    categoryid: 23,
    title : "Java Programing",
  },{
    categoryid:24,
    title:"Math"
  }]

  constructor() { }

  ngOnInit(): void {
  }

}
