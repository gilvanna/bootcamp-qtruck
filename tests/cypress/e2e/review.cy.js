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
            comment: 'O sanduíche de mortadela é o melhor!',
            stars: 4
        }

        cy.apiCreateUser(user)
        cy.apiLogin(user)
        cy.apiCreateFoodTruck(foodtruck)

        cy.uiLogin(user)

        mapPage.goToFoodTruck(foodtruck.name)
        foodTruckPage.addReview(review)
        foodTruckPage.checkPostedReview(user, review)

    })

    it.only('deve checar se campos de avaliação estão vazios antes de nova avaliação', () => {
        const user = {
            name: 'Phoebe Buffay',
            instagram: '@phoebe',
            password: 'pwd123'
        }

        const foodtruck = {
            latitude: '-19.91343125759656',
            longitude: '-43.91203165054322',
            name: 'Kids~Kids!',
            details: 'Pra você comer e rir',
            opening_hours: 'das 14h as 18h',
            open_on_weekends: false
        }

        const review = {
            comment: 'Poderia tratar melhor os gatinhos da rua.',
            stars: 2
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