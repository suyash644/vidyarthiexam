import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  category:any = [];
  quizData = {
    'title' : '',
    'description':'',
    'maxMarks':'',
    'numberOfQuestion':'',
    'active':false,
    'category':{
      'categoryid':''
    }
  }

  constructor(private _cat:CategoryService, private _snack:MatSnackBar, private _quiz:QuizService) { }

  ngOnInit(): void {
    this._cat.getAllCategories().subscribe((data:any)=>{
      this.category = data;
    },
    (error)=>{
      Swal.fire("Error!","Error while get call","error");
    })
  }

  addQuiz(){
    if(this.quizData.title == null || this.quizData.title.trim()==''){
      this._snack.open("Title Required! ", '',{
        duration:3000
      });
      return;
    }

    this._quiz.addQuiz(this.quizData).subscribe(
      (data)=>{
        Swal.fire("Success","Quiz Added Successfully! ", "success");
      },
      (error)=>{
        Swal.fire("Error","Quiz Add Error! ", "error");
      }
    )
  }

}
