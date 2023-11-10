import { TodosService } from '../todos.service';
import { TodosComponent } from './todos.component';

describe('TodosComponent', () => {

  const todoService = new TodosService()

  it('should create', () => {
    const component = new TodosComponent(todoService)
    expect(component).toBeTruthy();
  });

  it('should have todos', () => {
    const component = new TodosComponent(todoService)
    expect(component.$todos).toBeTruthy()
  });
});
