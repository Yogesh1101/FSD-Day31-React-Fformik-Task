import React, { useEffect, useState } from "react";
import { AUTHOR_API } from "../API_LINK";
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

// This is Author List Component
function AuthorsList() {
  const [authors, setAuthors] = useState([]);

  const navigate = useNavigate();

  // getting the data from api and storing it in authors variable to display
  const getAuthors = () => {
    fetch(`${AUTHOR_API}/authors`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setAuthors(data));
  };

  useEffect(() => {
    getAuthors();
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

  // Table is used to display all the Authors list 
  // The Authors list contains Author Name, Birth Date and Short Bio
  return (
    <div className="container mt-5">
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">ID</StyledTableCell>
              <StyledTableCell align="center">AUTHOR NAME</StyledTableCell>
              <StyledTableCell align="center">BIRTH DATE</StyledTableCell>
              <StyledTableCell align="center">SHORT BIO</StyledTableCell>
              <StyledTableCell align="center">EDIT</StyledTableCell>
              <StyledTableCell align="center">DELETE</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authors.map((data) => (
              <StyledTableRow key={data.id}>
                <StyledTableCell align="left">{data.id}</StyledTableCell>
                <StyledTableCell align="center">{data.name}</StyledTableCell>
                <StyledTableCell align="center">{data.birth}</StyledTableCell>
                <StyledTableCell align="center">{data.bio}</StyledTableCell>
                <StyledTableCell align="center">
                  {/* It will navigate to author edit page when the edit icon is clicked */}
                  <Link to={`/author-edit/${data.id}`}>
                    <EditRoundedIcon
                      color="success"
                      onClick={() => navigate(`/author-edit/${data.id}`)}
                    ></EditRoundedIcon>
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {/* Here the author data is deleted when the delete is clicked */}
                  <DeleteRoundedIcon
                    color="error"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      fetch(`${AUTHOR_API}/authors/${data.id}`, {
                        method: "DELETE",
                      }).then(() => getAuthors());
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

export default AuthorsList;
