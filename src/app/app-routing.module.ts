import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: 'edit-task/:id', component: EditTaskComponent },
  { path: 'edit-task', component: EditTaskComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
