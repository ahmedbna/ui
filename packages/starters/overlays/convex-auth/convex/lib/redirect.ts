/**
 * The `redirect` callback in `auth.ts` rejects any target not covered here —
 * this is the whole allow-list standing between a signed-in session and an
 * attacker-supplied redirect. Kept as a pure function so it can be tested
 * without a deployment.
 */
export function isAllowedRedirect(
  redirectTo: string,
  { siteUrl, expoUrl }: { siteUrl?: string; expoUrl?: string }
): boolean {
  const isExpoDevUrl = redirectTo.startsWith('exp://'); // dev URLs
  const isExpoProdUrl = !!expoUrl && redirectTo.startsWith(expoUrl); // bna:// in prod
  const isSiteUrl = !!siteUrl && redirectTo.startsWith(siteUrl);

  return isExpoDevUrl || isExpoProdUrl || isSiteUrl;
}
