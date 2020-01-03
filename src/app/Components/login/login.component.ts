import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/Services/general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;

  constructor(private service: GeneralService, private router: Router) {
    if (sessionStorage.getItem('user')) {
      this.router.navigateByUrl('/administrador');
    }
  }

  ngOnInit() {}

  login() {
    this.service.loginUser(this.username, this.password).subscribe(
      respuesta => {
        if (respuesta.status == 'ok') {
          sessionStorage.setItem('user', this.username);
          sessionStorage.setItem('ssap', this.password);
          this.router.navigateByUrl('/administrador');
        } else {
          console.log(respuesta.message);
        }
      },
      error => {
        console.error('Error al iniciar sesión', error);
      }
    );
  }
}
