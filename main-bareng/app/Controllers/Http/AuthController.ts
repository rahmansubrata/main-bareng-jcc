// import { Request } from '@adonisjs/http-server/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'
import { schema } from '@ioc:Adonis/Core/Validator'


export default class AuthController {

    public async register({request,response}: HttpContextContract){
        try {
            const payload = await request.validate(RegisterValidator)
            const newUser= await User.create({
                name: payload.name,
                password:payload.password,
                email:payload.email
            })
            return response.created({status:'registers success', data:newUser})
            
        } catch (error) {
            return response.unprocessableEntity({message : error.message})
            
        }
      
    }

    public async login({auth,request,response}:HttpContextContract){
        try {
            const loginSchema = schema.create({
                email: schema.string({trim:true}),
                password:schema.string({trim:true})
            })
            const paylod = request.validate({schema: loginSchema})
    
            const token = await auth.use('api').attempt((await paylod).email,(await paylod).password,{expiresIn: '7days'})
            return response.ok({status:'login success', data:token})
            
        } catch (error) {
            return response.badRequest({message : error.message})
        }
    }
}
