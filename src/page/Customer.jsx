import React, { useEffect, useState } from "react";
import { Space, Table, Button, Modal } from "antd";
import axios from "axios";
import InsertFormCutomer from "../component/Popup/InsertFormCustomer";
import EditFormCustomer from "../component/Popup/PopUpEdit/EditCustomer";

function Customer() {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formCustomerVisible, setFormCustomerVisible] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [formEditCustomerVisible, setFormEditCustomerVisible] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    logo: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    console.log("fetch");
    await axios
      .get("http://localhost:8000/api/v1/customers/getcustomers")
      .then((result) => {
        console.log(result);
        setLoading(false);
        setState(result.data.data);
      });
  };

  const columns = [
    {
      title: "ຊື່",
      dataIndex: "name",
      render: (text) => (
        <div style={{ whiteSpace: "normal" }}>
          <a>{text}</a>
        </div>
      ),
    },
    {
      title: "ໂລໂກ້",
      dataIndex: "logo",
      render: (image_en) => (
        <div className="w-400px pr-30">
          <img className="w-20" src={`http://localhost:8000/${image_en}`} />
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div>
          <Space>
            <Button
              className="bg-red-500 hover:bg-blue-700 text-white font-bold rounded"
              onClick={() => showDeleteConfirm(record._id)}
            >
              ລົບ
            </Button>
            <Button
              className="bg-green-500 hover:bg-blue-700 text-white font-bold rounded"
              onClick={() => {
                setFormData({
                  _id: record._id || "",
                  name: record.name || "",
                  logo: record.logo || "",
                });
                handleAddCustomerEdit(record._id);
              }}
            >
              ແກ້ໄຂ
            </Button>
          </Space>
        </div>
      ),
    },
  ];

  const handleAddCustomer = () => {
    setFormCustomerVisible(true);
  };

  const handleFormCutomerClose = () => {
    setFormCustomerVisible(false);
  };
  //edit
  const handleAddCustomerEdit = (itemid) => {
    setFormEditCustomerVisible(true);
  };

  const handleFormCustomerEditClose = () => {
    setFormEditCustomerVisible(false);
  };

  // Delete data
  const showDeleteConfirm = (itemId) => {
    setDeleteItemId(itemId);
    setDeleteConfirmVisible(true);
  };
  const handleDelete = async () => {
    try {
      // Send a DELETE request with Axios using the deleteItemId
      await axios.delete(
        `http://localhost:8000/api/v1/customers/deletecustomers/${deleteItemId}`
      );

      // Handle success, e.g., show a success message or update the data
      console.log("Data deleted successfully!");

      // Close the delete confirmation modal
      setDeleteConfirmVisible(false);

      // Fetch data again or update the state to reflect the changes
      getData();
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Error deleting data:", error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmVisible(false);
  };

  return (
    <div className="service-container">
      <Button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded mb-4"
        onClick={handleAddCustomer}
      >
        ເພີ່ມ
      </Button>

      <Table loading={loading} columns={columns} dataSource={state} />

      <Modal
        title={<span className="custom-modal-title">ເພີ່ມຂໍ້ມູນລູກຄ້າ</span>}
        visible={formCustomerVisible}
        onCancel={handleFormCutomerClose}
        footer={null}
        destroyOnClose={true}
      >
        <InsertFormCutomer onClose={handleFormCutomerClose} />
      </Modal>

      <Modal
        title={<span className="custom-modal-title">ແກ້ໄຂຂໍ້ມູນລູກຄ້າ</span>}
        open={formEditCustomerVisible}
        onCancel={handleFormCustomerEditClose}
        footer={null}
        destroyOnClose={true}
      >
        <EditFormCustomer
          data={formData}
          Setdata={setFormData}
          onClose={handleFormCustomerEditClose}
        />
      </Modal>

      <Modal
        title="ລຶບຂໍ້ມູນ"
        visible={deleteConfirmVisible}
        onCancel={handleCancelDelete}
        footer={[
          <Button key="cancel" onClick={handleCancelDelete}>
            ບໍ່! ຕົກລົງ
          </Button>,
          <Button key="delete" type="primary" danger onClick={handleDelete}>
            ຕົກລົງ
          </Button>,
        ]}
        destroyOnClose={true}
      >
        ທ່ານຕ້ອງການລົບຂໍ້ມູນນີ້ແທ້ ຫຼື ບໍ່?
      </Modal>

      <style jsx>{`
        .service-container {
          height: 100%; /* Set the desired height here */
          overflow: auto; /* Add scrollbars if content overflows the container */
        }
      `}</style>
    </div>
  );
}

export default Customer;
