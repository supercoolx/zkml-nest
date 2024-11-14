import { Global, Injectable, Logger } from "@nestjs/common";
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { WithId, Db } from "mongodb";

@Global()
@Injectable()
@ValidatorConstraint({ async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  private logger = new Logger(IsUniqueConstraint.name);

  constructor(private db: Db) {}

  public async validate(value: unknown, validationArguments: ValidationArguments): Promise<boolean> {
    const collectionName = validationArguments.constraints[0] as string;
    const key = validationArguments.property as string;

    const query: Record<string, unknown> = {};
    query[key] = value;

    const results = await this.db.collection(collectionName).find(query).toArray();

    if (results.length == 0) {
      return true;
    }

    if (results.length > 1) {
      return false;
    }

    // if there is exactly one result ensure it is the currently validated object
    const validating = validationArguments.object as WithId<unknown>;
    const existing = results[0];

    if (!validating) {
      this.logger.error("The validating object does not exist");
      return false;
    }

    if (!existing) {
      this.logger.error("The db object does not exist");
      return false;
    }

    return validating["_id"] === existing["_id"];
  }

  public defaultMessage(validationArguments: ValidationArguments): string {
    const key = validationArguments.property as string;
    const value = validationArguments.value as string;
    const collectionName = validationArguments.constraints[0] as string;

    return `[${key}: ${value}] was not unique in '${collectionName}'`;
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function IsUnique(
  collectionName: string,
  validationOptions?: ValidationOptions,
): (object: object, propertyName: string) => void {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "isUnique",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [collectionName],
      options: validationOptions,
      validator: IsUniqueConstraint,
    });
  };
}
