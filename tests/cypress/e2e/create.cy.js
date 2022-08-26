import mapPage from '../support/pages/Map'
import createPage from '../support/pages/Create'

describe('Recomendação', () => {


    it('deve recomendar um food truck', () => {

        const user = {
            name: 'Heisenberg',
            instagram: '@heisenberg',
            password: 'pwd123'
        }

        const foodtruck = {
            latitude: '-19.924451293436803',
            longitude: '-43.92247617244721',
            name: 'Los pocos hermanos',
            details: 'Onde você pode comprar comida mexicana baseada em frango e otras coisitas mas',
            opening_hours: 'das 14h às 20h',
            open_on_weekends: false
        }

        cy.apiCreateUser(user)
        cy.uiLogin(user)

        mapPage.createLink()
        createPage.form(foodtruck)
        createPage.submit()

        createPage.modal.haveText('Food truck cadastrado com sucesso!')

    })
})