import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';

import { TodoComponent } from '../todo/todo.component';
import { Todo } from '../models';
import { Observable, map, of } from 'rxjs';

@Component({
  selector: 'technical-code-angular-todos-list',
  standalone: true,
  imports: [CommonModule, MatListModule, TodoComponent, MatButtonToggleModule],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss'
})
export class TodosListComponent implements OnInit {

  @Input('todos') _$todos!: Observable<Todo[]>

  @Output() remove = new EventEmitter<string>()
  @Output() update = new EventEmitter<string>()

  private $todos: Observable<Todo[]> = of([])
  protected $todosToShow: Observable<Todo[]> = of([])
  protected pending: Observable<number> = of(0)


  ngOnInit(): void {
    this.$todos= this._$todos.pipe(
      map(todos => sortChecked(todos))
    )

    this.$todosToShow = this.$todos

    this.pending = this._$todos.pipe(
      map(todos => todos.filter(f => !f.check).length)
    )
  }

  protected filter(change: MatButtonToggleChange): void {
    switch (change.value) {
      case 'all': this.$todosToShow = this.$todos; break;
      case 'pending': this.$todosToShow = this.$todos.pipe(map(t => t.filter(f => !f.check))); break;
      case 'completed': this.$todosToShow = this.$todos.pipe(map(t => t.filter(f => f.check))); break;
    
      default:
        break;
    }
  }

  protected select(change: MatSelectionListChange): void {
    change.options.forEach(op => {
      this.update.emit(op.value)
    })
  }


  protected removeTodo(id: string): void {
    this.remove.emit(id)
  }
}

function sortChecked (todos: Todo[]): Todo[] {
  return todos.sort((a, b) => (a.check === b.check) ? 0 : a.check ? 1 : -1)
}
