import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Venue from 'App/Models/Venue'
import Field from 'App/Models/Field'
import VenueValidator from 'App/Validators/VenueValidator'


export default class VenuesController {
  public async index ({response,request}: HttpContextContract) {
    let venues = await Venue.query().preload('fields')
    return response.ok({status:'succes', data:venues})
  }

  public async store ({request,response}: HttpContextContract) {
    try {
      const payload = await request.validate(VenueValidator)
      const newVenue= await Venue.create({
          name: payload.name,
          address:payload.address,
          phone:payload.phone
      })
       return response.created({status:'registers success', data:newVenue})
    } catch (error) {
      return response.unprocessableEntity({message : error.message})    
    }
  }

  public async show ({params,response}: HttpContextContract) {
    let venue = await Venue.query().where('id',params.id).preload('fields').firstOrFail()
    return response.ok({message:'success',data:venue})
  }

  public async update ({request,response,params}: HttpContextContract) {
    const paylod = await request.validate(VenueValidator)
    let updated = await Venue.updateOrCreate({id:params.id},paylod)
    return response.ok({status:'success',data:updated})
  }

  public async destroy ({request,response,params}: HttpContextContract) {
    let venue = await Venue.findByOrFail('id',params.id)
    await venue.delete()
    return response.ok({message:'success',data:'deleted'})
  }

}
