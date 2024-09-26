
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

  it('marks tasks as completed', () => {
    cy.addTask('Go to the gym');
    cy.get('.todo-list li .toggle').click();
    cy.get('.todo-list li').should('have.class', 'completed');
  });
});


