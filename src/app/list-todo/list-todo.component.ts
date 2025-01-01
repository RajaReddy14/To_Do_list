import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateTodoComponent } from '../create-todo/create-todo.component';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css']
})
export class ListTodoComponent implements OnInit {
  tasks: Array<any> = [];

  constructor(private todoService: TodoService, private modal: NgbModal){

  }
  ngOnInit(): void {
    let tasks = localStorage.getItem('tasks');
    if(tasks) {
      this.tasks = JSON.parse(tasks)
    }
  }
  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.todoService.saveTasks(this.tasks);
  }
  addTask(taskData: any) {
    this.tasks.push(taskData);
    this.todoService.saveTasks(this.tasks);
  }
  onEdit(index: any){
    const ref = this.modal.open(CreateTodoComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg', // Default sizes: 'sm', 'lg', 'xl'
      centered: true, // Center the modal
      backdrop: 'static', // Prevent closing by clicking outside
    });
    ref.componentInstance.isEdit = true;
    ref.componentInstance.todoData = this.tasks[index];

    ref.result.then(res => {
      if(res && res.data) {
        this.tasks[index] = res.data;
        this.todoService.saveTasks(this.tasks);
      }
    })

  }

  onCreate() {
    const ref = this.modal.open(CreateTodoComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg', // Default sizes: 'sm', 'lg', 'xl'
      centered: true, // Center the modal
      backdrop: 'static', // Prevent closing by clicking outside

    });
    ref.result.then(res => {
      if(res && res.data) {
        this.addTask(res.data);
        this.todoService.saveTasks(this.tasks);
      }
    })
  }
}
