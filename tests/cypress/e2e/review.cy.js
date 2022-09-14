import mapPage from '../support/pages/Map'
import foodTruckPage from '../support/pages/Foodtruck'

describe('Avaliações', () => {

    it('deve enviar uma nova avaliação', () => {

        cy.fixture('review').as('userReview')

        cy.get('@userReview').then((data) => {
            cy.apiCreateUser(data.user)
            cy.apiLogin(data.user)
            cy.apiCreateFoodTruck(data.foodtruck)

            cy.uiLogin(data.user)

            mapPage.goToFoodTruck(data.foodtruck.name)
            foodTruckPage.addReview(data.review)
            foodTruckPage.checkPostedReview(data.user, data.review)

        })
    })

    it('deve checar se campos de avaliação estão vazios antes de nova avaliação', () => {
        var user = {
            name: 'Phoebe Buffay',
            instagram: '@phoebe',
            password: 'pwd123'
        }

        var foodtruck = {
            latitude: '-19.91343125759656',
            longitude: '-43.91203165054322',
            name: 'Kids~Kids!',
            details: 'Pra você comer e rir',
            opening_hours: 'das 14h as 18h',
            open_on_weekends: false
        }

        var review = {
            comment: 'Poderia tratar melhor os gatinhos da rua.',
            stars: 4
        }

        cy.apiCreateUser(user)
        cy.apiLogin(user)
        cy.apiCreateFoodTruck(foodtruck)

        cy.uiLogin(user)

        mapPage.goToFoodTruck(foodtruck.name)
        foodTruckPage.addReview(review)
        foodTruckPage.checkPostedReview(user, review)

        foodTruckPage.checkEmptyReviewFields(review)

    })
})