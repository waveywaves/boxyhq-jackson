import { generators } from 'openid-client';
import {
  OIDCAuthzResponsePayload,
  OAuthReqBody,
  OAuthReqBodyWithAccessType,
  OAuthReqBodyWithClientId,
  OAuthReqBodyWithResource,
  OAuthTokenReq,
} from '../../src';
import boxyhq from './data/metadata/boxyhq';
import boxyhqNobinding from './data/metadata/boxyhq-nobinding';
import exampleOidc from './data/metadata/example.oidc';

// BEGIN: Fixtures for authorize
export const authz_request_normal: Partial<OAuthReqBodyWithClientId> = {
  redirect_uri: boxyhq.defaultRedirectUrl,
  state: 'state-123',
  client_id: `tenant=${boxyhq.tenant}&product=${boxyhq.product}`,
};

export const code_verifier = generators.codeVerifier();
export const authz_request_normal_with_code_challenge: Partial<OAuthReqBodyWithClientId> = {
  redirect_uri: boxyhq.defaultRedirectUrl,
  state: 'state-123',
  client_id: `tenant=${boxyhq.tenant}&product=${boxyhq.product}`,
  code_challenge: generators.codeChallenge(code_verifier),
  code_challenge_method: 'S256',
};
export const authz_request_with_prompt_login: Partial<OAuthReqBodyWithClientId> = {
  redirect_uri: boxyhq.defaultRedirectUrl,
  state: 'state-123',
  client_id: `tenant=${boxyhq.tenant}&product=${boxyhq.product}`,
  prompt: 'login',
};

export const authz_request_with_prompt_more_than_one: Partial<OAuthReqBodyWithClientId> = {
  redirect_uri: boxyhq.defaultRedirectUrl,
  state: 'state-123',
  client_id: `tenant=${boxyhq.tenant}&product=${boxyhq.product}`,
  prompt: 'select_account login consent',
};

export const authz_request_normal_with_access_type: Partial<OAuthReqBodyWithAccessType> = {
  redirect_uri: boxyhq.defaultRedirectUrl,
  state: 'state-123',
  access_type: `tenant=${boxyhq.tenant}&product=${boxyhq.product}`,
  client_id: 'dummy',
};

export const authz_request_normal_with_resource: Partial<OAuthReqBodyWithResource> = {
  redirect_uri: boxyhq.defaultRedirectUrl,
  state: 'state-123',
  resource: `tenant=${boxyhq.tenant}&product=${boxyhq.product}`,
  client_id: 'dummy',
};

export const authz_request_normal_with_scope: Partial<OAuthReqBodyWithClientId> = {
  redirect_uri: boxyhq.defaultRedirectUrl,
  state: 'state-123',
  scope: `tenant=${boxyhq.tenant}&product=${boxyhq.product}`,
  client_id: 'dummy',
};

export const authz_request_normal_oidc_flow: Partial<OAuthReqBodyWithClientId> = {
  redirect_uri: boxyhq.defaultRedirectUrl,
  state: 'state-123',
  scope: `openid`,
  client_id: `tenant=${boxyhq.tenant}&product=${boxyhq.product}`,
};

export const redirect_uri_not_set: Partial<OAuthReqBody> = {
  redirect_uri: undefined,
  state: 'state',
};

export const redirect_uri_not_allowed: Partial<OAuthReqBody> = {
  ...authz_request_normal,
  redirect_uri: 'https://example.com/',
};

export const state_not_set: Partial<OAuthReqBodyWithClientId> = {
  redirect_uri: boxyhq.defaultRedirectUrl,
  state: undefined,
  client_id: `tenant=${boxyhq.tenant}&product=${boxyhq.product}`,
};

export const response_type_not_code: Partial<OAuthReqBodyWithClientId> = {
  redirect_uri: boxyhq.defaultRedirectUrl,
  state: 'state-123',
  client_id: `tenant=${boxyhq.tenant}&product=${boxyhq.product}`,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  response_type: 'token',
};

export const invalid_client_id: Partial<OAuthReqBodyWithClientId> = {
  redirect_uri: boxyhq.defaultRedirectUrl,
  state: 'state-123',
  client_id: 'xxxxxxxxx',
};

export const invalid_tenant_product = (product?, tenant?): Partial<OAuthTokenReq> => {
  product = product || boxyhq.product;
  tenant = tenant || boxyhq.tenant;
  return {
    grant_type: 'authorization_code',
    client_id: `tenant=${tenant}&product=${product}`,
    client_secret: 'dummy',
    code: CODE,
    redirect_uri: boxyhq.defaultRedirectUrl,
  };
};

