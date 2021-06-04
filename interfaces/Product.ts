import Category from "./Category";
import Item from "./Item";

interface Product {
  name: string;
  image: string;
  items: Item[];
  categories: Category[];
}

export default Product;
