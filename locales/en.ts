export default {
  errors: {
    "user-not-found": "We couldn't find this user",
    "missing-field": "Make sure you've entered all required fields",
    "unverified-email": "This email has not been verified yet",
    "invalid-login": "This is an incorrect email/password combination",
    "incorrect-password": "This password is incorrect",
    "TokenExpiredjwt expired":
      "This magic link has been expired, please request a new one",
    "JsonWebTokenjwt malformed":
      "This magic link is broken, please request a new one",
    "google-auth-error": "We got an error in verifying your Google account",
    "validation-email": "Please enter a valid email",
    "validation-phone": "Please enter a valid phone number",
    "validation-url": "Please enter a valid URL (start with http(s))",
    "validation-domain": "Please enter a valid domain nmame",
    "validation-language": "Please enter a valid language",
    "validation-timezone": "Please enter a valid timezone",
    "validation-gender": "Please enter a valid gender",
    "validation-country-code": "Please enter a valid country code",
    "validation-text": "Please enter a valid text",
    "email-exists": "An account with this email already exists",
    "cannot-delete-sole-owner":
      "Add another owner to this organization before deleting",
    "cannot-update-sole-owner":
      "Add another owner to this organization before updating this role",
    "insufficient-permission":
      "You don't have the permission to perform this action",
    "user-is-member-already": "This user is already a member",
    "invalid-2fa-token": "This 2FA verification code is incorrect",
    "oauth-no-email": "We couldn't find an account with that email",
    "domain-missing-file": "We couldn't find the verification file",
    "domain-missing-dns": "We didn't find the DNS record",
    "domain-already-verified": "This domain is already verified",
    "cannot-invite-domain": "You cannot invite a member from this domain",
    "username-exists": "This username is already claimed",
    "cannot-delete-email": "This email cannot be deleted"
  },
  securityEvents: {
    "user.created": "Created account",
    "user.updated": "Updated settings",
    "user.deleted": "Deleted account",
    "auth.refresh": "Continued session",
    "auth.login": "Login",
    "auth.login_backupCode": "Login with backup code",
    "auth.login_google": "Login with Google",
    "auth.password_changed": "Password changed",
    "auth.passwordReset": "Password reset request",
    "auth.approveLocation": "Approved a new location",
    "organization.created": "Created a new organization",
    "organization.updated": "Updated organization",
    "organization.deleted": "Deleted organization",
    "email.created": "Created a new email",
    "email.updated": "Updated email",
    "email.deleted": "Deleted email",
    "email.verified": "Verified email",
    "membership.created": "Updated membership",
    "membership.updated": "Updated membership",
    "membership.deleted": "Updated membership"
  },
  messages: {
    success: "Your changes were saved successfully",
    "admin-info-success": "Looking like everything is working",
    "auth-register-success": "Your account has been successfully created",
    "auth-recover-success": "Your password has been changed",
    "auth-verify-email-success": "Your email have been verified",
    "membership-updated": "Membership has been updated",
    "organization-created": "Your team has been created",
    "organization-updated": "Your team has been updated",
    "organization-deleted": "Your team has been deleted",
    "organization-billing-updated": "Your team's billing info has been updated",
    "user-updated": "Your account has been updated",
    "user-password-updated": "Your password has been changed",
    "user-email-created": "Your email has been created",
    "user-email-verify-resent": "Verification email has been sent",
    "user-email-deleted": "Your email has been deleted",
    "billing-customer-created": "Your customer has been created",
    "billing-customer-deleted": "Your customer has been deleted",
    "billing-customer-updated": "Your customer has been updated ",
    "billing-subscription-created": "Your subscription has been created",
    "billing-subscription-updated": "Your subscription has been updated",
    "billing-source-created": "Your payment method has been created",
    "billing-source-updated": "Your payment method has been updated",
    "billing-source-deleted": "Your payment method has been deleted",
    "domain-unable-to-verify": "We weren't able to verify your domain"
  },
  membershipRoles: {
    1: "Owner",
    2: "Admin",
    3: "Manager",
    4: "Member",
    5: "Reseller"
  },
  scopes: {
    orgRead: {
      text: "Read team details",
      help: "Get information about your team, subscription, and settings"
    },
    orgUpdate: {
      text: "Update team details",
      help: "Update information about your team, billing, etc."
    },
    translate: {
      text: "Translation API"
    },
    languageDetect: {
      text: "Detect language API"
    },
    screenshot: {
      text: "Webpage screenshot API"
    },
    readAloud: {
      text: "Read Aloud audio API"
    },
    reader: {
      text: "Reader view API"
    },
    describe: {
      text: "Describe image API"
    },
    collect: {
      text: "Collect data",
      help: "Track an event, like a pageview"
    },
    aggregateData: {
      text: "Aggregate data",
      help: "View analytics for collected data"
    }
  },
  webhooks: {
    "*": "All events",
    "update-organization": "Update team settings",
    "delete-organization": "Delete team",
    "update-organization-billing": "Update billing details",
    "update-organization-subscription": "Update subscription",
    "create-organization-subscription": "Create a subscription",
    "delete-organization-source": "Delete a payment method",
    "update-organization-source": "Update a payment method",
    "create-organization-source": "Create a payment method",
    "update-api-key": "Update an API key",
    "create-api-key": "Create an API key",
    "delete-api-key": "Delete an API key",
    "update-domain": "Update a domain",
    "create-domain": "Create a domain",
    "delete-domain": "Delete a domain",
    "verify-domain": "Verify a domain",
    "update-webhook": "Update a webhook",
    "create-webhook": "Create a webhook",
    "delete-webhook": "Delete a webhook"
  },
  userScopes: {
    "user:read": {
      text: "Read basic user profile"
    },
    "user:update": {
      text: "Update user profile"
    },
    "user:emails:create": {
      text: "Add an email address"
    },
    "user:emails:read": {
      text: "Read email addresses"
    },
    "user:emails:delete": {
      text: "Delete an email address"
    },
    "user:emails:resend-verification": {
      text: "Resend email verification"
    },
    "user:change-password": {
      text: "Change user password"
    },
    "user:delete": {
      text: "Delete user account"
    },
    "user:memberships:read": {
      text: "Read team memberships"
    },
    "user:2fa:enable": {
      text: "Enable two-factor authentication"
    },
    "user:2fa:disable": {
      text: "Disable two-factor authentication"
    },
    "user:backup-codes:read": {
      text: "Read 2FA backup codes"
    },
    "user:backup-codes:regenerate": {
      text: "Regenerate 2FA backup codes"
    },
    "user:access-tokens:create": {
      text: "Create new access tokens"
    },
    "user:access-tokens:read": {
      text: "Read access tokens"
    },
    "user:access-tokens:update": {
      text: "Update access tokens"
    },
    "user:access-tokens:delete": {
      text: "Delete access tokens"
    }
  },
  months: {
    1: "January (01)",
    2: "February (02)",
    3: "March (03)",
    4: "April (04)",
    5: "May (05)",
    6: "June (06)",
    7: "July (07)",
    8: "August (08)",
    9: "September (09)",
    10: "October (10)",
    11: "November (11)",
    12: "December (12)"
  },
  genders: {
    m: "Male (he/him)",
    f: "Female (she/her)",
    n: "Non-binary (them/their)",
    x: "Prefer not to say (them/their)"
  },
  buttons: {
    getStarted: "Get started for free →",
    goToDashboard: "Go to your dashboard →"
  },
  agastyaModes: {
    "dyslexia": "Dyslexia",
    "blue-light-filter": "Blue filter",
    "night": "Night mode",
    "large-font": "Large font",
    "legible-fonts": "Legible fonts",
    "keyboard-nav": "Keyboard navigation",
    "highlight-links": "Highlight Links",
    "big-cursor": "Big cursor",
    "desaturate": "Desaturate",
    "reading-mode": "Reading mode",
    "read-aloud": "Read aloud",
    "contrast": "Contrast",
    "translate": "Translate",
    "line-height": "Line height",
    "word-spacing": "Word spacing",
    "letter-spacing": "Letter spacing",
    "font-size": "Font size",
    "font-family": "Reading font",
    "color-scheme": "Color scheme",
    "landmark-color": "Landmark color",
  },
  integrations: {
    "eu-cookie-law": {
      title: "EU Cookie Law",
      description:
        "Add a popup message for increased compliance with the European Union's cookie law."
    },
    "conditional-markup": {
      title: "Conditional Markup",
      description:
        'Conditionally render HTML on your webpage with custom "if" rules based on tracking data.'
    },
    "google-analytics": {
      title: "Google Analytics",
      description:
        "Add Google Analytics to your site to track pageviews, Agastya events, and custom events.",
      params: [
        {
          model: "trackingId",
          value: "UA-XXXXXXXX-XX",
          label: "Tracking ID",
          message:
            "Copy and paste the tracking ID from your Google Analytics property",
          type: "text",
          required: true
        },
        {
          model: "trackPageviews",
          value: "",
          label: "Track pageviews",
          message: "Don't check this if you already have GA on your website, we'll only track Agastya events",
          type: "boolean"
        }
      ]
    },
    sentry: {
      title: "Sentry",
      description:
        "Track errors and bugs in your code using Sentry's open-source error tracking software.",
      params: [
        {
          model: "dsn",
          value: "https://example@sentry.io/example",
          label: "DSN",
          message: "Copy and paste the DNS from your Sentry project client keys",
          type: "text",
          required: true
        }
      ]
    },
    "extra-tracking": {
      title: "Tracking",
      description:
        "Track even more events on your website, like pageviews, clicks and external links.",
      params: [
        {
          model: "pageviews",
          value: "",
          label: "Pageviews",
          type: "boolean"
        },
        {
          model: "clicks",
          value: "",
          label: "Clicks",
          message: "Track when users click on buttons, links, and other elements",
          type: "boolean"
        },
        {
          model: "externalLinks",
          value: "",
          label: "External links",
          message: "Track when users go to another website from your site",
          type: "boolean"
        },
        {
          model: "unload",
          value: "",
          label: "Time spent",
          message: "Track exact time spent on a page using unload events",
          type: "boolean"
        },
        {
          model: "selection",
          value: "",
          label: "Selection",
          message: "Track when users select text on your website",
          type: "boolean"
        }
      ]
    }
  }
};
