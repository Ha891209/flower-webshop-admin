import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  async onLogin(): Promise<void> {
    try {
      const user = await this.auth.login(this.user).toPromise();
      if (user) {
        this.router.navigate(['/']);
      }
    } catch {
      alert('Sikertelen bejelentkezés!');
    }
  }

}
