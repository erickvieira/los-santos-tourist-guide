import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InteractionService } from '../services/interaction.service';
import { UserService } from '../services/user.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userServ: UserService,
    private intServ: InteractionService,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
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

  async register() {
    const loading = await this.intServ.presentGenericLoading();
    const { name, email, password } = this.registerForm.value;
    const user = new User(name, email, btoa(password));
    try {
      const userData = await this.userServ.register(user).toPromise();
      loading.dismiss();
      await this.router.navigateByUrl('/login');
      window.location.reload();
    } catch (error) {
      loading.dismiss();
      this.intServ.presentGenericAlert({
        header: 'Oops!',
        subHeader: 'Can\'t register you',
        message: 'Ops. Something goes wrong'
      });
    }
  }

  dismissModal() {
    this.router.navigate(['/']);
  }

}
