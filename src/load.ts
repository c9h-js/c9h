import { existsSync, readFileSync, promises } from 'fs';
import { join } from 'path';
import { Parser } from './parsers';

/**
 * Asynchronously checks if a file exists.
 *
 * @param path The path of the file to check.
 * @returns True if the file exists, otherwise false.
 */
export async function fileExists(path: string): Promise<boolean> {
  return promises.stat(path).then(
    () => true,
    () => false,
  );
}

/**
 * This method attempts to find configuration files matching a provided name
 * in an assortment of directories. The extension of the files is dictated by
 * the parsers provided to this function.
 *
 * @param name The name of the file (excluding extension) to load.
 * @param paths An array of directory paths to search for the file to load in.
 * @param parsers An array of parsers to handle the file if found and loaded.
 * @param many Whether many files should be parsed, or just the first file
 * found.
 * @returns The parsed contents of the loaded files.
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function load<T = any>(name: string, paths: string[], parsers: Parser[], many: boolean): Promise<T[]> {
  const found = [];

  for (const path of paths) {
    for (const parser of parsers) {
      for (const extension of parser.extensions()) {
        const file = join(path, `${name}.${extension}`);
        if (await fileExists(file)) {
          const contents = await promises.readFile(file, { encoding: 'utf-8' });
          const parsed = parser.parse<T>(contents);

          if (!many) {
            return [parsed];
          }

          found.push(parsed);
        }
      }
    }
  }

  return found;
}

/**
 * This method attempts to find configuration files matching a provided name
 * in an assortment of directories. The extension of the files is dictated by
 * the parsers provided to this function.
 *
 * @param name The name of the file (excluding extension) to load.
 * @param paths An array of directory paths to search for the file to load in.
 * @param parsers An array of parsers to handle the file if found and loaded.
 * @param many Whether many files should be parsed, or just the first file
 * found.
 * @returns The parsed contents of the loaded files.
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function loadSync<T = any>(name: string, paths: string[], parsers: Parser[], many: boolean): T[] {
  const found = [];

  for (const path of paths) {
    for (const parser of parsers) {
      for (const extension of parser.extensions()) {
        const file = join(path, `${name}.${extension}`);
        if (existsSync(file)) {
          const contents = readFileSync(file, { encoding: 'utf-8' });
          const parsed = parser.parse<T>(contents);

          if (!many) {
            return [parsed];
          }

          found.push(parsed);
        }
      }
    }
  }

  return found;
}
