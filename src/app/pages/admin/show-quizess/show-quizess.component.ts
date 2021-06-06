import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-quizess',
  templateUrl: './show-quizess.component.html',
  styleUrls: ['./show-quizess.component.css']
})
export class ShowQuizessComponent implements OnInit {

  constructor(private _quiz: QuizService) { }

  quizess:any = []

  ngOnInit(): void {

    this._quiz.getQuiz().subscribe(
      (data:any)=>{
        this.quizess = data;
      },(error)=>{
        Swal.fire('Error !', 'Error while loading data !','error');
      }
    );
  }

  deleteQuiz(quizId:any){
    Swal.fire({
      icon: 'info',
      title:'Are you sure want to delete?',
      confirmButtonText:'Delete',
      showCancelButton:true
    }).then((result)=>{
      if(result.isConfirmed){
        this._quiz.deleteQuiz(quizId).subscribe((data)=>{
          this.quizess = this.quizess.filter((x:any)=>x.quizid != quizId);
          Swal.fire("Success", "Quiz deleted Successfully! ", "success");
        },
        (error)=>{
          Swal.fire("Error", "Error while deleting Quiz! ", "error");
        }
        )
      }
    })
  }

}
