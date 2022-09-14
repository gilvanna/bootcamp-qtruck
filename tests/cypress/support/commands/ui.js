import loginPage from '../pages/Login'
import mapPage from '../pages/Map'

Cypress.Commands.add('uiLogin', (user) => {
    loginPage.go('-19.913794401449','-43.9121013879776')
    loginPage.form(user)
    loginPage.submit()

    mapPage.loggedUser(user.name)

})

Cypress.Commands.add('setGeolocation', (lat, long) => {
    localStorage.setItem('qtruck:latitude', lat)
    localStorage.setItem('qtruck:longitude', long)
})