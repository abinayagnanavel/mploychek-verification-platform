import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'Active' | 'Inactive';
  department: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  email = '';
  password = '';
  errorMessage = '';
  loading = false;
  currentUser: any = null;
  activeView = 'dashboard';
  searchTerm = '';
  showAddUser = false;
  newName = '';
  newEmail = '';
  newDepartment = 'Engineering';

  users: User[] = [
    { id: 1, name: 'Admin User', email: 'admin@mploychek.com', role: 'admin', status: 'Active', department: 'Administration' },
    { id: 2, name: 'General User', email: 'user@mploychek.com', role: 'user', status: 'Active', department: 'Engineering' },
    { id: 3, name: 'Priya Sharma', email: 'priya@example.com', role: 'user', status: 'Active', department: 'Human Resources' },
    { id: 4, name: 'Rahul Kumar', email: 'rahul@example.com', role: 'user', status: 'Inactive', department: 'Engineering' }
  ];

  constructor(private http: HttpClient) {}

  login(): void {
    this.errorMessage = '';
    this.loading = true;
    this.http.post<any>('http://localhost:5000/api/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: response => {
        this.loading = false;
        if (response.success) {
          this.currentUser = response;
          this.activeView = 'dashboard';
        }
      },
      error: error => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Login failed. Please try again.';
      }
    });
  }

  logout(): void {
    this.currentUser = null;
    this.email = '';
    this.password = '';
    this.activeView = 'dashboard';
  }

  get filteredUsers(): User[] {
    const term = this.searchTerm.toLowerCase();
    return this.users.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.department.toLowerCase().includes(term)
    );
  }

  addUser(): void {
    if (!this.newName.trim() || !this.newEmail.trim()) return;
    this.users.push({
      id: Math.max(0, ...this.users.map(user => user.id)) + 1,
      name: this.newName.trim(),
      email: this.newEmail.trim(),
      role: 'user',
      status: 'Active',
      department: this.newDepartment
    });
    this.newName = '';
    this.newEmail = '';
    this.newDepartment = 'Engineering';
    this.showAddUser = false;
  }

  toggleStatus(user: User): void {
    if (user.role !== 'admin') {
      user.status = user.status === 'Active' ? 'Inactive' : 'Active';
    }
  }
}
