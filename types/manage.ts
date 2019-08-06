import { subscriptions, invoices, sources, customers } from "stripe";
import { IdRow, Row, Paginated } from "./root";

export interface Organization extends IdRow {
  name?: string;
  stripeCustomerId?: string;
  username: string;
  autoJoinDomain: boolean;
  onlyAllowDomain: boolean;
}

export interface Membership extends IdRow {
  organization: Organization;
}
export interface ApiKey extends IdRow {
  name?: string;
  jwtApiKey: string;
  scopes: string;
  ipRestrictions?: string;
  referrerRestrictions?: string;
}
export interface AuditWebpage extends IdRow {
  organizationId: number;
  url: string;
  repeatEvery: number;
}
export interface Audit extends IdRow {
  status: number;
  auditUrlId?: number;
  finalUrl: string;
  timing: number;
  scorePerformance: number;
  scoreAccessibility: number;
  scoreBestPractices: number;
  scoreSeo: number;
  scorePwa: number;
}

export type ApiKeyLogs = any;
export interface Domain extends Row {
  domain: string;
  verificationCode: string;
  isVerified: boolean;
}
export interface Webhook extends IdRow {
  url: string;
  event: string;
  secret: string;
  contentType: string;
  isActive: boolean;
}
export interface AgastyaApiKey extends IdRow {
  organizationId: number;
  name: string;
  slug: string;
  backgroundColor: string;
  foregroundColor: string;
  domains: string;
  subscriptionId?: string;
  subscription?: subscriptions.ISubscription;
  customCss: {
    title: string;
    css: string;
  }[];
  variables: {
    [index: string]: string | boolean;
  };
  links: {
    [index: string]: string;
  };
  layout: {
    type: string;
    slug: string;
    [index: string]: string | boolean | number;
  }[];
  integrations: {
    [index: string]:
      | string
      | {
          [index: string]: string | number | boolean;
        };
  };
}

export interface Members extends Paginated {
  data: Membership[];
}
export interface Subscriptions extends Paginated {
  data: subscriptions.ISubscription[];
}
export interface Invoices extends Paginated {
  data: invoices.IInvoice[];
}
export interface Sources extends Paginated {
  data: sources.ISource[];
}
export interface ApiKeys extends Paginated {
  data: ApiKey[];
}
export interface AuditWebpages extends Paginated {
  data: AuditWebpage[];
}
export interface Audits extends Paginated {
  data: Audit[];
}
export interface Domains extends Paginated {
  data: Domain[];
}
export interface Webhooks extends Paginated {
  data: Webhook[];
}
export interface AgastyaApiKeys extends Paginated {
  data: AgastyaApiKey[];
}

export interface Address {
  state: string;
  country: string;
  city: string;
  line1: string;
  line2?: string;
  postal_code: string;
}
export interface Billing {
  name?: string;
  email: string;
  phone?: string;
  address?: Address;
}

export interface OrganizationsKV {
  [index: string]: Organization;
}
export interface MembershipsKV {
  [index: string]: Members;
}
export interface BillingKV {
  [index: string]: Billing;
}
export interface SubscriptionsKV {
  [index: string]: Subscriptions;
}
export interface InvoicesKV {
  [index: string]: Invoices;
}
export interface SourcesKV {
  [index: string]: Sources;
}
export interface ApiKeysKV {
  [index: string]: ApiKeys;
}
export interface AuditWebpagesKV {
  [index: string]: AuditWebpages;
}
export interface AuditsKV {
  [index: string]: Audits;
}
export interface DomainsKV {
  [index: string]: Domains;
}
export interface WebhooksKV {
  [index: string]: Webhooks;
}
export interface AgastyaApiKeysKV {
  [index: string]: AgastyaApiKeys;
}

export interface SingleSubscriptionKV {
  [index: string]: {
    [index: string]: subscriptions.ISubscription;
  };
}
export interface SingleInvoiceKV {
  [index: string]: {
    [index: string]: invoices.IInvoice;
  };
}
export interface SingleSourceKV {
  [index: string]: {
    [index: string]: sources.ISource;
  };
}
export interface SingleApiKeyKV {
  [index: string]: {
    [index: string]: ApiKey;
  };
}
export interface SingleAuditWebpageKV {
  [index: string]: {
    [index: string]: AuditWebpage;
  };
}
export interface SingleAuditKV {
  [index: string]: {
    [index: string]: AuditsKV;
  }
}

export interface SingleApiKeyLogsKV {
  [index: string]: {
    [index: string]: ApiKeyLogs;
  };
}
export interface SingleDomainKV {
  [index: string]: {
    [index: string]: Domain;
  };
}
export interface SingleWebhookKV {
  [index: string]: {
    [index: string]: Webhook;
  };
}
export interface SingleAgastyaApiKeyKV {
  [index: string]: {
    [index: string]: AgastyaApiKey;
  };
}
export interface LoggedInMembershipsKV {
  [index: string]: number;
}

export interface RootState {
  membership?: Membership;
  loggedInMembership: LoggedInMembershipsKV;
  organizations: OrganizationsKV;
  memberships: MembershipsKV;
  subscriptions: SubscriptionsKV;
  subscription: SingleSubscriptionKV;
  billing: BillingKV;
  invoices: InvoicesKV;
  invoice: SingleInvoiceKV;
  sources: SourcesKV;
  source: SingleSourceKV;
  apiKeys: ApiKeysKV;
  apiKey: SingleApiKeyKV;
  auditWebpages: AuditWebpagesKV;
  auditWebpage: SingleAuditWebpageKV;
  audits: AuditsKV;
  audit: SingleAuditKV;
  apiKeyLogs: SingleApiKeyLogsKV;
  domains: DomainsKV;
  domain: SingleDomainKV;
  agastyaApiKeys: WebhooksKV;
  agastyaApiKey: SingleAgastyaApiKeyKV;
  devWebhooks: WebhooksKV;
  devWebhook: SingleWebhookKV;
  pricingPlans?: any;
  recentEvents?: any;
  isDownloading: boolean;
}

export const emptyOrganization: Organization = {
  id: 0,
  createdAt: new Date().toString(),
  updatedAt: new Date().toString(),
  name: "",
  username: "",
  stripeCustomerId: "",
  autoJoinDomain: false,
  onlyAllowDomain: false
};
export const emptyPagination = {
  data: [],
  hasMore: false
};
export const emptyAddress: Address = {
  state: "",
  country: "",
  line1: "",
  city: "",
  postal_code: ""
};
export const emptyBilling: Billing = {
  email: "",
  address: emptyAddress
};
