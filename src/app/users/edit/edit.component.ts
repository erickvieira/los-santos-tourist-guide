import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  async ngOnInit() {
    this.editing = false;

    this.editUserForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(5)
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(5)
      ]],
      categories: ['', [
        Validators.required
      ]],
      lat: ['', [
        Validators.required
      ]],
      lng: ['', [
        Validators.required
      ]],
      capability: ['', [
        Validators.required
      ]],
      ticket: ['', [
        Validators.required
      ]],
    });
    if (this.userServ.isAuthenticated()) {
      await this.router.navigateByUrl('/home');
    }
  }

  onEdit() {
    this.editing = true;
  }

  dismissModal() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

}
