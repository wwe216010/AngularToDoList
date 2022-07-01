import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  private list: Todo[] = [];

  constructor() { }

  add(title: string): void{
    if (title || title.trim()){

      let todo_data = new Todo();
      todo_data.Title = title;
      todo_data.IsComplete = false;

      this.list.push(todo_data);
    }
  }

  remove(idx: number): void{
    this.list.splice(idx, 1);
  }

  getList(): Todo[]{
    return this.list;
  }

  getWithCompleted(completed: boolean): Todo[]{
    return this.list.filter(c => c.IsComplete === completed)
  }

  removeCompleted(): void {
    this.list = this.getWithCompleted(false);
  }
}
