import { match } from "assert";
import { IsEmail, IsString, Matches, MaxLength, MinLength} from "class-validator";

export class UserDto{
    @IsEmail()
    
    username: string;
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password: string;
}