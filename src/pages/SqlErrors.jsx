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
import { Checkbox } from "@mui/material"; // Import Checkbox from Material UI
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCookie } from "../auth/CookieUtils.jsx";
import { orange } from "@mui/material/colors";
import { format } from "date-fns";

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
  const [checkedState, setCheckedState] = useState({});

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
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (!data.length) {
          throw new Error("No data received");
        }
        setSearchInput(data);
        setFilteredResults(data);
        const initialState = {};
        data.forEach((item) => {
          const storedCheckState = localStorage.getItem(item.id);
          initialState[item.id] =
            storedCheckState !== null
              ? JSON.parse(storedCheckState)
              : Boolean(item.isChecked);
        });
        setCheckedState(initialState);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
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
                  {format(new Date(item.date), "MMMM do yyyy, h:mm:ss a")}
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
                ></TableCell>
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
