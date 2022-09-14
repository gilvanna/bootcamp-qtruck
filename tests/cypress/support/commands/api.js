import loginPage from '../pages/Login'
import mapPage from '../pages/Map'

Cypress.Commands.add('apiLogin', (user) => {
    cy.request({
        url: 'http://localhost:3333/sessions',
        method: 'POST', 
        body: user
    }).then(response => {
        expect(response.status).to.eql(200)
        Cypress.env('token', response.body.token)
    })
})

Cypress.Commands.add('apiResetUser', (instagram) => {
    cy.request({
        url: 'http://localhost:3333/helpers-reset',
        method: 'DELETE',
        qs: { instagram: instagram }
    }).then(response => {
        expect(response.status).to.eql(204)
    })
})

Cypress.Commands.add('apiCreateUser', (payload) => {
    cy.apiResetUser(payload.instagram)

    cy.request({
        url: 'http://localhost:3333/signup',
        method: 'POST',
        body: payload
    }).then(response => {
        expect(response.status).to.eql(201)
    })

})

Cypress.Commands.add('apiCreateFoodTruck', (payload) => {
    cy.request({
        url: 'http://localhost:3333/foodtrucks',
        method: 'POST',
        headers: {
            'Authorization': Cypress.env('token')
        },
        body: payload
    }).then(response => {
        expect(response.status).to.eql(201)
    })
})