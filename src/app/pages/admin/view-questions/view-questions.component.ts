import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {

  quizid:any;
  qTitle:any;
  questions:any = [];

  constructor(private _route:ActivatedRoute, private _question:QuestionService, private _snack:MatSnackBar) { }

  ngOnInit(): void {
    this.quizid = this._route.snapshot.params.quizid;
    this.qTitle = this._route.snapshot.params.title;
    this._question.getQuestionOfQuiz(this.quizid).subscribe(
      (data: any)=>{
        console.log(data);
        this.questions = data;
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  deleteQuestion(questionid:any){
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure want to delete this question?',
    }).then((result) => {
      if(result.isConfirmed){
        this._question.deleteQuestionById(questionid).subscribe(
          (data)=>{
            this._snack.open('Question deleted','',{
              duration:3000,
            });
            this.questions = this.questions.filter((q:any)=>q.questionid != questionid);
          },
          (error)=>{
            Swal.fire("Error","Some error while deleting Question","error");
          }
        );
      }
    });

  }

}
