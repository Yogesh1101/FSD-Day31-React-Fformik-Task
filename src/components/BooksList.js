import React, { useEffect, useState } from "react";
import { BOOK_API } from "../API_LINK";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  styled,
  TableCell,
  tableCellClasses,
  TableBody,
  Paper,
} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Link, useNavigate } from "react-router-dom";


// This is Books List Component
function BooksList() {
  const [books, setBooks] = useState([]);

  const navigate = useNavigate();

  // getting the data from api and storing it in books variable to display
  const getBooks = () => {
    fetch(`${BOOK_API}/books`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setBooks(data));
  };

  useEffect(() => {
    getBooks();
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  // Table is used to display all the Books list 
  // The Books list contains Book Name, Author Name, ISBN Number and Publish Date
  return (
    <div className="container mt-5">
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">ID</StyledTableCell>
              <StyledTableCell align="center">BOOK NAME</StyledTableCell>
              <StyledTableCell align="center">AUTHOR NAME</StyledTableCell>
              <StyledTableCell align="center">ISBN NUMBER</StyledTableCell>
              <StyledTableCell align="center">PUBLISH DATE</StyledTableCell>
              <StyledTableCell align="center">EDIT</StyledTableCell>
              <StyledTableCell align="center">DELETE</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((data) => (
              <StyledTableRow key={data.id}>
                <StyledTableCell align="left">{data.id}</StyledTableCell>
                <StyledTableCell align="center">{data.title}</StyledTableCell>
                <StyledTableCell align="center">{data.author}</StyledTableCell>
                <StyledTableCell align="center">{data.isbn}</StyledTableCell>
                <StyledTableCell align="center">{data.publish}</StyledTableCell>
                <StyledTableCell align="center">
                  {/* It will navigate to book edit page when the edit icon is clicked */}
                  <Link to={`book-edit/${data.id}`}>
                    <EditRoundedIcon
                      color="success"
                      onClick={() => navigate(`/book-edit/${data.id}`)}
                    ></EditRoundedIcon>
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {/* Here the book data is deleted when the delete is clicked */}
                  <DeleteRoundedIcon
                    color="error"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      fetch(`${BOOK_API}/books/${data.id}`, {
                        method: "DELETE",
                      }).then(() => getBooks());
                    }}
                  ></DeleteRoundedIcon>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default BooksList;
