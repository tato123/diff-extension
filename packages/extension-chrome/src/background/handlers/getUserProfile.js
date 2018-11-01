import { browser, remoteSettings } from '@diff/common';
import normalizeUrl from 'normalize-url';
import _ from 'lodash-es';
import { getSitePreference } from '../storage';

export default async function getUserProfile() {
  const user = await browser.auth.getUser();
  const remoteSites = await remoteSettings.getDomains(user.sub);

  // get the local sites theyve opened diff for
  const localSites = await getSitePreference();

  const sites = _.uniq(
    _.union(remoteSites.domains, localSites).map(
      url => new URL(normalizeUrl(url)).hostname
    )
  );

  const { featureFlags = {} } = await browser.storage.local.get([
    'featureFlags'
  ]);

  return {
    featureFlags,
    sites
  };
}
