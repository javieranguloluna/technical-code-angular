import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Todo } from '../models';

import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'technical-code-angular-todo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  @Input() todo!: Todo;
  @Output() update = new EventEmitter<Todo>();
  @Output() remove = new EventEmitter<void>();

  protected editionMode = false
  protected name = new FormControl('', [Validators.required])

  ngOnInit(): void {
    this.name.setValue(this.todo.name)
  }

  edit(): void {
    this.name.setValue(this.todo.name)
    this.editionMode = true
  }

  closeEditionMode(submit: boolean): void {
    if (submit) this.update.emit({
      ...this.todo,
      name: this.name.value || this.todo.name
    })
    this.editionMode = false
    this.name.reset()
  }

  removeTodo(): void {
    this.remove.emit()
  }

  blockEvent(e: any) {
    e.stopPropagation()
  }
}