export const saml_binding_absent: Partial<OAuthReqBodyWithClientId> = {
  redirect_uri: boxyhqNobinding.defaultRedirectUrl,
  state: 'state-123',
  client_id: `tenant=${boxyhqNobinding.tenant}&product=${boxyhqNobinding.product}`,
};

export const authz_request_oidc_provider: Partial<OAuthReqBodyWithClientId> = {
  redirect_uri: exampleOidc.defaultRedirectUrl,
  state: 'state-123',
  client_id: `tenant=${exampleOidc.tenant}&product=${exampleOidc.product}`,
  scope: 'openid',
};
// END: Fixtures for authorize

// BEGIN: Fixtures for oidcAuthzResponse
const OIDC_PROVIDER_CODE = '99991afdfd';
export const oidc_response = {
  code: OIDC_PROVIDER_CODE,
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const oidc_response_with_error: OIDCAuthzResponsePayload = {
  error: 'access_denied',
  error_description: 'The user denied the request',
};

// END: Fixtures for oidcAuthzResponse

// BEGIN: Fixtures for token
const CODE = '1234567890';
const CLIENT_SECRET_VERIFIER = 'TOP-SECRET';
export const bodyWithInvalidCode: Partial<OAuthTokenReq> = {
  grant_type: 'authorization_code',
  client_id: `tenant=${boxyhq.tenant}&product=${boxyhq.product}`,
  client_secret: CLIENT_SECRET_VERIFIER,
  code: 'invalid-code',
  redirect_uri: boxyhq.defaultRedirectUrl,
};
// invalid redirect_uri
export const bodyWithInvalidRedirectUri: Partial<OAuthTokenReq> = {
  grant_type: 'authorization_code',
  client_id: `tenant=${boxyhq.tenant}&product=${boxyhq.product}`,
  client_secret: CLIENT_SECRET_VERIFIER,
  code: CODE,
  redirect_uri: 'http://example.com',
};
export const bodyWithMissingRedirectUri: Partial<OAuthTokenReq> = {
  grant_type: 'authorization_code',
  client_id: `tenant=${boxyhq.tenant}&product=${boxyhq.product}`,
  client_secret: CLIENT_SECRET_VERIFIER,
  code: CODE,
};
//encoded clientId and wrong secret
export const bodyWithInvalidClientSecret: Partial<OAuthTokenReq> = {
  grant_type: 'authorization_code',
  client_id: `tenant=${boxyhq.tenant}&product=${boxyhq.product}`,
  client_secret: 'dummy',
  code: CODE,
  redirect_uri: boxyhq.defaultRedirectUrl,
};
//unencoded clientId with wrong secret
export const bodyWithUnencodedClientId_InvalidClientSecret_gen = (connectionRecords) => {
  const connectionRecord = connectionRecords.find(
    (record) => `tenant=${record.tenant}&product=${record.product}` === authz_request_normal.client_id
  );
  return {
    grant_type: 'authorization_code',
    client_id: connectionRecord.clientID,
    client_secret: 'dummy',
    code: CODE,
    redirect_uri: boxyhq.defaultRedirectUrl,
  };
};

export const bodyWithDummyCredentials: Partial<OAuthTokenReq> = {
  grant_type: 'authorization_code',
  client_id: `dummy`,
  client_secret: 'dummy',
  code: CODE,
  redirect_uri: boxyhq.defaultRedirectUrl,
};

export const token_req_encoded_client_id: Partial<OAuthTokenReq> = {
  grant_type: 'authorization_code',
  client_id: `tenant=${boxyhq.tenant}&product=${boxyhq.product}`,
  client_secret: CLIENT_SECRET_VERIFIER,
  code: CODE,
  redirect_uri: boxyhq.defaultRedirectUrl,
};

export const token_req_unencoded_client_id_gen = (connectionRecords) => {
  const connectionRecord = connectionRecords.find(
    (record) => `tenant=${record.tenant}&product=${record.product}` === authz_request_normal.client_id
  );
  return {
    grant_type: 'authorization_code',
    client_id: connectionRecord.clientID,
    client_secret: connectionRecord.clientSecret,
    code: CODE,
    redirect_uri: boxyhq.defaultRedirectUrl,
  };
};

export const token_req_idp_initiated_saml_login = {
  grant_type: 'authorization_code',
  code: CODE,
};

export const token_req_cv_mismatch = {
  grant_type: 'authorization_code',
  code: CODE,
  code_verifier: code_verifier + 'invalid_chars',
  redirect_uri: boxyhq.defaultRedirectUrl,
};

export const token_req_with_cv = {
  grant_type: 'authorization_code',
  code: CODE,
  code_verifier,
  redirect_uri: boxyhq.defaultRedirectUrl,
};
// END: Fixtures for token

// BEGIN: Fixtures for *_api.test.ts
export const saml_connection = boxyhq;
export const oidc_connection = exampleOidc;
