import { useContext, useEffect, useState } from "react";
import data from "../data.json";
import { IProductData } from "../types.d";
import { orderContext } from "../App";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import AddedToCart from "../components/AddedToCart";

type TProps = {
  handleAddProduct: Function;
  searchResults: IProductData[];
};
export type singleProduct = {
  description: string;
  id: number;
  image: string;
  name: string;
  price: number;
};
export default function HomePage({ searchResults, handleAddProduct }: TProps) {
  const [productData, setProductData] = useState<IProductData[]>(data);
  const [addedCart, setAddedCart] = useState<boolean>(false);
  const [singleProduct, setSingleProduct] = useState<singleProduct>({
    description: "",
    id: 0,
    image: "",
    name: "",
    price: 0,
  });
  useEffect(() => {
    if (searchResults.length > 0) {
      setProductData(searchResults);
    } else {
      setProductData([]);
    }
  }, [searchResults]);
  return (
    <div className=" p-[32px] sm:p-[50px]">
      <Banner />
      {addedCart && (
        <AddedToCart
          setAddedCart={setAddedCart}
          singleProduct={singleProduct}
        />
      )}
      <div className="bg-white flex flex-wrap gap-[60px]">
        {productData.map((product) => {
          return (
            <div className="" key={product.id}>
              <Link key={product.id} to={`/product/${product.id}`}>
                <div className="w-[300px] h-fit flex flex-col gap-[16px] border-solid   duration-500">
                  <img
                    src={product?.image}
                    alt="product-image"
                    className="bg-contain w-[200px] hover:w-[250px] duration-500"
                  />
                  <div className="flex flex-col gap-[12px]">
                    <span className="text-orange-400 text-[2rem] font-bold">
                      {product.price}ლ
                    </span>
                    <h2 className="">{product.name}</h2>
                    <p>{product.description.slice(0, 50)}...</p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddProduct(product);
                      setAddedCart(true);
                      setSingleProduct(product);
                    }}
                    className="bg-orange-400 w-[50%] h-[50px] px-[16px] flex items-center text-white font-bold text-xl"
                  >
                    კალათაში დამატება
                  </button>
                </div>
              </Link>
            </div>
          );
        })}
        {searchResults.length === 0 && (
          <div className="text-[3rem] font-bold">პროდუქტი ვერ მოიძებნა</div>
        )}
      </div>
    </div>
  );
}
