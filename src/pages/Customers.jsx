// Import useState hook from React for managing component state.
import  { useState } from "react";
// Import various components from @mui/material to construct a table.
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// Import the customers data from a local file.
import { data } from "../assets/data";
import { TableHead } from "@mui/material";

const { customers } = data;

export default function CustomersPage() {
    // useState hook to manage the search input state.
  const [searchInput, setSearchInput] = useState("");
   // useState hook to manage the state of filtered results.
  const [filteredResults, setFilteredResults] = useState(customers);
  // Function to handle search. It filters the customers based on the input value.
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = customers.filter((item) => {
        return item.name.toLowerCase().includes(searchValue.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(customers);
    }
  };

  // The component's return statement renders the UI of the page.
  return (
    <Paper sx={{ width: "100%", boxShadow: "none", marginTop: 5 }}>
      {/* Title for the Customers page */}
      <h1 className="text-4xl font-bold mb-6 text-center">Customers</h1>
      {/* Search bar container */}
      <div style={{ width: "40%", margin: "auto" }}>
        <div className="relative w-full">
          <input
            type="text"
            className="w-full p-2 rounded-[450px] bg-gray-200 font-semibold px-7"
            placeholder="Search bar"
            onChange={(e) => searchItems(e.target.value)}
          />
          {/* Search icon (uninteractive atm) */}
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
      </div>
      {/* Table to display the customers */}
      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          {/* Table body where each row represents a customer */}
          <TableBody>
            {filteredResults.map((item) => (
              <TableRow key={item.id}>
                <TableCell
                  // component="th"
                  align="left"
                  scope="row"
                  sx={{
                    fontSize: "1rem",
                    borderBottom: "1px solid black",
                  }}
                >
                  {item.id}
                </TableCell>

                <TableCell
                  align="left"
                  sx={{
                    fontSize: "1rem",
                    borderBottom: "1px solid black",
                  }}
                >
                  {item.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
