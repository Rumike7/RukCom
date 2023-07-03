export interface User{
  id: string;
  email:string;
  password:string;
  password_confirmation?:string;
  username:string;
  firstName: string;
  lastName: string;
  phone: number;
  token?:string;
  admin?:boolean;
  uuid?:string;
  seller?:boolean;
  shipping_address_id?: number;
  payment_method_id?: number;
  created_at?: string;
  updated_at?: string;

}

export interface PaymentMethod {
  creditCardNumber: string;
  expirationDate: Date;
  cvv: string;
  billingAddress: string;
}
export interface ShippingAddress {
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
}

