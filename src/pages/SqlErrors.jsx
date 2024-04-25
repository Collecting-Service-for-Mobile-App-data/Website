// React import for component definition and state management
import * as React from "react";
// Material UI components for constructing the table layout
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import moment from "moment";
import { FaSortAmountDown, FaSortAmountUp, FaSort } from "react-icons/fa";
// Icon from Material UI for the download button
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
// Importing the list of SQL error-customers and a dummy file for download
import dummy from "../assets/dummy.pdf";
import { Checkbox } from "@mui/material"; // Import Checkbox from Material UI
import { useEffect, useState } from "react";
import { TableHead } from "@mui/material";
import { useLocation } from "react-router-dom";
import { getCookie } from "../auth/CookieUtils.jsx";
import { orange } from "@mui/material/colors";

// Function to handle the file download (currently only pdf, will change to BLOB (SQL-files) later.)
const handleDownload = (fileUrl, fileName) => {
  fetch(fileUrl, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + getCookie("jwt"),
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.blob();
      } else {
        throw new Error("Failed to download file");
      }
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => console.error("Error downloading file", error));
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export default function EnhancedTable() {
  // State for managing data, search, checked state, and sorting
  const [data, setData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState([]);
  const [checkedState, setCheckedState] = useState({});
  const [sortBy, setSortBy] = useState(""); // State to track sort criteria (date or checked)
  const [sortDirection, setSortDirection] = useState("asc"); // State to track sort direction (asc or desc)

  const query = useQuery();
  const companyId = query.get("companyId");

  useEffect(() => {
    const requestHeaders = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getCookie("jwt"),
      },
    };
    let url = "http://localhost:8080/api/sqlite-files/all";
    if (companyId) {
      url = `http://localhost:8080/api/sqlite-files/company/${companyId}`;
    }
    fetch(url, requestHeaders)
      .then((response) => response.json())
      .then((fetchedData) => {
        setData(fetchedData);
        setSearchInput(fetchedData);
        setFilteredResults(fetchedData);
        const initialState = {};
        fetchedData.forEach((item) => {
          const storedCheckState = localStorage.getItem(item.id);
          initialState[item.id] =
            storedCheckState !== null
              ? JSON.parse(storedCheckState)
              : Boolean(item.isChecked);
        });
        setCheckedState(initialState);
      })
      .catch((error) => console.error("Error fetching data", error));
  }, [companyId]);

  const handleCheckboxChange = (id) => {
    const currentlyChecked = checkedState[id];
    const newCheckedState = !currentlyChecked;

    // Optimistically update the UI and Local Storage
    setCheckedState((prevState) => ({
      ...prevState,
      [id]: newCheckedState,
    }));
    localStorage.setItem(id, JSON.stringify(newCheckedState)); // Update local storage immediately

    // Attempt to update the server
    fetch(`http://localhost:8080/api/sqlite-files/checked`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("jwt"),
      },
      body: JSON.stringify({ id: id, isChecked: newCheckedState }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update checked status");
          // Optionally, revert local storage if server fails
          localStorage.setItem(id, JSON.stringify(currentlyChecked));
        }
        console.log("Check status updated successfully");
      })
      .catch((error) => {
        console.error("Error updating checked state:", error);
        // Revert the checkbox state in the UI and Local Storage if the server update fails
        setCheckedState((prevState) => ({
          ...prevState,
          [id]: currentlyChecked,
        }));
        localStorage.setItem(id, JSON.stringify(currentlyChecked));
      });
  };

  // Function to filter SQL errors based on search input
  const searchItems = (searchValue) => {
    if (searchValue !== "") {
      const filteredData = searchInput.filter((item) =>
        item.user.email.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(searchInput);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const sortData = (dataToSort, sortByField, sortOrder) => {
    return dataToSort.slice().sort((a, b) => {
      if (sortByField === "date") {
        return sortOrder === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      } else if (sortByField === "checked") {
        return sortOrder === "asc"
          ? (checkedState[a.id] ? -1 : 1) - (checkedState[b.id] ? -1 : 1)
          : (checkedState[b.id] ? -1 : 1) - (checkedState[a.id] ? -1 : 1);
      }
      return 0;
    });
  };

  const handleSortClick = (sortField) => {
    const newSortDirection =
      sortField === sortBy ? (sortDirection === "asc" ? "desc" : "asc") : "asc";
    setSortBy(sortField);
    setSortDirection(newSortDirection);
    const sortedData = sortData(filteredResults, sortField, newSortDirection);
    setFilteredResults(sortedData);
  };

  const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    margin-top: 20px;
  `;

  // Styled component for individual buttons
  const SortButton = styled.button`
    padding: 8px 16px; // Padding for better touch area
    cursor: pointer; // Cursor pointer to indicate clickable
    &:hover {
      background-color: #e0e0e0; // Slightly darker on hover for feedback
    }
  `;

  // Component rendering the UI
  return (
    <Paper sx={{ width: "100%", boxShadow: "none", marginTop: 5 }}>
      <h1 className="text-4xl font-bold mb-6 text-center">SQL Errors</h1>
      {/* Search input field */}
      <div style={{ width: "40%", margin: "auto" }}>
        <form action="#" onSubmit={handleFormSubmit}>
          <div className="relative w-full">
            <input
              type="text"
              className="w-full p-2 rounded-[450px] bg-gray-200 font-semibold px-7"
              placeholder="Search bar"
              onChange={(e) => searchItems(e.target.value)}
            />
            {/* Decorative search icon */}
            <div className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-black rounded-e-[450px] border border-l-gray-300 border-l-1 focus:ring-0 focus:outline-gray-800">
              <svg
                className="w-12 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </div>
          </div>
        </form>
      </div>
      <ButtonsContainer>
        <SortButton onClick={() => handleSortClick("date")}>
          Sort by Date:{" "}
          {sortBy === "date" ? (
            sortDirection === "asc" ? (
              <FaSortAmountUp />
            ) : (
              <FaSortAmountDown />
            )
          ) : (
            <FaSort />
          )}
        </SortButton>
        <SortButton onClick={() => handleSortClick("checked")}>
          Sort by Done:{" "}
          {sortBy === "checked" ? (
            sortDirection === "asc" ? (
              <FaSortAmountUp />
            ) : (
              <FaSortAmountDown />
            )
          ) : (
            <FaSort />
          )}
        </SortButton>
      </ButtonsContainer>
      {/* Table displaying SQL errors */}
      <TableContainer
        component={Paper}
        sx={{ boxShadow: "none", maxHeight: 600, width: "70%", margin: "auto" }}
      >
        <Table sx={{ width: 800, margin: "auto" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <TableCell>State</TableCell>
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Date & Time</TableCell>
              <TableCell>User</TableCell>
              <TableCell></TableCell>
              <TableCell>Download</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredResults.map((item) => (
              <TableRow key={item.id} sx={{}}>
                {/* Table cells for error details */}
                <TableCell align="center">
                  <Checkbox
                    checked={!!checkedState[item.id]} // Ensure this evaluates to true or false correctly
                    onChange={() => handleCheckboxChange(item.id)}
                    aria-label={`Mark error ${item.id} as checked`}
                    sx={{
                      color: orange[800], // default color when not checked
                      "&.Mui-checked": {
                        color: orange[600], // color when checked
                      },
                    }}
                  />
                </TableCell>
                <TableCell
                  align="right"
                  scope="row"
                  sx={{
                    fontSize: "1rem",
                    borderBottom: "1px solid black",
                    paddingBottom: "5px",
                    paddingTop: "40px",
                  }}
                >
                  {item.id}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "1rem",
                    borderBottom: "1px solid black",
                    paddingBottom: "5px",
                    paddingTop: "40px",
                  }}
                >
                  {new Date(item.date).toLocaleDateString("nb-NO")}{" "}
                  {moment(item.date).format("HH:mm")}
                  {/* Include HH:mm for hours and minutes */}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontSize: "1rem",
                    borderBottom: "1px solid black",
                    paddingBottom: "5px",
                    paddingTop: "40px",
                  }}
                >
                  {item.user.email}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontSize: "1rem",
                    borderBottom: "1px solid black",
                    paddingBottom: "5px",
                    paddingTop: "40px",
                  }}
                >
                  {item.file}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "1rem",
                    borderBottom: "1px solid black",
                    paddingBottom: "5px",
                    paddingTop: "40px",
                  }}
                >
                  {/* Download button for each error */}
                  <button
                    onClick={() => {
                      const downloadUrl = `http://localhost:8080/api/sqlite-files/download/${item.id}`;
                      const fileName = `sqlite_file_${item.id}.db`;
                      handleDownload(downloadUrl, fileName);
                    }}
                  >
                    <FileDownloadOutlinedIcon />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
