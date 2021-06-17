import Category from "./Category";
import Item from "./Item";

interface Product {
  id: number;
  name: string;
  image: string;
  items: Item[];
  categories: Category[];
}

export default Product;
