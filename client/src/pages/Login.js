import React, { useEffect, useState } from "react";
import { Form, message } from "antd";
import Input from "antd/lib/input/Input";
import { Link, useNavigate } from "react-router-dom";
import "../resources/authentication.css";
import axios from "axios";
import Spinner from "../components/Spinners";

function Login() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", values);
            localStorage.setItem(
                "Expense_Tracker.users",
                JSON.stringify({ ...response.data, password: "" })
            );
            setLoading(false)
            message.success("Login successful");
            navigate("/");
        } catch (error) {
            setLoading(false)
            message.error("Login failed");
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
                <div className="col-md-4">
                    <Form layout="vertical" onFinish={onFinish}>
                        <h1>Login</h1>
                        <hr />
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
                            <Link to="/register">Not Registered , Click Here To Register</Link>
                            <button className="primary" type="submit">
                                Login
                            </button>
                        </div>
                    </Form>
                </div>
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
            </div>
        </div>
    );
}

export default Login;