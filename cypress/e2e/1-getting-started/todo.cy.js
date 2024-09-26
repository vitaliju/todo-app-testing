
const pageUrl = "https://todolist.james.am/"


describe('Website loads elements correctly', () => {
  beforeEach(() => {
    cy.visit(pageUrl)
  });

  it('displays To Do List form on load', () => {
    cy.contains('h1', 'To Do List');
  });

  it('displays input field on load', () => {
    cy.get('input.new-todo').should('exist').and('be.visible');
  });

  it('displays an empty input field', () => {
    cy.get('input.new-todo').should('have.value', '');
  });

  it('displays the correct placeholder text', () => {
    cy.get('input.new-todo').should('have.attr', 'placeholder', "What need's to be done?");
  });

  it('should allow writing text', () => {
    cy.get('input.new-todo').type('Wash the car').should('have.value', 'Wash the car');
  });
});
describe('Adding new tasks', () => {
  beforeEach(() => {
    cy.visit(pageUrl)
  });

  it('adds a new task', () => {
    cy.addTask('Go to the gym');
    cy.shouldContainTask('Go to the gym');
  });

  it('task persist after page reload', () => {
    cy.addTask('Go to the gym');
    cy.shouldContainTask('Go to the gym');
    cy.reload();
    cy.shouldContainTask('Go to the gym');
  });

  it('displays only active tasks', () => {
    cy.addTask('Go to the gym');
    cy.get('.todo-list li .toggle').click();
    cy.get('.todo-list li').should('have.class', 'completed');
    cy.addTask('Wash the car');
    cy.get('a[href="#/active"]').click();
    cy.get('.todo-list li').should('contain', 'Wash the car');
  });

  it('displays all tasks if "All" is clicked', () => {
    cy.addTask('Go to the gym');
    cy.get('.todo-list li .toggle').click();
    cy.addTask('Wash the car');
    cy.addTask('Go shopping');
    cy.get('a[href="#/"]').click();
    cy.get('.todo-list li').should('have.length', 3);
    cy.get('.todo-list li').should('contain', 'Go to the gym');
    cy.get('.todo-list li').should('contain', 'Wash the car');
    cy.get('.todo-list li').should('contain', 'Go shopping');
  });

  it('marks task as completed', () => {
    cy.addTask('Go to the gym');
    cy.get('.todo-list li .toggle').click();
    cy.get('.todo-list li').should('have.class', 'completed');
  });

  it('marks all tasks as completed', () => {
    cy.addTask('Go to the gym');
    cy.addTask('Wash the car');
    cy.addTask('Go shopping');
    cy.get('#toggle-all').check({ force: true });
    cy.get('.todo-list li .toggle').should('be.checked');
    cy.get('.todo-list li').should('have.class', 'completed');
  });

  it('deletes a task from the list if button X is clicked', () => {
    cy.addTask('Go shopping');
    cy.get('button.destroy').click({ force: true });
    cy.get('.ng-scope').should('not.contain', 'Go shopping');
  });

  it('does not deletes uncompleted tasks if "Clear" button is clicked', () => {
    cy.addTask('Go to the gym');
    cy.addTask('Wash the car');
    cy.contains('Clear').click();
    cy.get('.todo-list li').should('have.length', 2);
    cy.get('.todo-list li').first().should('contain', 'Go to the gym');
    cy.get('.todo-list li').last().should('contain', 'Wash the car');
  });

  it('deletes completed tasks if "Clear" button is clicked', () => {
    cy.addTask('Go shopping');
    cy.get('.todo-list  li .toggle').click();
    cy.contains('Clear').click();
    cy.addTask('Wash the car');
    cy.get('.todo-list li').should('contain', 'Wash the car').and('not.contain', 'Go shopping');
  });

  it('can edit task that is in the list', () => {
    cy.addTask('Go to the gym');
    cy.shouldContainTask('Go to the gym');
    cy.get('.todo-list li label').dblclick();
    cy.get('input.edit').type('Go shopping{enter}');
    cy.shouldContainTask('Go shopping');
  });
});


