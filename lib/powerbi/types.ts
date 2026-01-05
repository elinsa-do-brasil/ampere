// TypeScript interfaces for Power BI embedding configuration

export interface PowerBIReportDetails {
  reportId: string;
  reportName: string;
  embedUrl: string;
}

export interface EmbedToken {
  token: string;
  tokenId: string;
  expiration: string;
}

export interface EmbedConfig {
  type: string;
  reportsDetail: PowerBIReportDetails[];
  embedToken: EmbedToken;
}

export interface EmbedInfo {
  accessToken: string;
  embedUrl: string;
  expiry: string;
  reportId: string;
}

export interface PowerBIConfig {
  tenantId: string;
  clientId: string;
  clientSecret: string;
  workspaceId: string;
  authorityUrl: string;
  scopeBase: string;
}
