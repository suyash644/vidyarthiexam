import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private _route:ActivatedRoute, private _quiz:QuizService, private _cat:CategoryService, private _routeer:Router) { }

  quizId = 0;
  quizData:any;
  category:any;

  ngOnInit(): void {
    this.quizId = this._route.snapshot.params.quizid;
    this._quiz.getQuizById(this.quizId).subscribe((data)=>{
      this.quizData = data;
      console.log(this.quizData);
    },
    (error)=>{
      console.log("error");
    });

    this._cat.getAllCategories().subscribe(
      (data)=>{
        this.category = data;
      },
      (error)=>{
        console.log("Error occured");
      }
    );
  }

  updateQuiz(){
    this._quiz.updateQuiz(this.quizData).subscribe(
      (data)=>{
        Swal.fire("Success","Quiz updated successfully! ", "success");
        this._routeer.navigate(["admin/quizess"])
      },
      (error)=>{
        Swal.fire("Error", "Error while updating the quiz! ", "error");
      }
    );
  }

}
