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

    userName = 'Abhinand';
    sidebarOpen = false;


    constructor(private auth: Authservice, private router: Router) {}

      toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }


  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
