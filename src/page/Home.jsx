import React, { useEffect, useState } from "react";
import { Space, Table, Button, Modal } from "antd";
import axios from "axios";
import InsertFormHome from "../component/Popup/InsertFormHome";
import EditFormHome from "../component/Popup/PopUpEdit/EditFormHome";

function Home() {
  const [state, setstate] = useState([]);
  const [loading, setloading] = useState(true);
  const [formHomeVisible, setFormHomeVisible] = useState(false);
  const [formEditHomeVisible, setFormEditHomeVisible] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    logo: "",
    image: "",
  });
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    console.log("fetch");
    await axios
      .get(`https://api-at.onrender.com/api/v1/home/gethome?language=en`)
      .then((result) => {
        console.log(result);
        setloading(false);
        setstate(result.data.data);
      });
  };

  const pageSize =10;
let currentPage =1;
  const columns = [
    {
      title: "ລະດັບ",
      key: `_id`,
      render: (text, record, index) => (
        currentPage-1
        
      )*pageSize+index+1
    },
    {
      title: "ຊື່ບໍລິສັດ",
      dataIndex: "name_en",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "ຮູບພາບທີ1",
      dataIndex: "logo_en",
      render: (logo_en) => (
        <img className="w-20"loading="lazy"  src={`https://api-at.onrender.com/${logo_en}`} />
      ),
    },
    {
      title: "ຮູບພາບທີ2",
      dataIndex: "image_en",
      render: (image_en) => (
        <img className="w-20" loading="lazy" src={`https://api-at.onrender.com/${image_en}`} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            className="bg-red-500 hover:bg-blue-700 text-white font-bold  rounded"
            onClick={() => showDeleteConfirm(record._id)}
          >
            ລົບ
          </Button>
          <Button
            className="bg-green-500 hover-bg-blue-700 text-white font-bold  rounded"
            onClick={() => {
              setFormData({
                _id: record._id || "",
                name_en: record.name_en || "",
                logo_en: record.logo_en || "",
                image_en: record.image_en || "",
              });
              handleAddHomeEdit(record._id);
            }}
          >
            ແກ້ໄຂ
          </Button>
        </Space>
      ),
    },
  ];

  //insert data
  const handleAddHome = () => {
    setFormHomeVisible(true);
  };

  const handleFormHomeClose = () => {
    setFormHomeVisible(false);
  };

  //Edit
  const handleAddHomeEdit = (itemid) => {
    setFormEditHomeVisible(true);
  };

  const handleFormHomeEditClose = () => {
    setFormEditHomeVisible(false);
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
        `https://api-at.onrender.com/api/v1/home/deletehome/${deleteItemId}`
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
    <div className="teams-container">
      <Button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded mb-4"
        onClick={handleAddHome}
      >
        ເພີ່ມ
      </Button>

      <Table loading={loading} columns={columns} dataSource={state} pagination={{
          onChange:(page)=>{
            currentPage = page
          }
        }}/>

      <Modal
        title={<span className="custom-modal-title">ເພີ່ມຂໍ້ມູນໜ້າຫຼັກ</span>}
        visible={formHomeVisible}
        onCancel={handleFormHomeClose}
        footer={null}
        destroyOnClose={true}
      >
        <InsertFormHome onClose={handleFormHomeClose} />
      </Modal>

      <Modal
        title={<span className="custom-modal-title">ແກ້ໄຂຂໍ້ມູນໜ້າຫຼັກ</span>}
        visible={formEditHomeVisible}
        onCancel={handleFormHomeEditClose}
        footer={null}
        destroyOnClose={true}
      >
        <EditFormHome data={formData} Setdata={setFormData}  onClose={handleFormHomeEditClose} />
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
        .teams-container {
          height: 100%; /* Set the desired height here */
          overflow: auto; /* Add scrollbars if content overflows the container */
        }
      `}</style>
    </div>
  );
}

export default Home;
