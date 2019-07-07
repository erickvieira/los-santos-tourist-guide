import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { InteractionService } from 'src/app/services/interaction.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {

  editing: boolean;
  editUserForm: FormGroup;

  constructor(
    public modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private userServ: UserService,
    private intServ: InteractionService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.editing = false;

    this.editUserForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(5)
      ]],
      email: ['', [
        Validators.required,
        Validators.minLength(5)
      ]]
    });
    if (this.userServ.isAuthenticated()) {
      await this.router.navigateByUrl('/home');
    }
  }

  onEdit() {
    this.editing = true;
  }

  async onSave() {
    const loading = await this.intServ.presentGenericLoading();
    const { name, email } = this.editUserForm.value;
    // @TODO
    const user = new User(name, email);
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
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

}
