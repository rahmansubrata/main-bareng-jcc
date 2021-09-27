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

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(()=>{
  Route.resource('venues', 'VenuesController').apiOnly().middleware({'*':['auth']})
  Route.resource('venues.fields', 'FieldsController').apiOnly().middleware({'*':['auth']})
  Route.resource('field.bookings','BooksController').apiOnly().middleware({'*':['auth']})
  Route.put('/bookings/:id','BooksController.join').as('booking.join').middleware(['auth'])
  Route.put('/bookings/:id/unjoin','BooksController.unjoin').as('booking.unjoin').middleware(['auth'])
  Route.get('/schedule','BooksController.showlogin').as('schedule').middleware(['auth'])
}).prefix('/api/v1')

Route.group(()=>{
  Route.post('/register','AuthController.register')
  Route.post('/login','AuthController.login')
}).prefix('/api/v1')
Route.get('/api/hello', 'TestsController.hello')

