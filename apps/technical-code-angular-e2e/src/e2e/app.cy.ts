import { getTodosForm, getTodosList } from "../support/app.po";

describe('technical-code-angular-e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('should display a todos-form', () => {
    const todoForm = getTodosForm()
    todoForm.should('be.visible')
  })

  it('should display a todos-list', () => {
    const todosList = getTodosList()
    todosList.should('be.visible')
  })

  it('should create a todo', () => {
    const todoForm = getTodosForm()
    todoForm.get('#todo-input').type('Test Todo')
    todoForm.get('#add-todo').click()

    const todosList = getTodosList()
    const firstTodo = todosList.get('div.todo').first()
    firstTodo.get('span.name').should('contain', 'Test Todo')
    firstTodo.get('mat-list-option').should('have.attr', 'aria-selected', 'false')
  });

  it('should update a todo', () => {
    const todoForm = getTodosForm()
    todoForm.get('#todo-input').type('Test Todo')
    todoForm.get('#add-todo').click()

    const todosList = getTodosList()
    const option = todosList.get('div.todo').first().find('mat-list-option')
    option.click()
    option.should('have.attr', 'aria-selected', 'true')
    option.click()
    option.should('have.attr', 'aria-selected', 'false')
  });

  it('should sort checked todos at the end', () => {
    const todoForm = getTodosForm()
    todoForm.get('#todo-input').type('Test Todo 1')
    todoForm.get('#add-todo').click()

    todoForm.get('#todo-input').type('Test Todo 2')
    todoForm.get('#add-todo').click()

    const todosList = getTodosList()
    const option = todosList.get('div.todo').first().find('mat-list-option')
    option.click()
    option.should('have.attr', 'aria-selected', 'true')

    const firstOption = todosList.get('div.todo').first().find('mat-list-option')
    firstOption.get('span.name').should('contain', 'Test Todo 2')
  });

  it('should display pending count', () => {

    getTodosList().get('mat-list-option').then($elements => {
      cy.get('.pending').should('contain',`${$elements.filter('[aria-selected="true"]').length} pending`)
    })
  })

  it('should filter todos', () => {
    const filters = cy.get('mat-button-toggle-group')

    filters.get('mat-button-toggle[value="pending"]').click()
    getTodosList().get('mat-list-option').should('have.attr', 'aria-selected', 'false');
    
    filters.get('mat-button-toggle[value="completed"]').click()
    getTodosList().get('mat-list-option').should('have.attr', 'aria-selected', 'true');    

  })

  it('should display delete button on hover', () => {
    const todosList = getTodosList()
    const firstTodo = todosList.get('div.todo').first()
    firstTodo.realHover()
    firstTodo.get('button[name="remove"]').should('be.visible')
  })

  it('should delete a todo', () => {
    const todosList = getTodosList()
    const firstTodo = todosList.get('div.todo').first()
    firstTodo.should('exist')
    firstTodo.find('button[name="remove"]').click()
    firstTodo.should('not.exist')
  })

});
