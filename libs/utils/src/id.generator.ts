import { Injectable } from '@nestjs/common';
import { customAlphabet } from 'nanoid';

@Injectable()
export class IdGenerator {
  private static readonly alphabet =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  /**
   * Generate a random ID with a specific prefix (id_ is the default prefix)
   *
   * Pass a length 0 string to generate a random ID without the separator _
   * @param prefix default is 'id'
   * @returns {string}
   */
  public static generateId(prefix = 'id'): string {
    const nanoid = customAlphabet(this.alphabet, 11);
    const id = nanoid();
    return prefix.length ? `${prefix}_${id}` : id;
  }

  public static generateActivationCode(): string {
    const nanoid = customAlphabet(this.alphabet, 32);
    const id = nanoid();
    return id;
  }
}
