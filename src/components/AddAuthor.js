import React from "react";
import { useNavigate } from "react-router-dom";
import { AUTHOR_API } from "../API_LINK";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

// yup is set to validate the input
const formValidationSchema = yup.object({
  name: yup
    .string()
    .min(4, "Atleast Need 4 Character for Author Name")
    .trim()
    .strict(true)
    .required("Why not? Fill the Author Name"),
  birth: yup
    .string()
    .min(10, "Valid Birth Date need 10 characters (01-01-0001)")
    .max(12, "Birth Date should be within or equal to 15")
    .required("Why not? Fill the Birth Date")
    .matches(
      /^[0-9._%+-]{10,12}$/,
      "Enter Valid Birth Date (dd-mm-yyyy - 01-01-0001)"
    ),
  bio: yup
    .string()
    .min(30, "Atleast Need 30 Character for Author Short Bio")
    .trim()
    .strict(true)
    .required("Why not? Fill the Author Short Bio"),
});

// This is Add Author Component

function AddAuthor() {
  const navigate = useNavigate();

  // formik is used to set the initial values and corresponding crud operations while submitting
  // also navigates to authors list component after the submit button is clicked

  const formik = useFormik({
    initialValues: { name: "", birth: "", bio: "" },
    validationSchema: formValidationSchema,
    onSubmit: (values) => {
      fetch(`${AUTHOR_API}/authors/`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then(() => navigate("/authors-list"));
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="container mt-5 d-flex flex-column"
    >
      <h1 className="text-center">ADD NEW AUTHOR DATA</h1>
      <TextField
        type="text"
        id="outlined-basic name"
        name="name"
        label="Enter Author Name"
        variant="outlined"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <div className="mb-3">
        {formik.touched.name && formik.errors.name ? formik.errors.name : ""}
      </div>
      <TextField
        type="text"
        id="outlined-basic birth"
        name="birth"
        label="Enter Author Birth Date"
        variant="outlined"
        value={formik.values.birth}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <div className="mb-3">
        {formik.touched.birth && formik.errors.birth ? formik.errors.birth : ""}
      </div>
      <TextField
        type="text"
        id="outlined-basic bio"
        name="bio"
        label="Enter Author Short Bio"
        variant="outlined"
        value={formik.values.bio}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <div className="mb-3">
        {formik.touched.bio && formik.errors.bio ? formik.errors.bio : ""}
      </div>
      <Button color="success" variant="contained" type="submit">
        ADD AUTHOR DATA
      </Button>
    </form>
  );
}

export default AddAuthor;
