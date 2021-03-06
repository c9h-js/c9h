import parsers, { Parser } from './parsers';

/**
 * The default parsers that are used by c9h.
 *
 * This is set to all available parsers.
 */
export const defaultParsers: Parser[] = parsers;

/**
 * The default directories that c9h should search for the configuration
 * files in.
 *
 * This is set to the current working directory (`process.cwd`), the etc
 * directory (``/etc/${name}``), and a hidden directory in your user's
 * HOME directory (``$HOME/.${name}``) are searched by c9h.
 */
export const defaultPaths: ((name: string) => string)[] = [
  (name: string): string => `${process.env.HOME}/.${name}`,
  (): string => process.cwd(),
  (): string => `${process.cwd()}/.config`,
  (name: string): string => `/etc/${name}`,
];
