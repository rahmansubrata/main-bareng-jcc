import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Venue from 'App/Models/Venue'
import Field from 'App/Models/Field'
import { Request, Response } from '@adonisjs/http-server/build/standalone'

export default class FieldsController {
  public async index ({}: HttpContextContract) {
  }

  public async store ({params,request,response}: HttpContextContract) {
    const venue=await Venue.findByOrFail('id',params.venue_id)
    console.log(venue)
    const newField= new Field()
    newField.name=request.input('name')
    newField.type=request.input('type')
    await newField.related('venues').associate(venue)
    return response.ok({status:'berhasil menambahkan data field baru', data:newField})

  }

  public async show ({params,request,response}: HttpContextContract) {
    const field = await Field.query().where('id',params.id).preload('booking',
    (bookingquery)=>bookingquery.select(['title','play_date_start','play_date_end'])).firstOrFail()

    return response.ok({message:'succes', data:field})

  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}
