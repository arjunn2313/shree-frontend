import React, { useEffect, useState } from "react";
import { IoFilterOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getStocks } from "../../../services/admin/adminSlice";
import Paginations from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

export default function AdminStock() {
  const heading = [
    "Sl. no.",
    "Product code",
    "Category",
    "Sub Category",
    "Product",
    "Updated On",
    "Available Qty.",
    "",
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalStock = useSelector((state) => state?.admin?.totalstock?.result);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [itemsPerPage] = useState(10);
  const [pageLength, setPageLength] = useState();
  const stock = useSelector((state) => state?.admin?.totalstock);
  const [filter,setFilter] = useState("asc")
  useEffect(() => {
    dispatch(getStocks({ itemsPerPage, currentPage, search,filter }));
  }, [currentPage,filter]);

  useEffect(() => {
    if (stock) {
      setPageLength(stock?.totalPages);
    }
  }, [stock]);

 

  const truncateString = (str, maxLength) => {
    if (str.length <= maxLength) {
      return str;
    } else {
      return str.slice(0, maxLength) + "...";
    }
  };

  return (
    <>
      <div className="mx-auto bg-white mt-2" style={{ width: "98%",height:'80vh' }}>
        {/* header */}
        <div className="d-flex w-100 justify-content-between bg-white p-3">
          <div className="d-flex w-100 flex-wrap justify-content-between gap-4">
            <h5>Stocks</h5>
           
            <Dropdown>
              <Dropdown.Toggle
                variant=""
                id="dropdown-basic"
                className="d-flex justify-content-center align-items-center gap-1 border"
              >
                <IoFilterOutline size={20} />
                Filters
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={()=>setFilter("asc")}>low to high</Dropdown.Item>
                <Dropdown.Item onClick={()=>setFilter("dsc")}> high to low </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="d-flex w-100 flex-wrap gap-3 align-items-end justify-content-end ">
            <button className="btn btn-success d-flex justify-content-center align-items-center gap-2"
            onClick={()=>navigate("/admin/upload-product/add")}
            >
              <FaPlus size={20} />
              New Product
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                {heading.map((heading, index) => (
                  <th key={index}>{heading}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {totalStock?.map((product, index) => (
                <tr key={index}>
                  <td>{product.slno}</td>
                  <td>{product.productName.productCode}</td>
                  <td>{product.productName.categories}</td>
                  <td>{product.productName.subCategories}</td>
                  <td>{truncateString(product.productName.productName, 18)}</td>
                  {product.productName.stockUpdate ? (
                    <td>{product.productName.stockUpdate}</td>
                  ) : (
                    <td>Not yet updated</td>
                  )}
                  <td>{product.totalStock}</td>
                  <td>
                    <button
                      className="border-success rounded-3 btn text-success btn-sm fw-medium"
                      onClick={() =>
                        navigate(
                          `/admin/upload-product/edit/stock/${product?.productName?._id}`
                        )
                      }
                    >
                      Add more
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Paginations
        setCurrentPage={setCurrentPage}
        pageLength={pageLength}
        currentPage={currentPage}
      />
    </>
  );
}
