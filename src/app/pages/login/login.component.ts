import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData={
    userName:'',
    password:''
  }

  constructor(private snack:MatSnackBar, private login : LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  formSubmit(){

    if(this.loginData.userName.trim()=='' || this.loginData.userName == null){
      this.snack.open("userName is required!",'cancel',{
        duration : 3000
      })
      return;
    }

    if(this.loginData.password.trim()=='' || this.loginData.password == null){
      this.snack.open("password is required!",'cancel',{
        duration : 3000
      })
      return;
    }
    //request server to genertate token
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log('success');
        console.log(data);

        //login...
        this.login.loginUser(data.token);

        this.login.getCurrentLoggedIn().subscribe((user: any) => {
          this.login.setUser(user);
          console.log(user);
          //redirect ...ADMIN: admin-dashboard
          //redirect ...NORMAL:normal-dashboard
          if (this.login.getUserRole() == 'ADMIN') {
            //admin dashboard
            // window.location.href = '/admin';
            this.router.navigate(['admin']);
            this.login.loginStatusSubject.next(true);
          } else if (this.login.getUserRole() == 'NORMAL') {
            //normal user dashbaord
            // window.location.href = '/user-dashboard';
            this.router.navigate(['userdashboard']);
            this.login.loginStatusSubject.next(true);
          } else {
            this.login.logout();
          }
        });
      },
      (error) => {
        console.log('Error !');
        console.log(error);
        this.snack.open('Invalid Details !! Try again', '', {
          duration: 3000,
        });
      }
    );
    

  }

}
