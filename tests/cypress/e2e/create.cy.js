import mapPage from '../support/pages/Map'
import createPage from '../support/pages/Create'

describe('Recomendação', () => {


    it('deve recomendar um food truck', () => {

        const user = {
            name: 'Ross Geller',
            instagram: '@ross',
            password: 'pwd123'
        }

        const foodtruck = {
            latitude: '-19.91430885381262',
            longitude: '-43.91131281852723',
            name: 'Jurassic Park',
            details: 'Venha experimentar hamburgueres jurássicos!',
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
            latitude: '-19.91279575384851',
            longitude: '-43.91061544418336',
            name: 'Seven',
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
            name: 'Chandler',
            instagram: '@chandler',
            password: 'pwd123'
        }

        const foodtruck = {
            latitude: '-19.913461519616114',
            longitude: '-43.9113074541092',
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