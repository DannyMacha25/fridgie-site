export interface Item {
    id?: number;
    name?: string;
    expirationDate?: string;
    purchaseDate?: string;
    quantity?: number;
    upc?: string;
    category: string;
    storageLocationId?: number;
}