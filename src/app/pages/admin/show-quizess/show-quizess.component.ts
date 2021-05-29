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
        console.log(data);
      },(error)=>{
        Swal.fire('Error !', 'Error in loading data !','error');
      }
    );
  }

}
