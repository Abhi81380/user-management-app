import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Userservice } from '../../../core/services/userservice';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-user-add',
  imports: [CommonModule,FormsModule,RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
     MatSnackBarModule
  ],
  templateUrl: './user-add.html',
  styleUrl: './user-add.scss',
})
export class UserAdd {
  user = { firstName: '', lastName: '', email: '' };

    constructor(private userService: Userservice, private router: Router,private snackBar: MatSnackBar) {}


   saveUser(): void {
    if (!this.user.firstName || !this.user.lastName || !this.user.email) {
      this.snackBar.open('⚠️ Please fill all fields.', 'Close', {
        duration: 2500,
        panelClass: ['warn-snackbar'],
      });
      return;
    }

    this.userService.addUser(this.user).subscribe({
      next: (newUser) => {
        // ✅ Show Material Snackbar success message
        this.snackBar.open('✅ User added successfully!', 'Close', {
          duration: 2500,
          panelClass: ['success-snackbar'],
        });

        // ✅ Delay navigation slightly to ensure backend JSON save completes
        setTimeout(() => {
          this.router.navigate(['/home/app-user-list']);
        }, 400);
      },
      error: (err) => {
        console.error('❌ Error adding user:', err);
        this.snackBar.open('❌ Failed to add user. Try again.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      }
    });
  }



}
