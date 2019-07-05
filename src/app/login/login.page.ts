import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { InteractionService } from '../services/interaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private userServ: UserService,
    private intServ: InteractionService,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(5)
      ]]
    });
    if (this.userServ.isAuthenticated()) {
      await this.router.navigateByUrl('/home');
    }
  }

  async login() {
    const loading = await this.intServ.presentGenericLoading();
    const { email, password } = this.loginForm.value;
    try {
      const userData = await this.userServ.login(email, btoa(password)).toPromise();
      localStorage.setItem('currentUser', JSON.stringify(userData));
      loading.dismiss();
      await this.router.navigateByUrl('/home');
      window.location.reload();
    } catch (error) {
      loading.dismiss();
      this.intServ.presentGenericAlert({
        header: 'Oops!',
        subHeader: 'Can\'t log in',
        message: 'Incorrect e-mail or password'
      });
    }
  }

}
