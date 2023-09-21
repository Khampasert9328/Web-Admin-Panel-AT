import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";

const EditFormCustomer = ({ onClose, data, Setdata }) => {
  const [displayLogo, setDisplayLogo] = useState(false);

  const handleImage1 = (e) => {
    const file = e.target.files[0];
    setDisplayLogo(true);
    Setdata({
      ...data,
      logo: file ?? data.logo,
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
      formDataToSend.append("name", data.name);
      formDataToSend.append("logo", data.logo);

      // Send an HTTP PUT request to update the data
      await axios.put(
        `${apiurl}/api/v1/customers/updatecustomer/${data._id}`,
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
        label="ຊື່"
        name="name"
        initialValue={data.name} // Set initialValue to prepopulate the field
      >
        <Input />
      </Form.Item>

      <img
        className="w-30 h-30 py-2"
        src={`${apiurl}/${data.logo}`}
        alt=""
      />
      

      <input className="py-2" type="file" name="logo_en" onChange={handleImage1} />
     

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

export default EditFormCustomer;
