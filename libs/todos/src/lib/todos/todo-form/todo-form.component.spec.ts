import { first } from 'rxjs';
import { TodoFormComponent } from './todo-form.component';
import { Todo } from '../models';

describe('TodoFormComponent', () => {
  it('should create', () => {
    const component = new TodoFormComponent()
    expect(component).toBeTruthy();
  });
  it('should emit new todo when clicked and reset the form', (done) => {
    const component = new TodoFormComponent()
    component['name'].setValue('Test Todo')
    component.add.pipe(first()).subscribe((todo: Todo) => {
      expect(todo.name).toBe('Test Todo')
      setTimeout(() => {
        expect(component['name'].value).toBe(null)
        done()
      },500)
    })
    component.addTodo()
  });
});
