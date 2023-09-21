import React, { useEffect, useState } from "react";
import { Space, Table, Button, Modal } from "antd";
import axios from "axios";
import InsertFormProduct from "../component/Popup/InsertFormProduct";
import EditFormProduct from "../component/Popup/PopUpEdit/EditFormProduct";

function Products() {
  const [state, setstate] = useState([]);
  const [loading, setloading] = useState(true);
  const [formProductVisible, setFormProductVisible] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [formEditProductVisible, setFormEditProductVisible] = useState(false);
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
      .get(`${apiurl}/api/v1/products/getproducts?language=en`)
      .then((result) => {
        console.log(result);
        setloading(false);
        setstate(result.data.data);
      });
  };

  const columns = [
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
        <img className="w-20 h-15" src={`${apiurl}/${image_en}`} />
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
              setFormData({
                _id: record._id || "",
                name_en: record.name_en || "",
                logo_en: record.logo_en || "",
                title_en: record.title_en || "",
              });
              handleAddProductEdit(record._id);
            }}
          >
            ແກ້ໄຂ
          </Button>
        </Space>
      ),
    },
  ];

  //insert data
  const handleAddProduct = () => {
    setFormProductVisible(true);
  };

  const handleFormProductClose = () => {
    setFormProductVisible(false);
  };
  //edit
  const handleAddProductEdit = (itemid) => {
    setFormEditProductVisible(true);
  };

  const handleFormProductEditClose = () => {
    setFormEditProductVisible(false);
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
        `${apiurl}/api/v1/products/deleteproducts/${deleteItemId}`
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
    <div className="products-container">
      <Button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded mb-4"
        onClick={handleAddProduct}
      >
        ເພີ່ມ
      </Button>

      <Table loading={loading} columns={columns} dataSource={state} />

      <Modal
        title={<span className="custom-modal-title">ເພີ່ມຂໍ້ມູນໂປຣດັກ</span>}
        visible={formProductVisible}
        onCancel={handleFormProductClose}
        footer={null}
        destroyOnClose={true}
      >
        <InsertFormProduct onClose={handleFormProductClose} />
      </Modal>

      <Modal
        title={<span className="custom-modal-title">ແກ້ໄຂຂໍ້ມູນໂປຣດັກ</span>}
        open={formEditProductVisible}
        onCancel={handleFormProductEditClose}
        footer={null}
        destroyOnClose={true}
      >
        <EditFormProduct
          data={formData}
          Setdata={setFormData}
          onClose={handleFormProductEditClose}
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
        .products-container {
          height: 100%; /* Set the desired height here */
          overflow: auto; /* Add scrollbars if content overflows the container */
        }
      `}</style>
    </div>
  );
}

export default Products;
