import { IsNotEmpty, IsNumberString } from 'class-validator';

export default class PageDto {
    @IsNumberString()
    @IsNotEmpty()
    readonly page: number;
}
