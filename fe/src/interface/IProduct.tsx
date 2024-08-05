export interface IProduct {
    _id?: number | string;
    name: string;
    images?: { 
        image1?: string; 
    };
    price: number;
    desc?: string; 
    categoryId: number | string;
    quality: number,
}
