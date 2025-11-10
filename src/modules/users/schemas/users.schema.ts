import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true }) fullName: string;
  @Prop({ required: true, unique: true }) cpf: string;
  @Prop({ required: true }) rg: string;
  @Prop() birthDate: string;
  @Prop() age: number;
  @Prop({
    type: {
      street: String,
      number: Number,
      apto: Number,
      neighborhood: String,
      city: String,
      State: String,
    },
    default: {},
  })
  address: Record<string, any>;
  @Prop() schoolName: string;
  @Prop() modality: string;
  @Prop() modalityPeriod: string;
  @Prop({ type: [String], default: [] }) medicalFlags: string[];
  @Prop() medical: string;
  @Prop({ type: [String], default: [] }) psychFlags: string[];
  @Prop() psych: string;
  @Prop({ type: [String], default: [] }) bioFlags: string[];
  @Prop() visionProblem: string;
  @Prop() hadConvulsion: string;
  @Prop() medications: string;
  @Prop() medicationAllergie: string;
  @Prop() insurance: string;
  @Prop({ type: [String], default: [] }) preferredHospitals: string[];
  @Prop() familyIncome: string;
  @Prop() PhotoConsent: boolean;
  @Prop() infoDeclaration: boolean;
  @Prop() regulationAccepted: boolean;
  @Prop() authorization: boolean;
  @Prop() responsibleAgree: boolean;
  @Prop({ type: Object, default: {} }) documents: Record<string, any>;
  @Prop({ default: true }) isActive: boolean;

  UserSchema = SchemaFactory.createForClass(User);
}
