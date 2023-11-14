import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Todo } from '../models';

@Component({
  selector: 'technical-code-angular-todo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule , MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {
  @Output() add = new EventEmitter<Todo>();

  protected name = new FormControl('', [Validators.required])

  addTodo(): void {
    this.add.emit({
      id: new Date().toString(),
      check: false,
      name: this.name.value || ''
    })
    this.name.reset()
  }
}
