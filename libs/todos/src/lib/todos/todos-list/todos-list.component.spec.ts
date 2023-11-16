import { first, of } from 'rxjs';
import { TodosListComponent } from './todos-list.component';
import { MatSelectionListChange } from '@angular/material/list';
import { Todo } from '../models';

describe('TodosListComponent', () => {
  it('should create', () => {
    const component = new TodosListComponent()
    expect(component).toBeTruthy();
  });

  it('should emit when select a todo', (done) => {
    const component = new TodosListComponent()
    const todo: Todo = {
      id: '0',
      check: false,
      name: 'Test Todo'
    }
    component._$todos = of([todo])
    component.update.pipe(first()).subscribe(updatedTodo => {
      expect(updatedTodo).toEqual({
        ...todo,
        check: !todo.check
      });
      done();
    })
    component['select']({ options: [ { value: todo }] } as MatSelectionListChange)
  });

  it('should emit when remove todo', (done) => {
    const component = new TodosListComponent()
    component._$todos = of([{
      id: '0',
      check: false,
      name: 'Test Todo'
    }])
    component.remove.pipe(first()).subscribe(id => {
      expect(id).toBe('0')
      done()
    })
    component['removeTodo']('0')
  });
});
