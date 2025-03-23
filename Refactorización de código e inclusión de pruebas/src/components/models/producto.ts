interface RatingInterface {
    rate: number;
    count: number;
  }

export interface Product{
    id:string,
    title:string,
    price:number,
    description:string,
    category:string,
    image:string,
    rating:RatingInterface
}