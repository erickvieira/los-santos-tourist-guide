import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
// import { RegisterPage } from '../register/register.page';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { AlertService } from './alert.service';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(
      private modalController: ModalController,
      private loginService: LoginService,
      private navCtrl: NavController,
      private alertService: AlertService
  ) { }

  ngOnInit() {}

  dismissLogin() {
    this.modalController.dismiss();
  }

  async registerModal() {
    this.dismissLogin();
    const registerModal = await this.modalController.create({
    component: RegisterComponent
    });
    return await registerModal.present();
  }

  login(form: NgForm) {
    this.loginService.login(form.value.email, form.value.password).subscribe(
        data => {
          this.alertService.presentToast('Logged In');
        },
        error => {
          console.log(error);
        },
        () => {
          this.dismissLogin();
          this.navCtrl.navigateRoot('/home');
        }
    );
  }
}