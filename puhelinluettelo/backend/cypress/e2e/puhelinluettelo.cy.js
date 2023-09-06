describe('Puhelinluettelo', () => {
  it('front page is visible', () => {
    cy.visit('http://localhost:5003')
    cy.contains('Phonebook')
    cy.contains('filter shown with:')
  })

  it('add button can be clicked', function () {
    cy.visit('http://localhost:5003')
    cy.get('button[type="submit"]').click()

    cy.contains('Please enter a name and number').should('be.visible')
  })
})
