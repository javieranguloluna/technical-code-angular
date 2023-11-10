import { TodosService } from './todos.service';
import { Todo } from '@technical-code-angular/todos';
import { BehaviorSubject } from 'rxjs';

describe('TodosService', () => {
  let service: TodosService;
  let todosSubject: BehaviorSubject<Todo[]>;
  let initialTodos: Todo[];

  beforeEach(() => {
    initialTodos = [
      { id: '1', check: true, name: 'Do something important' }
    ];

    todosSubject = new BehaviorSubject<Todo[]>(initialTodos);

    service = new TodosService();

    jest.spyOn(todosSubject, 'asObservable').mockReturnValue(todosSubject);

    service['$todos'] = todosSubject;
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });


  it('should return the todos as an Observable', (done) => {
    service.getTodos().subscribe((todos) => {
      expect(todos).toEqual(initialTodos);
      done();
    });
  });

  it('should add a todo', () => {
    const newTodo: Todo = { id: '3', check: false, name: 'New todo' };
    service.addTodo(newTodo);
    expect(todosSubject.value).toContain(newTodo);
  });

  it('should update a todo', () => {
    const todoId: string = '1';
    service.updateTodo(todoId);
    expect(todosSubject.value.find(f => f.id === todoId)?.check).toEqual(false);
  });

  it('should remove a todo', () => {
    const todoToRemoveId = '1';
    service.removeTodo(todoToRemoveId);
    expect(todosSubject.value).not.toContainEqual(
      initialTodos.find((todo) => todo.id === todoToRemoveId)
    );
  });

});
