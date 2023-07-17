import { IsNotEmpty, IsString } from 'class-validator';

export default class IdDto {
    @IsString()
    @IsNotEmpty()
    readonly id: string;
}
