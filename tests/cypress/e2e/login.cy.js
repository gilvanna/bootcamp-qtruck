import loginPage from '../support/pages/Login'
import mapPage from '../support/pages/Map'

describe('login', () => {
  it('deve logar com sucesso', () => {

    const user = {
      name: 'Farofa',
      instagram: '@farofa',
      password: 'farofeiro15'
    }

    loginPage.go()
    loginPage.form(user)
    loginPage.submit()

    mapPage.loggedUser(user.name)
  })

  it('não deve logar com senha inválida', () => {
    const user = {
      name: 'Farofa',
      instagram: '@farofa',
      password: 'senha123'
    }

    loginPage.go()
    loginPage.form(user)
    loginPage.submit()

    loginPage.modal.haveText('Credenciais inválidas, tente novamente!')
  })

  it('não deve logar com instagram inexistente', () => {
    const user = {
      name: 'Farofa',
      instagram: '@farofeiro',
      password: 'farofeiro15'
    }

    loginPage.go()
    loginPage.form(user)
    loginPage.submit()

    loginPage.modal.haveText('Credenciais inválidas, tente novamente!')
  })

  it('instagram deve ser obrigatório', () => {
    const user = {
      password: 'farofeiro15'
    }

    loginPage.go()
    loginPage.form(user)
    loginPage.submit()

    loginPage.modal.haveText('Por favor, informe o seu código do Instagram!')
  })

  it('senha deve ser obrigatória', () => {
    const user = {
      instagram: '@farofa'
    }

    loginPage.go()
    loginPage.form(user)
    loginPage.submit()
    loginPage.modal.haveText('Por favor, informe a sua senha secreta!')

  })

  it('todos os campos são obrigatórios', () => {
    loginPage.go()
    loginPage.submit()

    loginPage.modal.haveText('Por favor, informe suas credenciais!')
  })

})
