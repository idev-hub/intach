import {Context} from "vk-io";
import {getCustomRepository} from "typeorm";
import {User} from "../entities/User";
import {UserRepository} from "../repositories/UserRepository";

/**
 * Проверяет существование пользователя в текущей сессий, если не находит запрашивает информацию о нем в базе данных
 * @param _ctx {Context} Context
 * @returns {Promise<User>} Пользователь
 **/
export const isLogin = async (_ctx: Context): Promise<User> => {

    if (_ctx.session.user) return _ctx.session.user

    const userRepository = await getCustomRepository(UserRepository)
    const user = await userRepository.find({peerId: _ctx.senderId})
    return user || null

}
