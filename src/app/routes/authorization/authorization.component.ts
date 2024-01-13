import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss'
})
export class AuthorizationComponent {
constructor(private router: Router) {
  const token = localStorage.getItem('token') as string
  const user: any = jwtDecode(token);

  if (user.roleName === 'User')  {
    this.router.navigate(['/app/user/team-score'])
  }
}
}
