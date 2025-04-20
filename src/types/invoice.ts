
export interface InvoiceItem {
  id: string;
  description: string;
  hsnCode: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface ProfileData {
  companyName: string;
  tagline: string;
  address: string;
  email: string;
  phone: string;
  mobile: string;
  gstin: string;
  bankName: string;
  accountNumber: string;
  branchName: string;
  ifscCode: string;
  logoUrl: string;
  signatureUrl: string;
}
