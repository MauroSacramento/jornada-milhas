import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required]]
    })
  }

  login(){
    const email = this.loginForm.value.email;
    const senha = this.loginForm.value.senha;

    console.log(email, senha)
    this.authService.autenticar(email, senha).subscribe({
      next: (response) => {
        console.log(response);

        this.router.navigate(['home']);
      },
      error: (err) => {
        console.log('Erro no login')
        this.router.navigate(['home']);
      }
    })
  }
}
