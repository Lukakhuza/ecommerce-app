export type StripeData = {
  customerId: string;
  ephemeralKey: string;
  paymentIntent: string;
  paymentIntentId: string;
};

export type CardInfo = {
  brand: string;
  checks: {
    address_line1_check: string | null;
    address_postal_code_check: string | null;
    cvc_check: string | null;
  };
  country: string;
  display_brand: string;
  exp_month: number;
  exp_year: number;
  fingerprint: string;
  funding: string;
  generated_from: string | null;
  last4: string;
  networks: {
    available: string[];
    preferred: string | null;
  };
  regulated_status: string;
  three_d_secure_usage: {
    supported: boolean;
  };
  wallet: string | null;
};
