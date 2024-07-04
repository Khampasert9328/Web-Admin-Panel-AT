import { useState } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import PropTypes from "prop-types"; // Ensure PropTypes is imported correctly

const MyFormComponent = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name_en: "",
    surname_en: "",
    position_en: "",
    logo_en: null,
  });

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      logo_en: file,
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
      formDataToSend.append("name_en", formData.name_en);
      formDataToSend.append("surname_en", formData.surname_en);
      formDataToSend.append("position_en", formData.position_en);
      formDataToSend.append("logo_en", formData.logo_en);

      await axios.post(`https://api-at.onrender.com/api/v1/teams/insertteams?language=en`, formDataToSend);

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
      <Form.Item label="ຊື່" name="name_en" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="ນາມສະກຸນ" name="surname_en" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="ຕຳແໜ່ງ" name="position_en" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <input type="file" name="logo_en" onChange={handleImage} />

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
MyFormComponent.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default MyFormComponent;
