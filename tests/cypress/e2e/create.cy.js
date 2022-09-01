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

    it('não deve cadastrar foodtruck com o nome duplicado', () => {
        const user = {
            name: 'Monica',
            instagram: '@monica',
            password: 'pwd123'
        }

        const foodtruck = {
            latitude: '-19.924355470348786',
            longitude: '-43.92172515392304',
            name: 'Food Truck da Monica Geller',
            details: 'Pratos sofisticados e deliciosos! I KNOW!',
            opening_hours: 'das 18h as 22h',
            open_on_weekends: false
        }

        cy.apiCreateUser(user)
        cy.apiLogin(user)
        cy.apiCreateFoodTruck(foodtruck)

        cy.uiLogin(user)

        mapPage.createLink()
        createPage.form(foodtruck)
        createPage.submit()

        createPage.modal.haveText('Esse food truck já foi cadastrado!')

    })

    it('todos os campos são obrigatórios', () => {

        const user = {
            name: 'Joey',
            instagram: '@joey',
            password: 'pwd123'
        }

        const foodtruck = {
            latitude: '-19.913582567636404',
            longitude: '-43.91160786151887',
        }

        cy.apiCreateUser(user)
        cy.uiLogin(user)

        mapPage.createLink()
        cy.setGeolocation(foodtruck.latitude, foodtruck.longitude)
        createPage.submit()

        const message = 'Os campos nome, descrição e horário de funcionamento devem ser informados para recomendar um food truck!'

        createPage.modal.haveText(message)

    })
})