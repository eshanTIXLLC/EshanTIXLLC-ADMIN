import React, { useCallback, useEffect, useState } from "react";
import fetchData from "../../libs/api";
import { showErrorToast } from "../../utils/toast";
import "../css/category-list.css";
import ActionButton from "../global/ActionButton";
import ActionButtonMenu from "../global/ActionButtonMenu";
import Button from "../global/Button";
import CardHeader from "../global/CardHeader";
import IndianaDragScroller from "../global/IndianaDragScroller";
import Searchbar from "../global/Searchbar";
import SendEmail from "../global/SendEmail";
import CreateProduct from "./CreateProduct";
import DeleteProduct from "./DeleteProduct";
import EditProduct from "./EditProduct";

const ProductList = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [categories, setCategories] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  // Load more products
  const loadMoreProduct = () => setPage((prev) => prev + 1);

  // Fetch products
  const getProducts = useCallback(() => {
    setLoader(true);

    fetchData(
      `/api/v1/products?${selectedQuery}=${searchTerm}&page=${page}&limit=${limit}`,
      "GET"
    )
      .then((res) => {
        if (res.success) {
          setData((prevData) =>
            page > 1 ? [...(prevData || []), ...(res.data || [])] : res.data || []
          );
          setMessage(res.message);
        } else {
          showErrorToast(res.message);
        }
      })
      .catch(showErrorToast)
      .finally(() => setLoader(false));
  }, [selectedQuery, searchTerm, page, limit]);

  // Trigger fetch on page/query/search change
  useEffect(() => {
    const timer = setTimeout(getProducts, 400);
    return () => clearTimeout(timer);
  }, [getProducts]);

  // Fetch simple data for categories, brands, campaigns, suppliers
  const fetchSimple = (url, setter) => {
    fetchData(url, "GET").then((r) => r.success && setter(r.data));
  };

  useEffect(() => {
    fetchSimple("/api/v1/categories", setCategories);
    fetchSimple("/api/v1/brands", setBrands);
    fetchSimple("/api/v1/campaigns", setCampaigns);
    fetchSimple("/api/v1/suppliers", setSuppliers);
  }, []);

  return (
    <>
      {/* Create Product Modal */}
      <CreateProduct
        getProducts={getProducts}
        categories={categories}
        campaigns={campaigns}
        suppliers={suppliers}
        brands={brands}
      />

      <div className="col-lg-12">
        <div className="card">
          <CardHeader
            title="Products"
            modalId="#createProduct"
            buttonText="+"
            btnClass="btnAdd"
            totalCount={data.length}
          >
            <Searchbar
              queries={["name", "product_code", "barcode"]}
              selectedQuery={selectedQuery}
              setSelectedQuery={setSelectedQuery}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </CardHeader>

          <div className="card-body">
            {loader && page === 1 ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <h5>Loading...</h5>
              </div>
            ) : data.length === 0 ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <h5>No products found</h5>
              </div>
            ) : (
              <IndianaDragScroller>
                <table className="table table-responsive-md">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Code</th>
                      <th>Brand</th>
                      <th>Category</th>
                      <th>Variants (Stock & Price)</th>
                      <th>Images</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.map((item, index) => {
                      const minStock = Math.min(
                        ...item.productAttributes.map((a) => a.stockAmount)
                      );

                      const rowBg =
                        minStock === 0
                          ? "#ffe6e6"
                          : minStock <= 2
                          ? "#fff4d6"
                          : "transparent";

                      return (
                        <tr key={item.id} style={{ background: rowBg }}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.productCode}</td>
                          <td>{item.brand?.name}</td>
                          <td>{item.category?.name}</td>

                          {/* Variants */}
                          <td style={{ fontSize: "12px" }}>
                            {item.productAttributes.map((attr) => {
                              const isOut = attr.stockAmount === 0;
                              const isLow =
                                attr.stockAmount > 0 && attr.stockAmount <= 2;

                              return (
                                <div
                                  key={attr.id}
                                  style={{
                                    border: "1px solid #ddd",
                                    borderRadius: "6px",
                                    padding: "6px",
                                    marginBottom: "6px",
                                    background: isOut
                                      ? "#ffd6d6"
                                      : isLow
                                      ? "#fff2cc"
                                      : "#f9f9f9",
                                  }}
                                >
                                  <div>
                                    <strong>Size:</strong> {attr.size}
                                  </div>
                                  <div>
                                    <strong>Stock:</strong>{" "}
                                    <span
                                      style={{
                                        fontWeight: "bold",
                                        color: isOut
                                          ? "red"
                                          : isLow
                                          ? "orange"
                                          : "green",
                                      }}
                                    >
                                      {attr.stockAmount}
                                    </span>
                                  </div>
                                  <div>Cost: ${attr.costPrice}</div>
                                  <div>
                                    Retail:{" "}
                                    <span
                                      style={{
                                        textDecoration:
                                          attr.discountPercent > 0
                                            ? "line-through"
                                            : "none",
                                      }}
                                    >
                                      ${attr.retailPrice}
                                    </span>
                                  </div>
                                  {attr.discountPercent > 0 && (
                                    <>
                                      <div>Discount: {attr.discountPercent}%</div>
                                      <div style={{ color: "green" }}>
                                        Final: ${attr.discountedRetailPrice}
                                      </div>
                                    </>
                                  )}
                                </div>
                              );
                            })}
                          </td>

                          {/* Images */}
                          <td>
                            {item.images.map((img) => (
                              <img
                                key={img.id}
                                src={img.image}
                                alt=""
                                style={{
                                  width: "60px",
                                  height: "60px",
                                  objectFit: "contain",
                                  marginRight: "4px",
                                }}
                              />
                            ))}
                          </td>

                          <td>
                            {minStock === 0
                              ? "Out of stock"
                              : minStock <= 2
                              ? "Low stock"
                              : "Available"}
                          </td>

                          <td>
                            <ActionButton>
                              <ActionButtonMenu
                                menuName="Edit"
                                menuTarget={`#editProduct${item.id}`}
                              />
                              <ActionButtonMenu
                                menuName="Attributes"
                                menuLink={`/attributes/${item.id}`}
                              />
                              <ActionButtonMenu
                                menuName="Images"
                                menuLink={`/products/images/${item.id}`}
                              />
                              <ActionButtonMenu
                                menuName="Delete"
                                menuTarget={`#deleteProduct${item.id}`}
                              />
                            </ActionButton>
                          </td>

                          <EditProduct
                            item={item}
                            getProducts={getProducts}
                            categories={categories}
                            suppliers={suppliers}
                            brands={brands}
                          />
                          <DeleteProduct item={item} getProducts={getProducts} />
                          <SendEmail
                            uri={`/api/v1/products-email/${item.id}`}
                            item={item}
                            getData={getProducts}
                            modalId={`sendEmailProduct${item.id}`}
                            modalHeader="Send mail to subscribers"
                          />
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </IndianaDragScroller>
            )}

            {/* Load more button */}
            {data.length >= limit && data.length % limit === 0 && (
              <div className="text-center" style={{ marginTop: "10px" }}>
                <Button
                  buttonText="Load more"
                  fontSize="11px"
                  buttonOnClick={loadMoreProduct}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
