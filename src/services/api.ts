const BASE_URL = 'https://world.openfoodfacts.org/api/v2';

export interface Product {
  code: string;
  product: {
    product_name: string;
    nutriments: {
      salt_100g?: number;
      sodium_100g?: number;
    };
    serving_size?: string;
  };
}

export const searchProductByBarcode = async (barcode: string): Promise<Product> => {
  const response = await fetch(`${BASE_URL}/product/${barcode}`);
  if (!response.ok) {
    throw new Error('Produit non trouvé');
  }
  return response.json();
};