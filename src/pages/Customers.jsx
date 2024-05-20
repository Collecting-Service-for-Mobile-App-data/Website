// Customers.jsx
// This component displays a list of customers and their details.

  import  { useState, useEffect } from "react";
  import Table from "@mui/material/Table";
  import TableBody from "@mui/material/TableBody";
  import TableCell from "@mui/material/TableCell";
  import TableContainer from "@mui/material/TableContainer";
  import TableRow from "@mui/material/TableRow";
  import Paper from "@mui/material/Paper";
  import { TableHead } from "@mui/material";
  import { useNavigate } from "react-router-dom";
  import {getCookie} from "../auth/CookieUtils.jsx";

/**
 * CustomersPage component
 * Fetches and displays a list of customers from an API, with search functionality.
 */

  export default function CustomersPage() {
    const [filteredResults, setFilteredResults] = useState([]);
    const [companies, setCompanies] = useState([]); // State to hold fetched companies
    const navigate = useNavigate();

/**
* Fetches customer data from the API and updates state.
*/
    useEffect(() => {
      const requestHeaders = {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + getCookie("jwt")
        }
      };
      fetch('http://129.241.153.179:8080/api/company/companies', requestHeaders)
          .then(response => response.json())
          .then(data => {
            setCompanies(data);
            setFilteredResults(data);
          })
          .catch(error => console.error('Error fetching data: ', error));
    }, []);

/**
 * Filters the companies based on the search input value.
* @param {string} searchValue - The value to filter the companies by.
 */
    const searchItems = (searchValue) => {
      if (searchValue !== "") {
        const filteredData = companies.filter((item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredResults(filteredData);
      } else {
        setFilteredResults(companies);
      }
    };
  
    /**
   * Handles the row click and navigates to the SQL errors page for the selected company.
   * @param {number} companyId - The ID of the company to view errors for.
   */
    const handleRowClick = (companyId) => {
      navigate(`/sql-errors?companyId=${companyId}`);
    };

    return (
      <Paper sx={{ width: "100%", boxShadow: "none", marginTop: 5 }}>
        <h1 className="text-4xl font-bold mb-6 text-center">Customers</h1>
        <div style={{ width: "40%", margin: "auto" }}>
          <div className="relative w-full">
            <input
              type="text"
              className="w-full p-2 rounded-[450px] bg-gray-200 font-semibold px-7"
              placeholder="Search bar"
              onChange={(e) => searchItems(e.target.value)}
            />
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
        <TableContainer
        component={Paper}
        sx={{ boxShadow: "none", maxHeight: 600, width: "70%", margin: "auto" }}
      >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredResults.map((item) => (
                <TableRow key={item.id} onClick={() => handleRowClick(item.id)}>
                  <TableCell
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
