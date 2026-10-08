import { Agent } from "undici";

export async function fetchSchoolSitesWithTLSOff(url: string) {
  const urlData = new URL(url);
  const { origin, pathname: path } = urlData;

  const insecureAgent = new Agent({ connect: { rejectUnauthorized: false } });
  const secureAgent = new Agent();
  const requestData = { origin, path, method: "GET" };

  console.log(`Fetching site "${url}"...`);
  return origin.endsWith(".hacettepe.edu.tr") ?
      insecureAgent.request(requestData)
    : secureAgent.request(requestData);
}

export function isRequestOk(statusCode: number): boolean {
  return statusCode >= 200 && statusCode < 300;
}

export function urlOrigin(url: string): string {
  return new URL(url).origin;
}
