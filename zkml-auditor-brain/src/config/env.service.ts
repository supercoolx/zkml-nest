import { Injectable } from "@nestjs/common";

@Injectable()
export class EnvService {
  private env: { [key: string]: string } = process.env;

  constructor() {
    // Load environment variables if needed (from a .env file, for example)
    // This could use something like dotenv.config() if needed.
  }

  public get(key: string): string[] {
    const value = this.env[key];
    if (!value) {
      throw new Error(`Environment variable "${key}" is not defined.`);
    }
    return value.split(',').map((v) => v.trim());
  }
}
