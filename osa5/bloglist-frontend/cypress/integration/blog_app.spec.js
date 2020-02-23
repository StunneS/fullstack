describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Tester',
      username: 'test',
      password: 'sala'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('Login')
  })

  describe('Login', function(){
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('sala')
      cy.get('#login').click()
      cy.get('#logout').click()
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('salasana')
      cy.get('#login').click()

      cy.get('.error').contains('wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('test')
      cy.get('#password').type('sala')
      cy.get('#login').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#author').type('Tester McTester')
      cy.get('#title').type('How To Test?')
      cy.get('#url').type('www.tested.com')
      cy.get('#subblog').click()
      cy.get('.success').contains('added')
      cy.contains('How To Test?, Tester McTester')
    })
    it('A blog can be liked', function() {
      cy.contains('new blog').click()
      cy.get('#author').type('Tester McTester')
      cy.get('#title').type('How To Test?')
      cy.get('#url').type('www.tested.com')
      cy.get('#subblog').click()

      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes 1')
    })
    it('A blog can be deleted', function() {
      cy.contains('new blog').click()
      cy.get('#author').type('Tester McTester')
      cy.get('#title').type('How To Test?')
      cy.get('#url').type('www.tested.com')
      cy.get('#subblog').click()

      cy.contains('view').click()
      cy.contains('remove').click()
      cy.contains('view').should('not.exist')
    })
    it.only('Blogs are in the most liked order', function() {
      cy.get('#toggle').click()
      cy.get('#author').type('Tester McTester')
      cy.get('#title').type('How To Test?')
      cy.get('#url').type('www.tested.com')
      cy.get('#subblog').click()
      cy.contains('view').click()

      cy.get('#toggle').click()
      cy.get('#author').type('Second Time')
      cy.get('#title').type('How To Like?')
      cy.get('#url').type('www.getLiked.com')
      cy.get('#subblog').click()
      cy.contains('view').click()

      cy.get('#toggle').click()
      cy.get('#author').type('Ka Boom')
      cy.get('#title').type('How To Boomer?')
      cy.get('#url').type('www.booms.com')
      cy.get('#subblog').click()
      cy.contains('view').click()

      cy.contains('tested').contains('like').click()
      cy.contains('getLiked').contains('like').click()
      cy.contains('getLiked').contains('like').click()
      cy.contains('booms').contains('like').click()
      cy.contains('booms').contains('like').click()
      cy.contains('booms').contains('like').click()
      cy.contains('booms').contains('3')

      cy.get('#bloglist').get('.blog:first').contains('Ka Boom')

      cy.contains('getLiked').contains('like').click()
      cy.contains('getLiked').contains('like').click()
      cy.contains('getLiked').contains('4')

      cy.get('#bloglist').get('.blog:first').contains('getLiked')
      cy.get('#bloglist').get('.blog:last').contains('tested')
    })
  })
})
