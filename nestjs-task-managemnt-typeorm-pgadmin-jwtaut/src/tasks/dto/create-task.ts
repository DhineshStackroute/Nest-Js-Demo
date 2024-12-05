import { IsNotEmpty, isNotEmpty } from "class-validator";

export class CreatetaskDTO{
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    description: string;
}