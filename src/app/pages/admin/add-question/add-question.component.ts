import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  public Editor = ClassicEditor;

  quizid:any;
  qTitle:any;
  question:any={
    quiz:{

    },
    content: '',
    option1 : '',
    option2 : '',
    option3 : '',
    option4 : '',
    answer : '',
  }

  constructor(private _route:ActivatedRoute, private _quizService:QuestionService) { }

  ngOnInit(): void {
    this.quizid = this._route.snapshot.params.quizid;
    this.qTitle = this._route.snapshot.params.title;
    this.question.quiz['quizid'] = this.quizid;
  }

  formSubmit(){
    if(this.question.content.trim() == '' || this.question.content == null){
      return;
    }

    if(this.question.option1.trim() == '' || this.question.option1 == null){
      return;
    }

    if(this.question.option2.trim() == '' || this.question.option2 == null){
      return;
    }

    this._quizService.addQuestionOfQuiz(this.question).subscribe(
      (data)=>{
        Swal.fire("Sucess","Question Added Successfully","success");

      },
      (error)=>{
        Swal.fire("Error","Error while adding Question","error");
      }
    );
  }

}
