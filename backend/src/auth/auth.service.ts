import { HttpException, Injectable } from '@nestjs/common';
import { AuthDto, VerifyDto } from './dto/auth.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/users/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { exec } from 'child_process';
import { Registers, ReigstersDocument } from 'src/schemas/registers/registers.schema';
import * as nodemailer from "nodemailer";
import * as moment from 'moment';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './strategy/jwt.secret';
import { v4 as uuid } from "uuid";

@Injectable()
export class AuthService {
	constructor(@InjectModel(User.name) private users: Model<UserDocument>,
				@InjectModel(Registers.name) private registers: Model<ReigstersDocument>,
				private jwt: JwtService) {}

	private genpass (): string {
        let pass: string = "";
        const chars = "0123456789";
        for(let i = 0;i < 6;i++) {
            pass += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return pass;
    }

    private async sendAuthMail (pass: string ,email: string) {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: "hlangari1353@gmail.com",
                pass: "cxvarvezccwedmxe"
            },
        });

        const mail = {
            from: "hlangari1353@gmail.com",
            to: email,
            subject: "Confirm It's You",
            text: `Hello \nWe've noticed you had signed up in Mmmd Accounting app.Here's Your Authentication code: ${pass}\nDon't share it with anyone!`
        };

        transporter.sendMail(mail ,(error) => {
            if (error) {
                console.log(error);
            }
        });
    }

	private async gen_hash(passwd: string) {
		return await new Promise<string> ((resolve, reject) => {
			exec(`./hash ${passwd}`, (error, stdout) => {
				if (error){
					console.log(error);
					reject(error);
				} else {
					resolve(stdout.substring(0, stdout.length - 1));
				}
			});
		});
	}

	async Signup(dto: AuthDto) {
		if (dto){
			const checkUser = await this.users.findOne({email: dto.email});
			if (!checkUser) {
				const hash = await this.gen_hash(dto.password);
				const ver_code = this.genpass();
				this.sendAuthMail(ver_code, dto.email);
				const newUser = await this.registers.create({_id: uuid(), email: dto.email, date: moment().toDate(), expiration: moment().add(2, 'minutes').toDate(), hash: hash, verification_code: ver_code, verified: false});
				newUser.save();
				return newUser._id;
			} else {
				throw new HttpException("User Exists!", 401);
			}
		}
	}

	async Verify(dto: VerifyDto) {
		console.log(dto.id)
		const user = await this.registers.findOne({_id: dto.id});
		if (user) {
			if (user.verification_code == dto.code) {
				if (moment().isBefore(moment(user.expiration))) {
					try {
						const newUser = await this.users.create({
							_id: uuid(),
							email: user.email,
							CreatedAt: moment().toDate(),
							firstName: dto.firstName,
							lastName: dto.lastName,
							hash: user.hash
						});
						await this.registers.updateOne({email: user.email}, {verified: true});
						return this.gen_token({id: newUser._id});
					} catch (err) {
						console.log(err);
					}
				} else {
					throw new HttpException("Verification code expired!", 404);
				}
			} else {
				throw new HttpException("Wrong verification code!", 403);
			}
		} else {
			throw new HttpException("Fuck you!", 402);
		}
	}

	async Signin(dto: AuthDto) {
		const user = await this.users.findOne({email: dto.email});
		const hash = await this.gen_hash(dto.password);
		if (user && user.hash == hash) {
			return this.gen_token({id: user._id});
		} else {
			throw new HttpException("Wrong email or password!", 405);
		}
	}

	private async gen_token(payload: {id: string}): Promise<{jwt: string}> {
		const token = await this.jwt.signAsync(payload, { expiresIn: "1d", secret: jwtConstants.secret });
		return {jwt: token};
	}
}
