import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { LoginComponent } from '../login.component';
import { LoginService } from '../login.service';
import { NgForm } from '@angular/forms';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  constructor(private modalController: ModalController,
              private loginService: LoginService,
              private navCtrl: NavController,
              private alertService: AlertService
  ) { }

  ngOnInit() {
  }
  // Dismiss Register Modal
  dismissRegister() {
    this.modalController.dismiss();
  }
  // // On Login button tap, dismiss Register modal and open login Modal
  // async loginModal() {
  //   this.dismissRegister();
  //   const loginModal = await this.modalController.create({
  //     component: LoginComponent,
  //   });
  //   return await loginModal.present();
  // }
  register(form: NgForm) {
    this.loginService
        .register(form.value.name, form.value.email, form.value.password)
        .subscribe(
        data => {
          this.loginService.login(
              form.value.email, form.value.password
          ).subscribe(data => {},
              error => {
                console.log(error);
              },
              () => {
                this.dismissRegister();
                this.navCtrl.navigateRoot('/home');
              }
          );
          this.alertService.presentToast(data['message']);
        },
        error => {
          console.log(error);
        },
        () => {

        }
    );
  }

}
