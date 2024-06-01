import data from "../data.json";
export default function HomePage() {
  return (
    <div className="bg-white flex flex-wrap gap-[30px] p-[32px]">
      {data.map((product) => {
        return (
          <div key={product.id} className="w-[300px]">
            <img src={product?.image} alt="product-image" className="w-full" />
            <div className="flex flex-col gap-[12px]">
              <h2 className="">{product.name}</h2>
              <p>{product.description.slice(0, 100)}...</p>
              <span className="text-orange-400 text-[2rem] font-bold">
                {product.price}ლ
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
