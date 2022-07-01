import { Component, Input, OnInit } from '@angular/core';
import { TodoListService } from './todo-list.service'
import { Todo } from './todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  //todo = ""; //for ngModel雙向綁定

  constructor(private _serviceTodoList: TodoListService) { }

  ngOnInit(): void {

  }
  
  addTodo(inputRef:any): void {

    let todo = inputRef.value.trim();

    if (todo) {
      this._serviceTodoList.add(todo);
      inputRef.value = '';
    }
  }

  removeToDo(idx: number):void {
    this._serviceTodoList.remove(idx);
  }

/**
 * 開始編輯待辦事項
 *
 * @param {Todo} todo
 * @memberof TodoListComponent
 */
  editToDo(todo:Todo): void{    
    todo.setEditMode = true
    console.log(`todo.setEditMode==>${todo.EditMode}`)
  }


  /**
   * 焦點離開 & 按下Enter後，重新set EditMode，重新判斷是否需要於<li>加上class editing
   * @param todo 
   * @param title 
   * @returns 
   */
  editingToDo(todo: Todo, title:string): void{
    if (!todo.getEditMode){
      return;
    }

    if (title)
    {
      todo.Title = title;
      todo.setEditMode = false;
    }
    else  
    {
      window.alert('如果沒有名稱則刪除該項待辦事項');
    }
  }

  /**
   * 取消編輯
   * @param todo 
   */
  cancelEditingToDo(todo: Todo): void{
    todo.setEditMode = false;
  }

  getList(): Todo[] {
    return this._serviceTodoList.getList();
  }

}
