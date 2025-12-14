import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboardcomponent',
  imports: [CommonModule, RouterModule,MatIconModule],
  templateUrl: './dashboardcomponent.html',
  styleUrl: './dashboardcomponent.scss',
})
export class Dashboardcomponent {


    stats = [
    { label: 'Total Users', value: 1200 },
    { label: 'Active Sessions', value: 87 },
    { label: 'Pending Tasks', value: 23 },
  ];


}
