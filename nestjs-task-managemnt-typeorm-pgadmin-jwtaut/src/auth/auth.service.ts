import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/registerdto';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt.payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  //  register a new user
  async register(newuser: UserDto): Promise<User> {
    const { username, password } = newuser;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      id: uuid(),
      username,
      password: hashedPassword,
    });

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  //  user login without token
  // async login(userlogin: UserDto):Promise<string> {
  //   const { username, password } = userlogin;
  //   const finduser = await this.userRepository.findOne({ where: { username } });
  //   if (finduser) {
  //     const isMatch = await bcrypt.compare(password, finduser.password);
  //     if (isMatch) {
        
  //       return  'sucess';
  //     } else {
  //       throw  new UnauthorizedException('Invalid credentials');
  //     }
  //   } else {
  //     throw new UnauthorizedException('User not found');
  //   }
  // }

  //  user login with token
  async login(userlogin: UserDto):Promise<{accesstoken:string}> {
    const { username, password } = userlogin;
    const finduser = await this.userRepository.findOne({ where: { username } });

    if (finduser) {
      const isMatch = await bcrypt.compare(password, finduser.password);
      if (isMatch) {
        //  genrate the jwt token
        const payload:JwtPayload= { username };
        const accesstoken:string = this.jwtService.sign(payload);
        return  {accesstoken};
      } else {
        throw  new UnauthorizedException('Invalid credentials');
      }
    } else {
      throw new UnauthorizedException('User not found');
    }
  }
}
