import validator from "validator";

export const isValidFirstName = (name: string) => {
  // Trim spaces
  const trimmed = name.trim();

  // Check if empty
  if (trimmed.length === 0) return false;

  // Check length
  if (trimmed.length < 2 || trimmed.length > 30) return false;

  // Check only letters (allowing accents, hyphens, and apostrophes if needed)
  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ'-]+$/;
  if (!regex.test(trimmed)) return false;

  return true;
};

export const isValidLastName = (lastName: string) => {
  const trimmed = lastName.trim();

  // Check if empty
  if (trimmed.length === 0) return false;

  // Check length
  if (trimmed.length < 2 || trimmed.length > 50) return false;

  // Allow letters (including accents), hyphens, apostrophes, and spaces in between letters.
  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;
  return regex.test(trimmed);
};

export const isValidEmail = (email: string) => {
  return validator.isEmail(email);
};

export const isValidPassword = (password: string) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

export const isValidPhoneNumber = (input: string) => {
  // Remove spaces and dashes
  const cleaned = input.replace(/[\s-]/g, "");

  // Must be all digits (possibly with a leading +)
  const regex = /^\+?[0-9]{10,15}$/;

  return regex.test(cleaned);
};

export const isValidAddressLine1 = (addressLine1: string) => {
  if (typeof addressLine1 !== "string") return false;

  const trimmed = addressLine1.trim();

  // Enforce length limits
  if (trimmed.length < 4 || trimmed.length > 100) return false;

  // Allow letters, numbers, spaces, and common address characters
  const regex = /^[A-Za-z0-9\s#.,'’/\-]*$/;

  return regex.test(trimmed);
};

export const isValidCityName = (city: string) => {
  if (typeof city !== "string") return false;

  const trimmed = city.trim();

  // Check length
  if (trimmed.length < 2 || trimmed.length > 50) return false;

  // Allow: letters (including accents), spaces, hyphens, apostrophes, periods
  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ'.\- ]+$/;

  return regex.test(trimmed);
};

export const isValidUSState = (input: string) => {
  const usStateAbbreviations = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  if (typeof input !== "string") return false;
  return usStateAbbreviations.includes(input.trim().toUpperCase());
};

export const isValidUSZipCode = (zipCode: string) => {
  const digitsOnly = zipCode.replace(/\D/g, ""); // remove non-digits
  return /^\d{5}$/.test(digitsOnly);
};
