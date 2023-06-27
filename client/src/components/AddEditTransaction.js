import React, { useState } from 'react'
import { Form, Input, Modal, Select, message } from "antd";
import Spinner from './Spinners';
import axios from 'axios';

function AddEditTransaction({
    setShowAddEditTransactionModal,
    showAddEditTransactionModal,
    selectedItemForEdit,
    getTransactions,
    setSelectedItemForEdit,
}) {
    const [loading, setLoading] = useState(false);
    const onFinish = async (values) => {
        try {
            const user = JSON.parse(localStorage.getItem('Expense_Tracker.users'))
            setLoading(true)
            if (selectedItemForEdit) {
                await axios.post("/api/transactions/edit-transaction", {
                    payload : {
                    ...values,
                    userid: user._id,
                },
                    transactionId: selectedItemForEdit._id,
                });
            getTransactions()
            message.success("Transaction Updated Successfully");
        } else {
            await axios.post("/api/transactions/add-transaction", {
                ...values,
                userid: user._id,
            });
            getTransactions()
            message.success("Transaction Added Successfully");
        }
        setShowAddEditTransactionModal(false);
        setSelectedItemForEdit(null)
        setLoading(false)
    } catch (error) {
        message.error("Something went wrong");
        setLoading(false)
    }
};
return (
    <div>
        <Modal title={selectedItemForEdit ? 'Edit Transaction' : 'Add Transaction'}
            open={showAddEditTransactionModal}
            onCancel={() => setShowAddEditTransactionModal(false)}
            footer={false}
        > <hr />
            {loading && <Spinner />}
            <Form layout="vertical" className="transaction-form" onFinish={onFinish} initialValues={selectedItemForEdit}>
                <Form.Item label='Amount' name='amount'>
                    <Input type="text" />
                </Form.Item>

                <Form.Item label='Type' name='type'>
                    <Select>
                        <Select.Option value='income'>Income</Select.Option>
                        <Select.Option value='expense'>Expense</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label='Category' name='category'>
                    <Select>
                        <Select.Option value='salary'>Salary</Select.Option>
                        <Select.Option value='business income'>Business Income</Select.Option>
                        <Select.Option value='miscellaneous income'>Miscellaneous Income</Select.Option>
                        <Select.Option value='bills and payments'>Bills and Payments</Select.Option>
                        <Select.Option value='shopping'>Shopping</Select.Option>
                        <Select.Option value='investment'>Investment</Select.Option>
                        <Select.Option value='miscellaneous expense'>Miscellaneous Expense</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label='Date' name='date'>
                    <Input type="date" />
                </Form.Item>

                <Form.Item label='Description' name='description'>
                    <Input type="text" />
                </Form.Item>
                <div className="d-flex justify-content-end">
                    <button className="primary" type='submit'>SAVE</button>
                </div>
            </Form>
        </Modal>
    </div>
)
}

export default AddEditTransaction;