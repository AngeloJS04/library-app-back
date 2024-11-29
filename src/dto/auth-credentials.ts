
import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
// import { UserRole } from "src/database/entities/user.entity";

export class AuthCredentialDto {
    @ApiProperty({
        description: 'El nombre de usuario del usuario',
        example: 'usuario', 
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username?: string;


    @ApiProperty({
        description: 'La contraseña del usuario',
        example: 'password', 
    })
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    })
    password: string;


    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    @IsDefined()
    email: string;

    
    

}