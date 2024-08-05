export interface IOder{
    userId: string|number,
    name: string,
    address: string,
    phone: number,
	total : number,
    status: string,
	products: [{
        id: string|number,
        name: string,
        image:string,
        price:number,
        quantity: number, 
		
    }],
}