import { CustomValidator } from './../../../validators/custom.validator';
import { DataService } from './../../../services/data.service';
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Secutiry } from 'src/app/utils/security.util';
import { Router } from '@angular/router';

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
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.configureFormGroup();
  }

  ngOnInit() {
    const token = Secutiry.getToken();
    if (token) {
      this.busy = true;
      this.service.refreshToken().subscribe(
        (data: any) => {
          this.busy = false;
          this.setUser(data.customer, data.token);
        },
        (err) => {
          localStorage.clear();
          this.busy = false;
        }
      );
    }
  }

  submit() {
    this.busy = true;
    this.service
      .authenticate(this.form.value)
      .subscribe(
        (data: any) => {
          this.busy = false;
          this.setUser(data.customer, data.token);
        },
        (err) => {
          console.error(err);
          this.busy = false;
        }
      );
  }

  setUser(user, token) {
    Secutiry.set(user, token);
    this.router.navigate(["/"]);
  }

  private configureFormGroup() {
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.minLength(14),
        Validators.maxLength(14),
        Validators.required,
        CustomValidator.isCpf()
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    });
  }
}
