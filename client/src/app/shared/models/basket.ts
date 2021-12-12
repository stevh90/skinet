import {v4 as uuidv4} from 'uuid';
export class Basket implements IBasket{
    id = uuidv4();
    items: IBasketItem[] = [];
}
export interface IBasket {
    id: string;
    items: IBasketItem[];
}
export interface IBasketItem {
    id: number;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    brand: string;
    type: string;
}

export interface IBasketTotals{
    shipping: number;
    subtotal: number;
    total: number;
    tax: number
}
