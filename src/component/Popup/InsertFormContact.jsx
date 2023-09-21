import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";

const InsertFormContact = ({ onClose }) => {
  const [formData, setFormData] = useState({
    tell_en: "",
    email_en: "",
    facebook_en: "",
    location_en: "",
    logo_en: "",
  });

  const handleImage1 = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      logo_en: file,
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
      formDataToSend.append("tell_en", formData.tell_en);
      formDataToSend.append("email_en", formData.email_en);
      formDataToSend.append("facebook_en", formData.facebook_en);
      formDataToSend.append("location_en", formData.location_en);
      formDataToSend.append("logo_en", formData.logo_en);
  
      // Send a POST request with Axios
      await axios.post(
        `${apiurl}/api/v1/contact/insertcontact?language=en`,
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
      <Form.Item label="ເບີໂທ" name="tell_en" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="ອີເມລ" name="email_en" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="ເຟສບຸກ" name="facebook_en" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="ສະຖານທີ່" name="location_en" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <input type="file" name="logo_en" onChange={handleImage1} />

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

export default InsertFormContact;
