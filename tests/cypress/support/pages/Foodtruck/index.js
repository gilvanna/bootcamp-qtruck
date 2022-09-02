

class FoodTruckPage {
    addReview(review) {
        cy.get('textarea[name=comment]').type(review.comment)
        cy.get(`input[name=stars][value="${review.stars}"]`)
            .click({ force: true })
        cy.contains('button', 'Enviar avaliação').click()
    }

    checkPostedReview(user, review) {
        cy.get('.details strong')
            .should('have.text', user.name)
        cy.get
        cy.get('.comment')
            .should('have.text', review.comment)

        cy.get('.stars svg')
            .as('reviewStars')
            .its('length')
            .should('eq', review.stars)
    }
}

export default new FoodTruckPage()