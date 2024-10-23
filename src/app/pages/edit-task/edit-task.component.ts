import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/core/services/task/task.service';



@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  @ViewChild('loader') loaderRef!: ElementRef<HTMLBdbMlLoaderElement>;

  task: any = { title: '', description: '' };
  token: string | null = localStorage.getItem('token');
  id: number = 0;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = +id;
    }
  }

  getTitle(event: Event) {
    const detail = (event as CustomEvent).detail;
    this.task.title = detail.value;
  }

  getDescription(event: Event) {
    const detail = (event as CustomEvent).detail;
    this.task.description = detail.value;
  }

  saveTask(): void {
    if (this.token) {
      if (this.id) {
        this.taskService.updateTask(this.id, this.task, this.token).subscribe(
          () => {
            this.router.navigate(['/tasks']);
          },
          (error) => {
            console.error('Error al actualizar la tarea:', error);
          }
        );
      } else {
        this.taskService.createTask(this.task, this.token).subscribe(
          () => {
            this.router.navigate(['/tasks']);
          },
          (error) => {
            console.error('Error al crear la tarea:', error);
          }
        );
      }
    }
  }

  goLogin(event: any) {
    this.loaderRef.nativeElement.openLoader();

    setTimeout(() => {
      localStorage.clear();
      this.router.navigate(['/login']);
      this.loaderRef.nativeElement.closeLoader();
    }, 2000);
  }

  goBack() {
    this.router.navigate(['/tasks'])
  }
}
