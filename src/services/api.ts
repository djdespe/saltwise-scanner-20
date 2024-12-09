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
  console.log('Recherche du produit:', barcode);
  const response = await fetch(`${BASE_URL}/product/${barcode}`);
  if (!response.ok) {
    console.error('Erreur API:', response.status);
    throw new Error('Produit non trouvé');
  }
  const data = await response.json();
  console.log('Données du produit:', data);
  return data;
};