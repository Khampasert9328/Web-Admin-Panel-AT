// this file is not use in project 
import React, { useState } from "react";
import ShowDialogSuccess from "../Dialog/Success";
import axios from "axios";

function FormInsertData({ visible, onClose }) {

    const [images1, setImage1]=useState('');
    const handleImage1=(e)=>{
      setImage1(e.target.files[0])

    }
    const [images2, setImage2]=useState('');
    const handleImage2=(e)=>{
      setImage2(e.target.files[0])

    }
  
  const handleOnClose = () => {
    onClose();
  };
  if (!visible) return null;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 blackdrop-blur-sm flex justify-center items-center">
      <div className=" bg-white p-4 rounded w-100">
        <div className="flex justify-end">
          <button
            onClick={handleOnClose}
            className="bg-gray-200 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-blue-300"
          >
            X
          </button>
        </div>
        <h1>ປ້ອນຂໍ້ມູນຂອງທ່ານ</h1>
        <div className="flex justify-start">
          <h1>ປ້ອນຊື່ບໍລິສັດ*</h1>
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            className="border border-gray700 p-2 rounded mb-5"
            placeholder="ປ້ອນຊື່ບໍລິສັດ"
            
          />
        </div>
        <div className="flex justify-start">
          <h1>ເລືອກຮູບພາບທີ1*</h1>
        </div>
        <div className="flex flex-row py-2 ">
          <input type="file" name="file"  onChange={handleImage1}/>
         
        </div>
        <div className="flex justify-start">
          <h1>ເລືອກຮູບພາບທີ2*</h1>
        </div>
        <div className="flex flex-row py-2">
        <input type="file" name="file"  onChange={handleImage2}/>
        <h1>ເລືອກຮູບ</h1>
        </div>
        <div className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-blue-300">
          <button type="submit" onClick={ShowDialogSuccess}>ບັນທຶກຂໍ້ມູນ</button>
        </div>
      </div>
    </div>
  );
}

export default FormInsertData;

