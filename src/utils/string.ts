import type { LinkParseResult } from "../types/utils.ts";

/**
 * Trims and splits the text using "\n\n" as delimeter.
 */
export function normalizeUnevenHTMLToArray(text: string): string[] {
  return text
    .trim()
    .split("\n\n")
    .map((i) => i.replaceAll("\n", " ").replaceAll(/ +/g, " ").trim());
}

/**
 * Trims and normalizes uneven spaces from the text.
 */
export function normalizeUnevenHTML(text: string): string {
  return normalizeUnevenHTMLToArray(text).join("\n\n");
}

/**
 * Filters given links and returns an object with `files` and `links` array.
 * - `files` array will have links ending with an extension name.
 * - `links` array will have other links.
 * @see {@link LinkParseResult} - Returned object
 */
export function parseLinkByType(links: string[]): LinkParseResult {
  const result = links.reduce(
    (prev, curr) => {
      const linkExtension = curr
        .split("//")
        .slice(1)
        .join("//")
        .split("/")
        .slice(1)
        .at(-1);

      // TODO: Find a better way to filter for attachment extensions in the future
      // TODO: without defining a static file extension list.
      if (linkExtension?.includes(".") && !linkExtension.includes(".html")) {
        prev.files.push(curr);
      } else {
        prev.links.push(curr);
      }

      return prev;
    },
    { links: [] as string[], files: [] as string[] },
  );

  let resultObj = {};

  if (result.files.length) resultObj = { ...resultObj, files: result.files };
  if (result.links.length) resultObj = { ...resultObj, links: result.links };

  return resultObj;
}
