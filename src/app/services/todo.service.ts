import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  saveTasks(tasks: any) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
