import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";

const EditFormContact= ({ onClose, data, Setdata }) => {
  const [displayLogo, setDisplayLogo] = useState(false);

  const handleImage1 = (e) => {
    const file = e.target.files[0];
    setDisplayLogo(true);
    Setdata({
      ...data,
      logo_en: file ?? data.logo_en,
    });
  };

  const handleChange = (changedValues) => {
    // Update the form data when any field changes
    Setdata({
      ...data,
      ...changedValues,
    });
  };

  const handleSubmit = async () => {
    try {
      // Create a FormData object to send the file and other form data
      const formDataToSend = new FormData();
      formDataToSend.append("tell_en", data.tell_en);
      formDataToSend.append("email_en", data.email_en);
      formDataToSend.append("facebook_en", data.facebook_en);
      formDataToSend.append("location_en", data.location_en);
      formDataToSend.append("logo_en", data.logo_en);

      // Send an HTTP PUT request to update the data
      await axios.put(
        `http://localhost:8000/api/v1/contact/updatecontact/${data._id}`,
        formDataToSend
      );

      // Handle success, e.g., show a success message
      console.log("Data updated successfully!");

      // Close the form or perform other actions (e.g., reset form fields)
      onClose();
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Error updating data:", error);
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
      <Form.Item
        label="ເບີໂທ"
        name="tell_en"
        initialValue={data.tell_en} // Set initialValue to prepopulate the field
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="ອີເມວ"
        name="email_en"
        initialValue={data.email_en} // Set initialValue to prepopulate the field
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="ເຟສບຸກ"
        name="facebook_en"
        initialValue={data.facebook_en} // Set initialValue to prepopulate the field
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="ສະຖານທີ່"
        name="location_en"
        initialValue={data.location_en} // Set initialValue to prepopulate the field
      >
        <Input />
      </Form.Item>

      <img
        className="w-30 h-30 py-2 "
        src={`http://localhost:8000/${data.logo_en}`}
        alt=""
      />

      <input
        className="py-2"
        type="file"
        name="logo_en"
        onChange={handleImage1}
      />

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

export default EditFormContact;
