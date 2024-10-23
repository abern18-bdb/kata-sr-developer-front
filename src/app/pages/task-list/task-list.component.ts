import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { TaskService } from '../../core/services/task/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @ViewChild('loader') loaderRef!: ElementRef<HTMLBdbMlLoaderElement | any>;
  @ViewChild('modal') modalRef!: ElementRef<HTMLBdbMlModalElement | any>;

  tasks: any[] = [];
  token: string | null = localStorage.getItem('token');

  public tableData = {
    cols: [
      { colName: 'Id', control: 'text' },
      { colName: 'Titulo', control: 'text' },
      { colName: 'Descripcion', control: 'text' },
      { colName: 'Usuario', control: 'text' },
      { colName: 'Creado', control: 'text' },
      { colName: 'Actualizado', control: 'text' },
      { colName: '', control: 'action' },
      { colName: '', control: 'ico-action' },
    ],
    rows: [] as Array<Record<string, any>>,
  };

  public modalJson = {
    title: '',
    desc: '',
    optionsButtons: [{ id: '', value: '', task: '' }],
  };

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    if (this.token) {
      this.taskService.getTasks(this.token).subscribe(
        (data) => {
          data = data.map(item => {
            const rows = {} as any;
            const keys = Object.values(item)
            for (let i = 0; i < keys.length; i++) {
              rows['Simple' + i] = keys[i]
            }
            rows['action0'] = "true"
            rows['action1'] = "ico-delete"
            return rows
          })
          this.tableData.rows = data;
        },
        (error) => {
          console.error('Error al obtener tareas:', error);
        }
      );
    } else {
      console.error('No se encontró el token de autorización');
    }
  }

  editTask(event: any): void {
    if (event.detail.button === "action") {
      this.router.navigate(['/edit-task', event.detail.data.Simple0]);
    } else {
      this.modalJson = {
        title: 'Eliminar tarea',
        desc: '¿Estás seguro de que deseas eliminar esta tarea?',
        optionsButtons: [
          { id: '0', value: 'Confirmar', task: event.detail.data.Simple0 },
          { id: '1', value: 'Cancelar', task: 0 },
        ],
      };
      this.modalRef.nativeElement.openAlert();
    }
  }

  deleteTask(event: any): void {
    if (event.detail.id === '0') {
      if (this.token) {
        this.taskService.deleteTask(event.detail.task, this.token).subscribe(
          () => {
            this.loadTasks();
          },
          (error) => {
            console.error('Error al eliminar la tarea:', error);
          }
        );
      }
    }
  }

  createTask(): void {
    this.router.navigate(['/edit-task']);
  }

  goLogin(event: any) {
    this.loaderRef.nativeElement.openLoader();

    setTimeout(() => {
      localStorage.clear();
      this.router.navigate(['/login']);
      this.loaderRef.nativeElement.closeLoader();
    }, 2000);
  }
}
