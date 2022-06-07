export class Product {
  id: number = 0;
  itemName: string = '';
  description: string = '';
  price: number = 0;
  imageUrl: string = '';

  // This could be other info used as a dropdown for color/size/etc.
  // itemColor?: string = '';
  // itemSize?: string = '';

  // Drop down to select level of durability (light, medium, tough)
  itemDurability: string = '';

  // Default in-stock to be true (that means false would be out of stock)
  inStock: boolean = true;

  // Inventory count
  inventoryCount: number = 1;
}
