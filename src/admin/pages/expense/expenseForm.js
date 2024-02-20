import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { adminConfig } from "../../../api/api";
import { useDispatch } from "react-redux";
import { getAllExpenses } from "../../../services/admin/adminSlice";

function ExpenseModal({ lgShow, setLgShow, id }) {
  const [expense, setExpense] = useState({});
  const [errors, setErrors] = useState({});
  const [currentDate, setCurrentDate] = useState("");
  const dispatch = useDispatch()
  console.log(id);
  useEffect(() => {
    // Function to format the current date as 'YYYY-MM-DD'
    const getFormattedDate = () => {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
      return `${day}/${month}/${year}`;
    };
    setCurrentDate(getFormattedDate());
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:6060/expense/getSingleExpense/${id}`,adminConfig)
        .then((res) => {
          console.log(res.data);
          setExpense(res.data)
        }).catch((error)=>{
          console.log(error);
        })
    }
  },[id]);

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = {};

    if (!expense.category) {
      error.category = "please enter category";
    }
    if (!expense.subCategory) {
      error.subCategory = "please enter sub category";
    }
    if (!expense.amount) {
      error.amount = "please enter amount";
    }
    if (!expense.description) {
      error.description = "please enter description";
    }
    if (!expense.status) {
      error.status = "please select current status";
    }

    if (Object.keys(error).length > 0) {
      setErrors(error);
    } else {
      // expense.date = currentDate;
      try {
        axios
          .post("http://localhost:6060/expense/add", expense,adminConfig)
          .then(() => {
            toast.success("New expense added");
            setExpense({
              category: "",
              subCategory: "",
              amount: "",
              description: "",
              status: "",
            });
            
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpdate = (e) =>{
    e.preventDefault()
    axios.post(`http://localhost:6060/expense/updateExpense/${id}`,expense,adminConfig).then(()=>{
      toast.success("updated")
      setLgShow(false)
      
        dispatch(getAllExpenses())
   
    
    }).catch((error)=>{
      console.log(error);
    })
  }

  return (
    <>
      {/* <Button onClick={() => setLgShow(true)}>Large modal</Button> */}

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg" className="TColor">
            Add Expense
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row" onSubmit={handleSubmit}>
            <div className="col-6 mb-3">
              <label className="form-label fw-medium">Date</label>
              <input
                type="text"
                className="form-control"
                value={currentDate}
                onChange={handleChange}
              />
              {/* {errors.category  && <span className="form-error">{errors.category}</span>} */}
            </div>

            <div className="col-6 mb-3">
              <label className="form-label fw-medium">Category</label>
              <input
                type="text"
                className="form-control"
                value={expense.category}
                name="category"
                onChange={handleChange}
              />
              {errors.category && (
                <span className="form-error">{errors.category}</span>
              )}
            </div>

            <div className="col-6 mb-3">
              <label className="form-label fw-medium">Sub Category</label>
              <input
                type="text"
                className="form-control"
                value={expense.subCategory}
                name="subCategory"
                onChange={handleChange}
              />
              {errors.subCategory && (
                <span className="form-error">{errors.subCategory}</span>
              )}
            </div>

            <div className="col-6 mb-3">
              <label className="form-label fw-medium">Amount</label>
              <input
                type="text"
                className="form-control"
                value={expense.amount}
                name="amount"
                onChange={handleChange}
              />
              {errors.amount && (
                <span className="form-error">{errors.amount}</span>
              )}
            </div>

            <div className="col-12 mb-3">
              <label className="form-label fw-medium">Description</label>
              <textarea
                className="form-control"
                rows="5"
                value={expense.description}
                name="description"
                onChange={handleChange}
              ></textarea>
              {errors.description && (
                <span className="form-error">{errors.description}</span>
              )}
            </div>

            <div className="col-12 d-flex my-4 gap-5">
              <label className="form-label fw-medium">Status</label>
              <span className="d-flex gap-2 text-success">
                <input
                  type="radio"
                  className="form-check-input border-success"
                  name="status"
                  value="paid"
                  checked={expense.status === "paid"}
                  onChange={handleChange}
                />
                Paid
              </span>
              <span className="d-flex gap-2 text-danger">
                <input
                  type="radio"
                  className="form-check-input border-danger"
                  name="status"
                  value="unpaid"
                  checked={expense.status === "unpaid"}
                  onChange={handleChange}
                />
                Unpaid
              </span>
              {errors.category && (
                <span className="form-error">{errors.status}</span>
              )}
            </div>

            <div className="col-12 d-flex justify-content-end gap-3 mt-5 mb-3">
              <button className="btn border-0 Tcolor fw-medium" type="button">
                Discard
              </button>

              {id ? 
                <button className="btn btn-success px-4" onClick={handleUpdate}>
                Update
              </button>
              :
                <button className="btn btn-success px-4" type="submit">
                Save
              </button>
            }
            
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ExpenseModal;
