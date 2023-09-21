import React, { useEffect, useState } from "react";
import { Space, Table, Button, Modal } from "antd";
import axios from "axios";
import InsertFormService from "../component/Popup/InsertService";
import EditFormService from "../component/Popup/PopUpEdit/EditFormService";

function Service() {
  const [state, setstate] = useState([]);
  const [loading, setloading] = useState(true);
  const [formServiceVisible, setFormServiceVisible] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [formEditServiceVisible, setFormEditServiceVisible] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    name_en: "",
    logo_en: "",
    title_en: "",
  });
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    console.log("fetch");
    await axios
      .get("http://localhost:8000/api/v1/service/getsevice?language=en")
      .then((result) => {
        console.log(result);
        setloading(false);
        setstate(result.data.data);
      });
  };

  const columns = [
    {
      title: "ຊື້",
      dataIndex: "name_en",
      render: (text) => (
        <div>
          <a>{text}</a>
        </div>
      ),
    },
    {
      title: "ຫົວຂໍ້",
      dataIndex: "title_en",
      render: (text) => (
        <div>
          <a>{text}</a>
        </div>
      ),
    },
    {
      title: "ຮູບພາບ",
      dataIndex: "logo_en",
      render: (image_en) => (
        <img
          className="bg-gray-200 w-20"
          src={`http://localhost:8000/${image_en}`}
        />
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
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
              handleAddServiceEdit(record._id);

              setFormData({
                _id: record._id || "",
                name_en: record.name_en || "",
                logo_en: record.logo_en || "",
                title_en: record.title_en || "",
              });
            }}
          >
            ແກ້ໄຂ
          </Button>
        </Space>
      ),
    },
  ];
  //insert data
  const handleAddService = () => {
    setFormServiceVisible(true);
  };

  const handleFormHomeClose = () => {
    setFormServiceVisible(false);
  };

  //edit
  const handleAddServiceEdit = (itemid) => {
    setFormEditServiceVisible(true);
  };

  const handleFormServiceEditClose = () => {
    setFormEditServiceVisible(false);
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
        `http://localhost:8000/api/v1/service/deletesevice/${deleteItemId}`
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
        onClick={handleAddService}
      >
        ເພີ່ມ
      </Button>
      <Table loading={loading} columns={columns} dataSource={state} />
      <Modal
        title={
          <span className="custom-modal-title">ເພີ່ມຂໍ້ມູນການບໍລິການ</span>
        }
        visible={formServiceVisible}
        onCancel={handleFormHomeClose}
        footer={null}
        destroyOnClose={true}
      >
        <InsertFormService onClose={handleFormHomeClose} />
      </Modal>

      <Modal
        title={
          <span className="custom-modal-title">ແກ້ໄຂຂໍ້ມູນການບໍລິການ</span>
        }
        visible={formEditServiceVisible}
        onCancel={handleFormServiceEditClose}
        footer={null}
        destroyOnClose={true}
      >
        <EditFormService
          data={formData}
          Setdata={setFormData}
          onClose={handleFormServiceEditClose}
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

export default Service;
