import React, { useEffect, useState } from "react";
import { Form, message } from "antd";
import Input from "antd/lib/input/Input";
import { Link, useNavigate } from "react-router-dom";
import "../resources/authentication.css";
import axios from "axios";
import Spinner from "../components/Spinners";

function Register() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(true);
    const onFinish = async (values) => {
        try {
            setLoading(true)
            await axios.post("/api/users/register", values);
            message.success("Registration Successfull");
            setLoading(false)
        } catch (error) {
            message.error("Something went wrong");
            setLoading(false)
        }
    };

    useEffect(() => {
        if (localStorage.getItem('Expense_Tracker.users')) {
            navigate('/');
        }
    }, []);

    return (
        <div className="register">
            {loading && <Spinner />}
            <div className="row justify-content-center align-items-center w-100 h-100">
                <div className="col-md-5">
                    <div className="lottie">
                        <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_rV2rF4oeob.json"
                            background="transparent"
                            speed="1"
                            loop
                            autoplay>
                        </lottie-player>
                    </div>
                </div>
                <div className="col-md-4">
                    <Form layout="vertical" onFinish={onFinish}>
                        <h1>REGISTER</h1>
                        <hr />
                        <Form.Item label="Name" name="name"
                            rules={[{ required: true, message: 'Please Enter your username!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="Email" name="email"
                            rules={[{ required: true, message: 'Please Enter your Email!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="Password" name="password"
                            rules={[{ required: true, message: 'Please Enter the Password!' }]}
                        >
                            <Input type="password" />
                        </Form.Item>

                        <div className="d-flex justify-content-between align-items-center">
                            <Link to="/login">Already Registered , Click Here To Login</Link>
                            <button className="primary" type="submit">
                                REGISTER
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Register;