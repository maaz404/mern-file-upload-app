import React, { useState, useEffect } from "react";
import { Card, Table, Button, message, Typography, Space, Popconfirm } from "antd";
import { ReloadOutlined, DeleteOutlined, FileOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title } = Typography;

function DataList() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchEntries();
  }, [refreshKey]);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/form-data");
      setEntries(response.data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Error loading data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEntry = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/form-data/${id}`);
      message.success("Entry deleted successfully!");
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error deleting entry:", error);
      message.error("Failed to delete entry. Please try again.");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "40%",
    },
    {
      title: "File",
      dataIndex: "originalFilename",
      key: "file",
      render: (filename, record) => (
        <a
          href={`http://localhost:5000${record.filePath}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FileOutlined /> {filename}
        </a>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this entry?"
          onConfirm={() => handleDeleteEntry(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button 
            type="primary" 
            danger 
            icon={<DeleteOutlined />}
            size="small"
          >
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Title level={2}>Saved Entries</Title>
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              onClick={() => setRefreshKey((prevKey) => prevKey + 1)}
            >
              Refresh Data
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={entries}
            rowKey="_id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
            }}
            locale={{
              emptyText: "No entries found. Please add some data first.",
            }}
          />
        </Space>
      </Card>
    </div>
  );
}

export default DataList;
