import {
  IsString,
  IsOptional,
  ValidateNested,
  IsDateString,
  IsArray,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';

import { Type } from 'class-transformer';

class AdrressDTO {
  @IsString() street: string;
  @IsString() number: string;
  @IsString() @IsOptional() apto: number;
  @IsString() neighborhood: string;
  @IsString() city: string;
  @IsString() state: string;
}

export class createUserDTO {
  @IsString() @IsNotEmpty() fullName: string;
  @IsString() @IsNotEmpty() cpf: string;
  @IsString() @IsNotEmpty() rg: string;
  @IsDateString() @IsNotEmpty() birthDate: string;
  @IsOptional() @ValidateNested() @Type(() => AdrressDTO) address?: AdrressDTO;
  @IsString() @IsOptional() schollName: string;
  @IsString() @IsOptional() modalityPeriod: string;
  @IsString() @IsOptional() modality?: string;
  @IsArray() @IsOptional() medicalFlags?: string;
  @IsString() @IsOptional() medical?: string;
  @IsArray() @IsOptional() psychFlags?: string;
  @IsString() @IsOptional() psych?: string;
  @IsArray() @IsOptional() bioFlags?: string;
  @IsString() @IsOptional() visionProblem?: string;
  @IsString() @IsOptional() hadConvulsion?: string;
  @IsString() @IsOptional() medication?: string;
  @IsString() @IsOptional() medicationAllergie?: string;
  @IsString() @IsOptional() insurance?: string;
  @IsArray() @IsOptional() preferredHospital?: string;
  @IsString() @IsOptional() familyIncome?: string;
  @IsBoolean() photoConsent: boolean;
  @IsString() infoDeclaration: string;
  @IsBoolean() regulationAccepted: boolean;
  @IsBoolean() authorization: boolean;
  @IsBoolean() responsibleAgree: boolean;
}
