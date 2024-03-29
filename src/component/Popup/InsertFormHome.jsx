import React, { useState } from "react";
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
    // Update the form data when any field changes
    setFormData({
      ...formData,
      ...changedValues,
    });
  };

  const handleSubmit = async () => {
    try {
      // Create a FormData object to send the file and other form data
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("logo", formData.logo);
      formDataToSend.append("image", formData.image);
  
      // Send a POST request with Axios
      await axios.post(
        `https://api-at.onrender.com/api/v1/home/inserthome?language=en`,
        formDataToSend
      );
  
      // Handle success, e.g., show a success message
      console.log("Data submitted successfully!");
  
      // Close the form or perform other actions (e.g., reset form fields)
      onClose();
    } catch (error) {
      // Handle error, e.g., show an error message
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
      onValuesChange={handleChange} // This event handler will be called when form fields change
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
          onClick={handleSubmit} // This will submit the form data when the button is clicked
        >
          ບັນທຶກ
        </Button>
      </Form.Item>
    </Form>
  );
};

export default InsertFormHome;
