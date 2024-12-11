
export interface CatalogItemProps {
  id: string,
    name: string,
    description: string,
    price: number,
    slug: string,
    year: string,
    material: string,
    width: number,
    height: number,
    gicle: boolean,
    state: boolean,
    state_url: boolean,
    image: object, 
    file: boolean,
    tags: object[],
    gicles: [],
}

export interface Variant {
  id: string;
  width: number;
  height: number;
  price: number;
  state: string;
}

export interface PurchaseItem {
  id: string;
  gicleeNumber: number;
  state: string | null;
  state_url: string | null;
  variants: Variant[];
}

export interface FormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  message: string;
  agreementOne: boolean;
  agreementTwo: boolean;
}
