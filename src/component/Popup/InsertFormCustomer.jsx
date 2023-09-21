import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";

const InsertFormCutomer = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    logo: null,
  });

  const handleImage1 = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      logo: file,
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
  
      // Send a POST request with Axios
      await axios.post(
        `${apiurl}/api/v1/customers/insertcustomers`,
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
      <Form.Item label="ຊື່ລູກຄ້າ" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <input type="file" name="logo" onChange={handleImage1} />

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

export default InsertFormCutomer;
