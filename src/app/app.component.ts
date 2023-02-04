import { Component, OnInit } from '@angular/core';
import { Validators, FormArray, FormBuilder } from '@angular/forms';
import { ValidarorServiceService } from './services/validaror-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ValidarorServiceService]
})
export class AppComponent implements OnInit {
  genders = ['male', 'female', 'other'];

  signUpForm = this.fb.group({
    userData: this.fb.group({
      username: ['', [Validators.required, this.castomValidator.isForbiddenNames.bind(this.castomValidator)]],
      email: ['', [Validators.required, Validators.email], [this.castomValidator.emailValidator]]
    }),
    gender: ['male', [Validators.required]],
    hobbies: this.fb.array([])
  });


  constructor(
    private fb: FormBuilder,
    private castomValidator: ValidarorServiceService) {}

  ngOnInit() {

    // this.signUpForm = new FormGroup({
    //   userData: new FormGroup({
    //     username: new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
    //     email: new FormControl(null, [Validators.required, Validators.email]),
    //   }),
    //   gender: new FormControl('male', Validators.required),
    //   hobbies: new FormArray([])
    // })
  }

  onSubmit() {
    console.log(this.signUpForm.value)

    this.signUpForm.reset()
  }

  onHobbies() {
    this.hobbiesControl.push(this.fb.control(''));
  }

  get hobbiesControl() {
    return this.signUpForm.get('hobbies') as FormArray;
  }
}
