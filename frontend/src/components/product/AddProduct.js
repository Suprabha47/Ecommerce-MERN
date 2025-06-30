import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import InformationSection from "./InformationSection";
import CategorySection from "./CategorySection";
import { toast, ToastContainer } from "react-toastify";
import SEOSection from "./SEOSection";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const validationSchema = Yup.object({
  productName: Yup.string().required("Required"),
  productDescription: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
  image: Yup.mixed().required("Image Required"),
  discountPrice: Yup.number().required("Required"),
  seoTitle: Yup.string().required("Required"),
  seoDescription: Yup.string().required("Required"),
});

const AddProduct = () => {
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState({
    productName: "",
    productDescription: "",
    price: "",
    image: null,
    discountPrice: "",
    seoTitle: "",
    seoDescription: "",
  });
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .post("http://localhost:3001/product-details", { id })
        .then((res) => {
          console.log("product details: ", res.data.data);
          setInitialData(res.data.data);
          console.log("initial data: ", initialData);
        })
        .catch((err) => console.log("product detail error: ", err));
    }
  }, [id]);

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    if (!id) {
      axios
        .post("http://localhost:3001/add-product", values)
        .then((res) => {
          toast.success("Product Added!");
        })
        .catch((err) => {
          toast.error(err.response.data);
        });
    }
    axios
      .put("http://localhost:3001/edit-product", { _id: id, p: values })
      .then((res) => {
        toast.success("Product Updated!\nNavigating to Products page.", {
          autoClose: 3000,
        });
        console.log("navigating?");
        setTimeout(() => navigate("/dashboard/products"), 3000);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });

    setInitialData({
      productName: "",
      productDescription: "",
      price: "",
      image: null,
      discountPrice: "",
      seoTitle: "",
      seoDescription: "",
    });
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center m-3 ">
        <h4>Products</h4>
      </div>
      <Link
        to="/dashboard/products"
        className="text-blue text-decoration-none mx-3  "
      >
        Back
      </Link>
      <Formik
        initialValues={initialData}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values }) => (
          <Form className="container mt-4">
            <div className="row">
              <div className="col-md-8">
                <InformationSection />
              </div>

              <div className="col-md-4">
                <CategorySection />

                <SEOSection />
              </div>
            </div>
            <div className="text-end mb-3">
              <button type="submit" className="btn btn-primary px-4">
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </>
  );
};
export default AddProduct;
