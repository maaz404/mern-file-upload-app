import React, { useState } from "react";
import axios from "axios";

function UploadForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [filePreview, setFilePreview] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFilePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !file) {
      setMessage("Please fill in all fields and select a file");
      setMessageType("error");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("file", file);

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/form-data",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFormData({ name: "", description: "" });
      setFile(null);
      setFilePreview(null);
      setMessage("Form submitted successfully!");
      setMessageType("success");

      document.getElementById("file").value = "";
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Error submitting form. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Upload Form</h2>
      <div className="form-container">
        {message && <div className={`message ${messageType}`}>{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter a description"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="file">Upload File:</label>
            <input type="file" id="file" onChange={handleFileChange} />
            <small>
              Supported files: Images (JPEG, PNG, GIF) and PDF documents (max
              5MB)
            </small>
          </div>

          {filePreview && (
            <div className="file-preview">
              <h4>File Preview:</h4>
              <img
                src={filePreview}
                alt="Preview"
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadForm;
