import mapPage from '../support/pages/Map'
import foodTruckPage from '../support/pages/Foodtruck'

describe('Avaliações', () => {
    it('deve enviar uma nova avaliação', () => {

        const user = {
            name: 'Joey Tribianni',
            instagram: '@joey',
            password: 'pwd123'
        }

        const foodtruck = {
            latitude: '-19.91355734930648',
            longitude: '-43.91143888235093',
            name: 'Sanduíches do Joey',
            details: 'Os melhores sanduíches',
            opening_hours: 'das 15h as 18h',
            open_on_weekends: false
        }

        const review = {
            comment: 'O sanduíche de mortadela é o melhor! Porém o preço é um pouco fora da realidade',
            stars: 4
        }

        cy.apiCreateUser(user)
        cy.apiLogin(user)
        cy.apiCreateFoodTruck(foodtruck)

        cy.uiLogin(user)

        mapPage.goToFoodTruck(foodtruck.name)
        foodTruckPage.addReview(review)

    })
})