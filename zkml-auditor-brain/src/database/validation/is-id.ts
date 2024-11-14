import { Global, Injectable } from "@nestjs/common";
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@Global()
@Injectable()
@ValidatorConstraint({ async: true })
export class IsIdConstraint implements ValidatorConstraintInterface {
  public validate(id: string): boolean {
    return Boolean(String(id).match(/^[0-9a-fA-F]{24}$/));
  }

  public defaultMessage(validationArguments: ValidationArguments): string {
    const key = validationArguments.property as string;
    const value = validationArguments.value as string;

    return `[${key}: ${value}] was not an ID`;
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function IsValidId(
  property?: unknown,
  validationOptions?: ValidationOptions,
): (object: object, propertyName: string) => void {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "isId",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsIdConstraint,
    });
  };
}
