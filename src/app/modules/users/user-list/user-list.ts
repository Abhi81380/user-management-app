  import { ChangeDetectorRef, Component } from '@angular/core';

  import { Userservice } from '../../../core/services/userservice';
  import { Router, RouterLink, RouterModule } from '@angular/router';
  import { CommonModule } from '@angular/common';
  import { MatTableModule,MatTableDataSource  } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

  @Component({
    selector: 'app-user-list',
    imports: [RouterLink,CommonModule, MatTableModule,RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatProgressSpinnerModule],
    templateUrl: './user-list.html',
    styleUrl: './user-list.scss',
  })
  export class UserList {
     
       displayedColumns: string[] = ['id', 'name', 'email', 'action'];
  users: any[] = [];
  dataSource = new MatTableDataSource<any>([]);
  loading = true;

    constructor(private userService: Userservice,private cdRef: ChangeDetectorRef,private router:Router) {}


      ngOnInit(): void {
    this.fetchUsers();
  }
   fetchUsers(): void {
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.dataSource.data = Array.isArray(response) ? response : [];
        this.loading = false;
         this.cdRef.detectChanges(); 
        console.log('✅ Users loaded:', this.dataSource.data);
      },
      error: (err) => {
        this.loading = false;
        this.cdRef.detectChanges();
        console.error('❌ Failed to fetch users:', err);
      }
    });
  }
editUser(id: number): void {
  // ✅ Navigate to edit page with the selected user ID
  this.router.navigate(['/home/app-user-edit', id]);
  console.log(id)
}

    deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          // ✅ Instantly update the table
          this.dataSource.data = this.dataSource.data.filter((u: any) => u.id !== id);
        },
        error: (err) => {
          console.error('❌ Delete failed:', err);
        }
      });
    }
  }

}
