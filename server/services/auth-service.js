const UserModel = require('../models/user-model');
const ActivationLinkModel = require('../models/activation-link-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');
class AuthService {
    async registration(email, password){
        const isUnique = (await UserModel.findOne({email})) == null
        if(!isUnique){
            throw  ApiError.BadRequest(`Email ${email} must to be unique`)
        }
        const hashPassword = await bcrypt.hash(password, 3);

        const activationLink = uuid.v4();

        const user = await UserModel.create({email, password: hashPassword, roles: ["USER"]})

        const userDto =  new UserDto(user)

        await  ActivationLinkModel.create({user: userDto.id, activationLink})

        const link = `${process.env.API_URL}:${process.env.PORT}/api/auth/activate/${activationLink}`;
        await mailService.sendActivationMail(email, link)

        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {
            ...tokens, user: userDto
        }
    }

    async activate(activationLink){
        const link = await ActivationLinkModel.findOne({activationLink})
        if(!link) throw  ApiError.BadRequest("Activation link is incorrect")
        const user = await UserModel.findById(link.user);
        user.isActivated = true;
        await user.save();

        await ActivationLinkModel.deleteOne({activationLink})
    }

    async login(email, password) {
        const user = await UserModel.findOne({email})

        if(!user) throw ApiError.BadRequest("User not found")


        const isPasswordEquals = await bcrypt.compare(password, user.password)
        if(!isPasswordEquals) throw ApiError.BadRequest("Incorrect password")


        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)


        return {
            ...tokens, user: userDto
        }

    }

    async logout(refreshToken) {
        return (await tokenService.removeToken(refreshToken));
    }

    async refresh(refreshToken) {
        if(!refreshToken) throw ApiError.UnauthorizedError()

        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if(!userData || !tokenFromDb){
            throw ApiError.UnauthorizedError();
        }

        const user = await UserModel.findById(userData.id)
        const userDto = new UserDto(user)

        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }


}
module.exports = new AuthService()
