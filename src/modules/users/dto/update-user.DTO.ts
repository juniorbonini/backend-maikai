import { PartialType } from '@nestjs/mapped-types';
import { createUserDTO } from './create-user.DTO';

export class updatedUserDTO extends PartialType(createUserDTO) {}
