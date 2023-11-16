import { first } from 'rxjs';
import { Todo } from '../models';
import { TodoComponent } from './todo.component';

describe('TodoComponent', () => {
  it('should create', () => {
    const component = new TodoComponent()
    expect(component).toBeTruthy();
  });

  it('should emit when delete a todo', (done) => {
    const component = new TodoComponent()
    component.remove.pipe(first()).subscribe(() => {
      done();
    })
    component.removeTodo()
  });

  it('should emit when update a todo and reset the form', (done) => {
    const component = new TodoComponent()
    component.todo = {
      id: '0',
      name: 'Test Todo',
      check: false
    }
    component['name'].setValue('Updated Todo')
    component.update.pipe(first()).subscribe(todo => {
      expect(todo).toEqual({
        ...todo,
        name: 'Updated Todo'
      })
      done();
    })
    component.closeEditionMode(true)
  });
});
