import React, { useState, useEffect } from "react";
import axios from "axios";

function DataList() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchEntries();
  }, [refreshKey]);
  const fetchEntries = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/form-data");
      setEntries(response.data.data || []);
      setError("");
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error loading data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEntry = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        await axios.delete(`http://localhost:5000/api/form-data/${id}`);
        setRefreshKey((prevKey) => prevKey + 1);
      } catch (error) {
        console.error("Error deleting entry:", error);
        alert("Failed to delete entry. Please try again.");
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <h2>Saved Entries</h2>

      {error && <div className="error-message">{error}</div>}

      <button
        onClick={() => setRefreshKey((prevKey) => prevKey + 1)}
        className="refresh-button"
      >
        Refresh Data
      </button>

      {entries.length === 0 ? (
        <p>No entries found. Please add some data first.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>File</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry._id}>
                <td>{entry.name}</td>
                <td>{entry.description}</td>
                <td>
                  <a
                    href={`http://localhost:5000${entry.filePath}`}
                    className="file-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {entry.originalFilename}
                  </a>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteEntry(entry._id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DataList;
