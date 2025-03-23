import { Product } from "../components/models/producto";

export const getProductos = async (): Promise<Product[]> => {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        return data.map((item: any) => ({
            id:item.id,
            title:item.title,
            price:item.price,
            description:item.description,
            category:item.category,
            image:item.image,
            rating:item.rating
        }));
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        return [];
    }
};



