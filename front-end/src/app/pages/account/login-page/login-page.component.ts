import { DataService } from './../../../services/data.service';
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styles: ["./login-page.component.css"]
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;
  public busy = false;

  constructor(
    private service: DataService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.configureFormGroup();
    this.refreshTokenIfExists();
  }

  submit() {
    this.busy = true;
    this.service
      .authenticate(this.form.value)
      .subscribe(
        (data: any) => {
          localStorage.setItem("petshop.token", data.token);
          this.busy = false;
        },
        (err) => console.error(err)
      );
  }

  private configureFormGroup() {
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.minLength(14),
        Validators.maxLength(14),
        Validators.required,
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    });
  }

  private refreshTokenIfExists() {
    const token = localStorage.getItem("petshop.token");
    if (token) {
      this.service
        .refreshToken()
        .subscribe(
          (data: any) => localStorage.setItem("petshop.token", data.token),
          (err) => localStorage.clear()
        );
    }
  }
}
