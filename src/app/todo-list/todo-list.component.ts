import { Component, Input, OnInit } from '@angular/core';
import { TodoListService } from './todo-list.service'
import { Todo } from './todo.model';
import { TodoStatusType } from './todo-status-type.enum'

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todoStatus = TodoStatusType;//for Template綁定
  private status = TodoStatusType.All;

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

    let list: Todo[] = [];
    switch(this.status){
      case TodoStatusType.All :
        list = this._serviceTodoList.getList();
        break;      
      case TodoStatusType.Active :
        list = this.getRemainingList();
        break;
      case TodoStatusType.Completed :
        list = this.getCompletedList();
        break;
    }

    return list;
  }

  getRemainingList(): Todo[]{
    return this._serviceTodoList.getWithCompleted(false)
  }

  getCompletedList(): Todo[] {
    return this._serviceTodoList.getWithCompleted(true);
  }

  removeCompleted(): void{
    this._serviceTodoList.removeCompleted();
  }

  setStatus(status: number): void{
    this.status = status
  }

  checkStatus(status: number): boolean{
    return this.status === status;
  }

  getListWithoutStatus():Todo[]{
    return this._serviceTodoList.getList();
  }

  /**
   * 所有項目是否皆已經完成
   * @returns 
   */
  allCompleted(): boolean{
    return this.getListWithoutStatus().length === this.getCompletedList().length
  }

  setAllTo(completed: boolean): void{
    this.getListWithoutStatus().forEach(c => c.IsComplete = completed);
  }
}
