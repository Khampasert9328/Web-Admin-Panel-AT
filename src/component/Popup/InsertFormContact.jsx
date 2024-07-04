import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Button, Form, Input } from "antd";
import axios from "axios";

const InsertFormHome = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    logo: null,
    image: null,
  });

  const handleImage1 = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      logo: file,
    });
  };

  const handleImage2 = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleChange = (changedValues) => {
    setFormData({
      ...formData,
      ...changedValues,
    });
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("logo", formData.logo);
      formDataToSend.append("image", formData.image);

      await axios.post(
        `https://api-at.onrender.com/api/v1/home/inserthome?language=en`,
        formDataToSend
      );

      console.log("Data submitted successfully!");
      onClose();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <Form
      layout="vertical"
      name="wrap"
      labelAlign="left"
      labelWrap
      colon={false}
      onValuesChange={handleChange}
    >
      <Form.Item label="ຊື່ບໍລິສັດ" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <input type="file" name="logo" onChange={handleImage1} />
      <input type="file" name="image" onChange={handleImage2} />
      <Form.Item style={{ marginTop: "auto", textAlign: "right" }}>
        <Button
          type="primary"
          htmlType="button"
          style={{ backgroundColor: "green" }}
          onClick={handleSubmit}
        >
          ບັນທຶກ
        </Button>
      </Form.Item>
    </Form>
  );
};

// Define prop types for your component
InsertFormHome.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default InsertFormHome;
