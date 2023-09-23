import React, { useEffect, useState } from "react";
import { Space, Table, Button ,Modal} from "antd";
import axios from "axios";
import EditFormAbout from "../component/Popup/PopUpEdit/EditFormAbout";

function About() {
  const [state, setstate] = useState([]);
  const [loading, setloading] = useState(true);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [formEditAboutVisible, setFormEditAboutVisible] = useState(false);
  const [loadingimage, setLoadingimage] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    title_en: "",
    logo_en: "",
  });
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    console.log("fetch");
    await axios
      .get(`https://api-at.onrender.com/api/v1/about/getabout?language=en`)
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
      title: "ຫົວຂໍ້",
      dataIndex: "title_en",
      render: (text) => <div style={{ whiteSpace: 'normal', width:"400px"}}><a  >{text}</a></div>,
    },
    {
      title: "ໂຄງສ້າງ",
      dataIndex: "logo_en",
      render: (logo_en) => (
        <img
            className={`${loadingimage ? "" : "image-fade-in"}`}
            src={`https://api-at.onrender.com/${logo_en}`}
            alt="Image"
            onLoad={() => setLoadingimage(false)}
            style={{ width: "100px", height: "100px", background: "gray" }}
          />
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
          <Button className="bg-green-500 hover-bg-blue-700 text-white font-bold  rounded"
          onClick={()=>{
            setFormData({
              _id: record._id || "",
              title_en: record.title_en || "",
              logo_en: record.logo_en || "",
            });
            handleAddAboutEdit(record._id)
          }}>
            ແກ້ໄຂ
          </Button>
        </Space>
      ),
    },
  ];

  const handleAddAboutEdit = (itemid) => {
    setFormEditAboutVisible(true);
  };

  const handleFormAboutEditClose = () => {
    setFormEditAboutVisible(false);
  };


   // Delete data
   const showDeleteConfirm = (itemId) => {
    setDeleteItemId(itemId);
    setDeleteConfirmVisible(true);
  };
  const handleCancelDelete = () => {
    setDeleteConfirmVisible(false);
  };

  const handleDelete = async () => {
    try {
      // Send a DELETE request with Axios using the deleteItemId
      await axios.delete(
        `https://api-at.onrender.com/api/v1/about/deleteabout/${deleteItemId}`
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
  return (
    <div className="teams-container">

      <Table loading={loading} columns={columns} dataSource={state} pagination={{
          onChange:(page)=>{
            currentPage = page
          }
        }}/>

      <Modal
        title={<span className="custom-modal-title">ແກ້ໄຂຂໍ້ມູນກ່ຽວກັບ</span>}
        visible={formEditAboutVisible}
        onCancel={handleFormAboutEditClose}
        footer={null}
        destroyOnClose={true}
      >
        <EditFormAbout data={formData} Setdata={setFormData}  onClose={handleFormAboutEditClose} />
      </Modal>

      <Modal
        title="ລຶບຂໍ້ມູນ"
        visible={deleteConfirmVisible}
        onCancel={handleCancelDelete}
        footer={[
          <Button key="cancel" onClick={handleCancelDelete}>
            ບໍ່! ຕົກລົງ
          </Button>,
          <Button
            key="delete"
            type="primary"
            danger
            onClick={handleDelete}
          >
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

export default About