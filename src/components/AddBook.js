import React from "react";
import { useNavigate } from "react-router-dom";
import { BOOK_API } from "../API_LINK";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

// yup is set to validate the input

const formValidationSchema = yup.object({
  title: yup
    .string()
    .min(4, "Atleast Need 4 Character for Book Title")
    .trim()
    .strict(true)
    .required("Why not? Fill the Book Title"),
  author: yup
    .string()
    .min(4, "Atleast Need 4 Character for Author Name")
    .trim()
    .strict(true)
    .required("Why not? Fill the Book Title"),
  isbn: yup
    .string()
    .min(13, "Atleast Need 13 Numbers for ISBN NUMBER")
    .max(15, "ISBN Number should be within or equal to 15")
    .required("Why not? Fill the ISBN NUMBER")
    .matches(/^[0-9._%+-]{13,15}$/, "Enter Valid ISBN Number (only number)"),
  publish: yup
    .string()
    .min(10, "Valid Publish Date need 10 characters (01-01-0001)")
    .max(12, "Publish Date should be within or equal to 15")
    .required("Why not? Fill the Publish Date")
    .matches(
      /^[0-9._%+-]{10,12}$/,
      "Enter Valid Publish Date (dd-mm-yyyy - 01-01-0001)"
    ),
});

// This is Add Book Component
function AddBook() {
  const navigate = useNavigate();

  // formik is used to set the initial values and corresponding crud operations while submitting
  // also navigates to books list component after the submit button is clicked
  const formik = useFormik({
    initialValues: { title: "", author: "", isbn: "", publish: "" },
    validationSchema: formValidationSchema,
    onSubmit: (values) => {
      fetch(`${BOOK_API}/books/`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then(() => navigate("/"));
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="container mt-5 d-flex flex-column"
    >
      <h1 className="text-center">ADD NEW BOOK DATA</h1>
      <TextField
        type="text"
        id="outlined-basic title"
        name="title"
        label="Enter Book Title"
        variant="outlined"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <div className="mb-3">
        {formik.touched.title && formik.errors.title ? formik.errors.title : ""}
      </div>
      <TextField
        type="text"
        id="outlined-basic author"
        name="author"
        label="Enter Book Author"
        variant="outlined"
        value={formik.values.author}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <div className="mb-3">
        {formik.touched.author && formik.errors.author
          ? formik.errors.author
          : ""}
      </div>
      <TextField
        type="number"
        id="outlined-basic isbn"
        name="isbn"
        label="Enter Book ISBN"
        variant="outlined"
        value={formik.values.isbn}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <div className="mb-3">
        {formik.touched.isbn && formik.errors.isbn ? formik.errors.isbn : ""}
      </div>
      <TextField
        type="text"
        id="outlined-basic publish"
        name="publish"
        label="Enter Book Publish Date"
        variant="outlined"
        value={formik.values.publish}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <div className="mb-3">
        {formik.touched.publish && formik.errors.publish
          ? formik.errors.publish
          : ""}
      </div>
      <Button color="success" variant="contained" type="submit">
        ADD NEW BOOK DATA
      </Button>
    </form>
  );
}

export default AddBook;
