import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService :UserService, private snack:MatSnackBar) { }

  ngOnInit(): void {
  }

  public user={
    userName:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:''
  }

  formSubmit(){
    if(this.user.userName == '' || this.user.userName == null){
      this.snack.open("Username s required!!","cancel",{
        duration:3000,
        // verticalPosition:'top',
        // horizontalPosition:'right'
      });
      return;
    }
    this.userService.addUser(this.user).subscribe(
      (data:any) => {
        //succes
        // alert("success");
        // this.snack.open("Register succesfully", "cancel",{
        //   duration:3000
        // });
        Swal.fire("Sucess done !!", "User with usernam " + data.userName + " Registred","success" );
      },
      (error)=>{
        //error
        // alert("someting went wrong");
        this.snack.open("Something went wrong", "cancel",{
          duration : 3000
        })
      }
    );
  }

}
