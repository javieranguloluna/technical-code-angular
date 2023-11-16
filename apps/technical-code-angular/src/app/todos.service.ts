import { Injectable } from '@angular/core';
import { Todo } from '@technical-code-angular/todos';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  // Mocked api data using BehavourSubject
  private $todos: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([
    {
      id: '1',
      check: true,
      name: 'Do something important'
    },
    {
      id: '2',
      check: false,
      name: 'Do something'
    }
  ])

  public getTodos(): Observable<Todo[]> {
    return this.$todos.asObservable()
  }

  public addTodo(todo: Todo):void {
    this.$todos.next([
      todo,
      ...this.$todos.value
    ])
  }

  public updateTodo(todo: Todo): void {
    this.$todos.next(this.$todos.value.map(td => td.id === todo.id
      ? todo
      : td
    ))
  }

  public removeTodo(id: string): void {
    this.$todos.next(this.$todos.value.filter(f => f.id !== id))
  }

}
