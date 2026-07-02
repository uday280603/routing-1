import { Component } from '@angular/core';
import { AuthService } from './shared/service/auth.service';
import { Route, Router } from '@angular/router';
import { SanckbarService } from './shared/service/snackbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'routing-1';

  constructor(private _authservice : AuthService ,
    private _router : Router,
    private _sanckbar : SanckbarService
  ){}

  onLogOut(){
    this._authservice.logout().subscribe({
      next : data =>{
        this._sanckbar.openSnackbar(data.msg);
        this._router.navigate([''])

      }
    })

  }
}
