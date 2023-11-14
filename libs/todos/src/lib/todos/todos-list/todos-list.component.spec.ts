import { first, of } from 'rxjs';
import { TodosListComponent } from './todos-list.component';
import { MatSelectionListChange } from '@angular/material/list';

describe('TodosListComponent', () => {
  it('should create', () => {
    const component = new TodosListComponent()
    expect(component).toBeTruthy();
  });

  it('should emit when update todo', () => {
    const component = new TodosListComponent()
    component._$todos = of([{
      id: '0',
      check: false,
      name: 'Test Todo'
    }])
    component.update.pipe(first()).subscribe(id => {
      expect(id).toBe('0')
    })
    component['select']({ options: [ { value: '0' }] } as MatSelectionListChange)
  });

  it('should emit when remove todo', () => {
    const component = new TodosListComponent()
    component._$todos = of([{
      id: '0',
      check: false,
      name: 'Test Todo'
    }])
    component.remove.pipe(first()).subscribe(id => {
      expect(id).toBe('0')
    })
    component['removeTodo']('0')
  });
});
