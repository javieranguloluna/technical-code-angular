import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Todo, TodoFormComponent, TodosListComponent } from '@technical-code-angular/todos';
import { TodosService } from '../todos.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'technical-code-angular-todos',
  standalone: true,
  imports: [CommonModule, TodoFormComponent, TodosListComponent],
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent {

  public $todos: Observable<Todo[]>

  constructor(private todosService: TodosService) {
    this.$todos = this.todosService.getTodos()
  }

  addTodo(todo: Todo): void {
    this.todosService.addTodo(todo)
  }

  updateTodo(id: string): void {
    this.todosService.updateTodo(id)
  }

  removeTodo(id: string): void {
    this.todosService.removeTodo(id)
  }
}
