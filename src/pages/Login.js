import React from 'react';
import logo from "../components/images/fhn-logo.png"
import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};



function Login(){
  return(


<div style={{ width: "100vw", backgroundColor:" #4B7D83",

    height: "100vh", 
    position: "relative",
    display: "flex",
    alignItems: "center"}}>
    <div className="login-wrapper" style={{ width: "350px",
    height: "400px", 
    margin:"0",
    position: "absolute",
    color:"white",
    top: "50%",
    left: "50%",
    borderRadius:"30px",
    backgroundColor:" rgba(255,255,255,0.15)",
    transform: "translate(-50%, -50%)",
    backdropFilter:" blur(10px)",
    border: "2px solid rgba(255,255,255,0.1)",
    boxShadow: "0 0 40px rgba(8,7,16,0.2)",
    padding: "50px 35px",
    display: "flex", flexDirection:'column',
    alignItems: "center"}}>    

   <img src={logo} style={{width:"100px", marginBottom:"20px"}}/>

  <Form 
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{ color:"white", display:'flex', flexDirection:"column", textAlign:"left",
    alignItems:"left", justifyContent:"center",
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item 
      label="Istifadəçi adı"
      name="username"
      rules={[
        {
          required: true,
          message: 'İstifadəçi adını daxil edin!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item 
      label="Şifrə"
      name="password"
      rules={[
        {
          required: true,
          message: 'Şifrəni daxil edin!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
     <Link to ="/passwordchange" >Şifrəni unutdum </Link>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
   Daxil ol
      </Button>
    </Form.Item>
  </Form>
  </div>    
  </div> 
  )}
export default Login;
