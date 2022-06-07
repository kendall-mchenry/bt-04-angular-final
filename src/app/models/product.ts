export class Product {
  id: number = 0;
  itemName: string = '';
  description: string = '';
  price: number = 0;
  imageUrl: string = '';

  // This could be other info used as a dropdown for color/size/etc.
  itemInfo?: string = '';

  // Default in-stock to be true (that means false would be out of stock)
  outOfStock: boolean = false;

  // Inventory count
  inventory?: number = 0;
}
