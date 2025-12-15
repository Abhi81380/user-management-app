import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Authservice } from '../../../core/services/authservice';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-homecomponent',
  imports: [CommonModule, RouterModule,MatIconModule],
  templateUrl: './homecomponent.html',
  styleUrl: './homecomponent.scss',
})
export class Homecomponent {

    
    sidebarOpen = false;
    constructor(private auth: Authservice, private router: Router) {}
    get username(): string | null {
  return this.auth.getRole();
}

      toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
    isAdmin(): boolean {
    return this.auth.getRole() === 'admin';
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
