import React, { useEffect, useState, useRef } from "react";
import { Space, Table, Button, Modal } from "antd";

import { ExclamationCircleFilled } from "@ant-design/icons";
import axios from "axios";

import FormTeams from "../component/Popup/PopupForm";
import { Datum, DeleteTeamsModels } from "../models/DeleteTeamsModels";
import EditFormTeams from "../component/Popup/PopUpEdit/EditFormTeams";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

function Teams() {
  const [state, setstate] = useState<DeleteTeamsModels | null>(null);
  const [loading, setloading] = useState(true);
  const [formTeamVisible, setFormTeamVisible] = useState(false);
  const [formTeamEditVisible, setFormTeamEditVisible] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<DeleteTeamsModels | null>(
    null
  );

  const [formData, setFormData] = useState({
    _id: "",
    name_en: "",
    surname_en: "",
    position_en: "",
    logo_en: "",
  });
  const [loadingimage, setLoadingimage] = useState(false);
  useEffect(() => {
    setLoadingimage(true);
    setTimeout(() => {
      setLoadingimage(false);
    }, 5000);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    console.log("fetch");
    await axios
      .get<DeleteTeamsModels>(
        `https://api-at.onrender.com/api/v1/teams/getteams`
      )
      .then((result) => {
        console.log(result);
        setloading(false);
        setstate(result.data);
      });
  };
  const pageSize = 10;
  let currentPage = 1;
  const columns = [
    {
      title: "ລະດັບ",
      key: `_id`,
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "ຊື່",
      dataIndex: "name_en",
      render: (text) => (
        <div>
          <a>{text}</a>
        </div>
      ),
    },
    {
      title: "ນາມສະກຸນ",
      dataIndex: "surname_en",
      render: (text) => (
        <div>
          <a>{text}</a>
        </div>
      ),
    },
    {
      title: "ຕຳແໜ່ງ",
      dataIndex: "position_en",
      render: (text) => (
        <div>
          <a>{text}</a>
        </div>
      ),
    },
    {
      title: "ຮູບພາບ",
      dataIndex: "logo_en",
      render: (record: Datum) => (
        <img
          className={`${loadingimage ? "" : "image-fade-in"}`}
          src={`https://api-at.onrender.com/${record}`}
          alt="Image"
          onLoad={() => setLoadingimage(false)}
          style={{ width: "100px", height: "100px" }}
        />
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (record: Datum) => (
        <Space>
          <Button
            className="bg-red-500 hover:bg-blue-700 text-white font-bold  rounded"
            onClick={() => showDeleteConfirm(record._id)}
          >
            ລົບ
          </Button>
          <Button
            className="bg-green-500 hover:bg-blue-700 text-white font-bold  rounded"
            onClick={() => {
              setFormData({
                _id: record._id || "",
                name_en: record.name_en || "",
                surname_en: record.surname_en || "",
                position_en: record.position_en || "",
                logo_en: record.logo_en || "",
              });
              handleAddTeamEdit(record._id);
            }}
          >
            ແກ້ໄຂ
          </Button>
        </Space>
      ),
    },
  ];
  //insert data
  const handleAddTeam = () => {
    setFormTeamVisible(true);
  };

  const handleFormTeamsClose = () => {
    setFormTeamVisible(false);
  };
  //Edit
  const handleAddTeamEdit = (itemId) => {
    setFormTeamEditVisible(true);
  };

  const handleFormTeamsEditClose = () => {
    setFormTeamEditVisible(false);
  };

  //delete data
  const showDeleteConfirm = (itemId) => {
    setDeleteItemId(itemId);
    setDeleteConfirmVisible(true);
  };
  const handleDelete = async () => {
    try {
      // Send a DELETE request with Axios using the deleteItemId
      await axios.delete(
        `https://api-at.onrender.com/api/v1/teams/deleteteams/${deleteItemId}`
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
      <div className="header">
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded mb-4"
          onClick={handleAddTeam}
        >
          ເພີ່ມ
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto padding-16px">
        <Table
          loading={loading}
          columns={columns}
          dataSource={state?.data}
          pagination={{
            onChange: (page) => {
              currentPage = page;
            },
          }}
        />
      </div>

      <Modal
        title={<span className="custom-modal-title">ເພີ່ມຂໍ້ມູນທີມ</span>}
        visible={formTeamVisible}
        onCancel={handleFormTeamsClose}
        footer={null}
        destroyOnClose={true}
      >
        <FormTeams onClose={handleFormTeamsClose} />
      </Modal>

      <Modal
        title={<span className="custom-modal-title">ແກ້ໄຂຂໍ້ມູນທີມ</span>}
        visible={formTeamEditVisible}
        onCancel={handleFormTeamsEditClose}
        footer={null}
        destroyOnClose={true}
      >
        <EditFormTeams
          data={formData}
          Setdata={setFormData}
          onClose={handleFormTeamsEditClose}
        />
      </Modal>

      <Modal
        title="ແຈ້ງເຕືອນ"
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
        ທ່ານຕ້ອງການທີ່ຈະລົບຂໍ້ມູນນີ້ແທ້ ຫຼື ບໍ່?
      </Modal>

      <style>{`
        .custom-modal-title {
          color: black;
        }
        .teams-container {
          height: 100%; /* Set the desired height here */
          display: flex;
          flex-direction: column;
        }
        .image-fade-in {
          opacity: 0;
          animation: fadeIn 3s ease-in-out forwards;
        }
        
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        
        // ... your other styles ...
      `}</style>
    </div>
  );
}

export default Teams;
