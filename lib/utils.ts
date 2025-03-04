import type { NextApiRequest, NextApiResponse } from 'next';
import micromatch from 'micromatch';

export const validateEmailWithACL = (email: string) => {
  const NEXTAUTH_ACL = process.env.NEXTAUTH_ACL || undefined;

  if (!NEXTAUTH_ACL) {
    return false;
  }

  const acl = NEXTAUTH_ACL.split(',');

  return micromatch.isMatch(email, acl);
};

/**
 * This sets `cookie` using the `res` object
 */
export const setErrorCookie = (res: NextApiResponse, value: unknown, options: { path?: string } = {}) => {
  const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
  let cookieContents = 'jackson_error' + '=' + stringValue;
  if (options.path) {
    cookieContents += '; Path=' + options.path;
  }
  res.setHeader('Set-Cookie', cookieContents);
};

const IsJsonString = (body: any): boolean => {
  try {
    const json = JSON.parse(body);

    return typeof json === 'object';
  } catch (e) {
    return false;
  }
};

export const bodyParser = (req: NextApiRequest): any => {
  return IsJsonString(req.body) ? JSON.parse(req.body) : req.body;
};

export const strategyChecker = (req: NextApiRequest): { isSAML: boolean; isOIDC: boolean } => {
  const isSAML = 'rawMetadata' in req.body || 'encodedRawMetadata' in req.body;
  const isOIDC = 'oidcDiscoveryUrl' in req.body;
  return { isSAML, isOIDC };
};
