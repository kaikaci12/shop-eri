import { useContext, useEffect, useState } from "react";
import data from "../data.json";
import { IProductData } from "../types.d";
import { orderContext } from "../App";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
type TProps = {
  handleAddProduct: Function;
  searchResults: IProductData[];
};
export default function HomePage({ searchResults, handleAddProduct }: TProps) {
  const [productData, setProductData] = useState<IProductData[]>(data);

  useEffect(() => {
    if (searchResults.length > 0) {
      setProductData(searchResults);
    } else {
      setProductData([]);
    }
  }, [searchResults]);
  return (
    <div>
      <Banner />
      <div className="bg-white flex flex-wrap gap-[60px] p-[32px]">
        {productData.map((product) => {
          return (
            <Link key={product.id} to={`/product/${product.id}`}>
              <div className="w-[300px] flex flex-col gap-[16px]">
                <img
                  src={product?.image}
                  alt="product-image"
                  className="w-full"
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
                  }}
                  className="bg-orange-400 w-[50%] h-[50px] px-[16px] flex items-center text-white font-bold text-xl"
                >
                  შეკვეთებში დამატება
                </button>
              </div>
            </Link>
          );
        })}
        {searchResults.length === 0 && (
          <div className="text-[3rem] font-bold">პროდუქტი ვერ მოიძებნა</div>
        )}
      </div>
    </div>
  );
}
