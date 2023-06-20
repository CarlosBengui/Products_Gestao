/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'


//Users routes
Route.group(() => {
  Route.get('/', async () => {
    return {hallo:'Estou aqui users'}
  })

  Route.post('/login', 'UsersController.login')
  Route.post('/store', 'UsersController.store')
  Route.get('/logout', 'UsersController.logOut').middleware(['auth'])
  Route.get('/showUser/:id', 'UsersController.showUser').middleware(['auth'])
  Route.get('/show', 'UsersController.show').middleware(['auth'])
  Route.get('/delete/:id', 'UsersController.delete').middleware(['auth'])

}).prefix('/users')


//produts routes
Route.group(() => {
  Route.get('/', async () => {
    return {hallo:'Estou aqui produts'}
  }).middleware(['auth'])

  Route.get('/show', 'ProdutsController.show').middleware(['auth'])
  Route.get('/showProduts/:id', 'ProdutsController.showProductsByUser').middleware(['auth'])
  Route.get('/delete/:id', 'ProdutsController.delete').middleware(['auth'])
  Route.post('/store', 'ProdutsController.store').middleware(['auth'])
  Route.post('/update/:id', 'ProdutsController.updateProduct').middleware(['auth'])

}).prefix('/produts')
