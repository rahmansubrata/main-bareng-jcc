import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Booking from 'App/Models/Booking'
import Field from 'App/Models/Field'
import User from 'App/Models/User'
import Venue from 'App/Models/Venue'
import FormbookingValidator from 'App/Validators/FormbookingValidator'

export default class BooksController {
   /**
* @swagger
* /api/v1/field/:field_id/bookings:
*   get:
*     tags:
*       - booking
*     summary: Sample API
*     parameters:
*       - field_id: name
*         description: Name of the user
*         in: query
*         required: false
*         type: number
*     responses:
*       200:
*         description: Send hello message
*         example:
*           message: Hello Guess
*/
  public async index ({response,request}: HttpContextContract) {
    let booking = await Booking.query().preload('bookingUser').preload('players').preload('field')
    // let venus = new Venue()
    // let booking2 = new Booking()
    // Booking.$getRelation('author').setRelated(venus, booking2)
    return response.ok({status:'succes', data:booking})
  }

  public async store ({request,response,params,auth}: HttpContextContract) {
    //cara 1
    const field = await Field.findByOrFail('id',params.field_id)
    const user=auth.user!
    const payload = await request.validate(FormbookingValidator)
    const booking= new Booking()
    booking.playDateStart = payload.play_date_start
    booking.playDateEnd = payload.play_date_end
    booking.title = payload.title
    let data=await user.related('myBooking').save(booking)
    let data2= await booking.related('field').associate(field)
    console.log(data,data2)
    return response.created({status:'success', data:booking})

    }

  public async show ({params,response,request}: HttpContextContract) {
    console.log(params.id)
    const booking=await Booking.query().where('id',params.id).preload('players').withCount('players').firstOrFail()
    return response.ok({status : 'success', data:booking})
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({params,response }: HttpContextContract) {
    const booking = await Booking.findOrFail(params)
    await booking.delete()
    return response.ok({status:'succes', data:'successfully join'})

  }
  public async join ({response,params,request,auth}: HttpContextContract) {
    const booking= await Booking.firstOrFail(params.id)
    let user=auth.user!
    console.log(booking)
    await booking.related('players').attach([user.id])
    return response.ok({status:'succes', data:'successfully join'})
  }
  public async unjoin ({response,params,request,auth}: HttpContextContract) {
    const booking= await Booking.firstOrFail(params.id)
    let user=auth.user!
    console.log(booking)
    await booking.related('players').detach([user.id])
    return response.ok({status:'succes', data:'successfully unjoin'})
  }
  public async showlogin ({response,params,request,auth}: HttpContextContract) {
    let user=auth.user?.id
    const booking=await User.query().where('id',user).preload('myBooking')
    return response.ok({status:'succes', data:booking})
  }
}
