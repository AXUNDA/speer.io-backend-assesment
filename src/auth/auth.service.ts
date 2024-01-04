import UserModel from '../db/user.model';
import * as argon2 from 'argon2';
import CustomError from '../common/utils/customError';

import { omit } from 'lodash';
import jwtService from './jwt.service';
import { authDto } from '../common/dto/auth.dto';

class auth {
	constructor(
		private readonly jwt = jwtService,
		private readonly hasher = argon2,
		private readonly User = UserModel
	) {}

	async login(dto: authDto) {
		const user = await this.User.findOne({ email: dto.email });
		if (!user) throw new CustomError('no user with this email', 404);
		const status = await argon2.verify(user!.password, dto.password);
		if (!status) throw new CustomError('invalid credentials', 401);
		const cleaned_data = this.cleanup(user);
		const token = await this.jwt.sign(cleaned_data);
		return {
			data: { ...cleaned_data },
			token,
		};
	}
	async signup(dto: authDto) {
		try {
			const hash = await this.hasher.hash(dto.password);
			const newUser = await this.User.create({
				password: hash,
				email: dto.email,
			});
			const cleaned_data = this.cleanup(newUser);
			const token = await this.jwt.sign(cleaned_data);
			return {
				data: {
					...cleaned_data,
				},
				token,
			};
		} catch (error: any) {
			if (error.code == '11000') {
				throw new CustomError('user already exists', 409);
			} else {
				throw new CustomError(error.message, 500);
			}
		}
	}
	cleanup(dto: any) {
		const data = omit(dto!.toJSON(), 'password');
		return data;
	}
}

export default new auth();
