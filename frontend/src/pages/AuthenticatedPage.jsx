import React , { useState } from "react";
import Header from "../components/Header";
import "../styles/AuthenticatedPage.scss";
import Button from "../components/Button";
import "../styles/Button.scss";
import { Link } from 'react-router-dom'
import {Modal } from 'antd';
import createIcon from '../assets/create.png';
import alertIcon from '../assets/alert.png';
import dashboardIcon from '../assets/dashboard.png';

const AuthenticatedPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  }
  return (
    <div className="auth-container">
      <Header />
      <Modal  title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    
      </Modal>

      <div className="text-center flex justify-around items-center mt-20  flex-wrap">
        {/* <a onClick={showModal} href="#"> */}
          <div className="flex flex-col justify-center items-center auth-box ">
            <img
              // src="https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png"
              src={createIcon}
              style={{width:'10rem', height:'10rem'}}
              alt="create alert"
              srcset=""

              className="icons"
            />
            
             <Link to="/create-alert">
             <div className="btn-bottom mt-2">
             <Button
                customClass={"absolute text-center btn-border"}
                text={"Create Alert"}
              ></Button>
               </div>
             </Link>
           
          </div>
        {/* </a> */}
        <div className="flex flex-col justify-center items-center auth-box ">
          <img
            src={alertIcon}
            style={{width:'11rem', height:'11rem'}}
            alt="alerts"
            srcset=""
            className="icons"
          />
          <Link to="/alerts">
          <div className="btn-bottom">
            <Button
              customClass={"absolute text-center btn-border"}
              text={"Show Alerts"}
            ></Button>
          </div>
          </Link>
        </div>
        <Link to="/dashboard">

        <div className="flex flex-col justify-center items-center auth-box ">
          <img
            src={dashboardIcon}
            style={{width:'11rem', height:'11rem'}}
            alt=""
            srcset=""
            className="icons"
          />
          <div className="btn-bottom">
            <Button
              customClass={"absolute text-center btn-border"}
              text={"Dashboard"}
            ></Button>
          </div>
        </div>
        </Link>
      </div>
    </div>
  );
};
export default AuthenticatedPage
