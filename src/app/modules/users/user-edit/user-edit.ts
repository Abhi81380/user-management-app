import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Userservice } from '../../../core/services/userservice';

@Component({
  selector: 'app-user-edit',
  imports: [ CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.scss',
})
export class UserEdit {

  userId!: number;
  user = { firstName: '', lastName: '', email: '' };

  constructor(
    private userService: Userservice,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // ✅ Get user ID from URL (e.g., /home/app-user-edit/3)
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.userId = +idParam;
      this.loadUser();
    } else {
      this.snackBar.open('⚠️ Invalid user ID.', 'Close', {
        duration: 2500,
        panelClass: ['warn-snackbar'],
      });
      this.router.navigate(['/home/app-user-list']);
    }
  }


  // ✅ Load existing user data
  loadUser(): void {
    this.userService.getUserById(this.userId).subscribe({
      next: (data:any) => {
        this.user = data;
        this.cdRef.detectChanges(); 
      },
      error: (err:any) => {
        console.error('❌ Failed to load user:', err);
        this.snackBar.open('❌ Could not load user details.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
        this.router.navigate(['/home/app-user-list']);
      },
    });
  }


  // ✅ Update user details
  updateUser(): void {
    if (!this.user.firstName || !this.user.lastName || !this.user.email) {
      this.snackBar.open('⚠️ Please fill all fields.', 'Close', {
        duration: 2500,
        panelClass: ['warn-snackbar'],
      });
      return;
    }

    this.userService.updateUser(this.userId, this.user).subscribe({
      next: (res) => {
        console.log('✅ User updated:', res);
        this.snackBar.open('✅ User updated successfully!', 'Close', {
          duration: 2500,
          panelClass: ['success-snackbar'],
        });

        setTimeout(() => {
          this.router.navigate(['/home/app-user-list']);
        }, 400);
      },
      error: (err) => {
        console.error('❌ Error updating user:', err);
        this.snackBar.open('❌ Failed to update user. Try again.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  // ✅ Cancel edit and go back
  cancel(): void {
    this.router.navigate(['/home/app-user-list']);
  }

}
