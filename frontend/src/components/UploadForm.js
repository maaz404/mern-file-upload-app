import React, { useState } from "react";
import { Card, Form, Input, Upload, Button, message, Typography, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;

function UploadForm() {
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filePreview, setFilePreview] = useState(null);

  const handleFileChange = (info) => {
    const selectedFile = info.file.originFileObj || info.file;
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

  const handleSubmit = async (values) => {
    if (!file) {
      message.error("Please select a file");
      return;
    }

    const data = new FormData();
    data.append("name", values.name);
    data.append("description", values.description);
    data.append("file", file);

    setLoading(true);

    try {
      await axios.post(
        "http://localhost:5000/api/form-data",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      form.resetFields();
      setFile(null);
      setFilePreview(null);
      message.success("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <Card>
        <Title level={2}>Upload Form</Title>
        
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <TextArea
              rows={4}
              placeholder="Enter a description"
            />
          </Form.Item>

          <Form.Item label="Upload File">
            <Upload
              beforeUpload={() => false}
              onChange={handleFileChange}
              maxCount={1}
              accept="image/*,.pdf"
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
            <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
              Supported files: Images (JPEG, PNG, GIF) and PDF documents (max 5MB)
            </div>
          </Form.Item>

          {filePreview && (
            <Form.Item label="File Preview">
              <Image
                src={filePreview}
                alt="Preview"
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
            </Form.Item>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} size="large">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default UploadForm;
