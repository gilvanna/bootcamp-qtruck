import mapPage from '../support/pages/Map'

describe('Recomendação', () => {


    it('deve recomendar um food truck', () => {

        const user = {
            name: 'Heisenberg',
            instagram: '@heisenberg',
            password: 'pwd123'
        }

        const foodtruck = {
            name: 'Los pocos hermanos',
            details: 'Onde você pode comprar comida mexicana baseada em frango e otras coisitas mas',
            opening_hours: 'das 14h às 20h'
        }

        cy.apiCreateUser(user)
        cy.uiLogin(user)

        mapPage.createLink()



        cy.wait(3000)


    })
})