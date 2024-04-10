// React import for component definition and state management
import * as React from "react";
// Material UI components for constructing the table layout
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// Icon from Material UI for the download button
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
// Importing the list of SQL error-customers and a dummy file for download
import dummy from "../assets/dummy.pdf";
import {useEffect, useState} from "react";
import { useLocation } from 'react-router-dom';


// Function to handle the file download (currently only pdf, will change to BLOB (SQL-files) later.)
const handleDownload = (fileUrl) => {
  const fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export default function EnhancedTable() {
  // State for managing search input and filtered results
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState([]);

  const query = useQuery();
  const companyId = query.get('companyId');

  useEffect(() => {
    let url = 'http://localhost:8080/api/sqlite-files/all';
    if(companyId) {
      url = `http://localhost:8080/api/sqlite-files/company/${companyId}`;
    }
    fetch(url)
        .then(response => response.json())
        .then(data => {
          setSearchInput(data);
          setFilteredResults(data);
        })
        .catch(error => console.error("Error fetching data", error));
  }, [companyId]);

  // Function to filter SQL errors based on search input
  const searchItems = (searchValue) => {
    if(searchValue !== "") {
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
  }

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
        {/* Table displaying SQL errors */}
        <TableContainer
            component={Paper}
            sx={{ boxShadow: "none", maxHeight: 600, width: "70%", margin: "auto" }}
        >
          <Table sx={{ width: 800, margin: "auto" }} aria-label="simple table">
            <TableBody>
              {filteredResults.map((item) => (
                  <TableRow key={item.id} sx={{}}>
                    {/* Table cells for error details */}
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
                      {item.date}
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
                            handleDownload(dummy);
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
