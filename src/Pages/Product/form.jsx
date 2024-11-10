import { RollbackOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, message, Select } from 'antd';
import JoditEditor from 'jodit-react';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const FormProduct = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const editor = useRef();
    const [content, setContent] = useState("")

    const [NextCode, setNextCode] = useState('');

    const { code } = useParams();

    useEffect(() => {
        if (code) {
            const dataProducts = JSON.parse(localStorage.getItem('DataProduct'));
            const filter = dataProducts.filter(item => item.ProductCode === code);
            console.log(filter[0]);
            form.setFieldsValue(filter[0]);
        }
    }, [code, form]);

    useEffect(() => {
        const dataProducts = JSON.parse(localStorage.getItem('DataProduct'));
        const filter = dataProducts.filter(item => item.ProductCode.startsWith("PD"));
        if (filter.length > 0) {
            const lastCode = filter[filter.length - 1].ProductCode
            const nextNum = parseInt(lastCode.substr(2)) + 1
            const nextCode = `PD${nextNum.toString().padStart(3, "0")}`
            setNextCode(nextCode);
        } else {
            setNextCode('PD001');
        }
    }, []);

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const existingData = JSON.parse(localStorage.getItem('DataProduct')) || [];
            if (code) {
                const updatedData = existingData.map((item) =>
                    item.ProductCode === code ? { ...item, ...values } : item
                );

                localStorage.setItem('DataProduct', JSON.stringify(updatedData));
                message.success("Success Update Data!")
            } else {
                const payload = {
                    ...values,
                    ProductCode: NextCode
                }
                const updatedData = [...existingData, payload];
                localStorage.setItem('DataProduct', JSON.stringify(updatedData));
                message.success("Success Add Data!")
            }
            navigate('/dashboard/product');
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };


    const handleReset = () => {
        form.resetFields();
    }

    return (
        <div className="p-4">
            <div className="flex justify-between">
                <h3 className="text-3xl font-bold">Form Product</h3>
                <Button icon={<RollbackOutlined />} onClick={() => navigate(-1)}> Back</Button>
            </div>

            <div className="w-full bg-white rounded-lg mt-2">
                <Form
                    name="basic"
                    layout="vertical"
                    onFinish={handleSubmit}
                    autoComplete="off"
                    form={form}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 p-6">

                        <Form.Item
                            label="Product Name"
                            name="ProductName"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Product Name!",
                                },
                            ]}
                        >
                            <Input placeholder="Input Product Name" />
                        </Form.Item>

                        <Form.Item
                            label="Product Price"
                            name="ProductPrice"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Product Price!",
                                },
                            ]}
                        >
                            <InputNumber placeholder="Input Product Price" className="w-full" />
                        </Form.Item>

                        <Form.Item
                            label="SKU"
                            name="SKU"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your SKU!",
                                },
                            ]}
                        >
                            <Input placeholder="Input SKU" />
                        </Form.Item>

                        <Form.Item
                            label="Brand"
                            name="Brand"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Brand!",
                                },
                            ]}
                        >
                            <Select
                                placeholder="Select Brand"
                                options={[
                                    {
                                        value: 'Brand 1',
                                        label: 'Brand 1',
                                    },
                                    {
                                        value: 'Brand 2',
                                        label: 'Brand 2',
                                    },
                                    {
                                        value: 'Brand 3',
                                        label: 'Brand 3',
                                    },
                                    {
                                        value: 'Brand 4',
                                        label: 'Brand 4',
                                    },
                                    {
                                        value: 'Brand 5',
                                        label: 'Brand 5',
                                    },
                                    {
                                        value: 'Brand 6',
                                        label: 'Brand 6',
                                    },
                                ]}
                            />

                        </Form.Item>

                        <Form.Item label="Description" name="Description" className="lg:col-span-2">
                            {/* <Input.TextArea placeholder="Input Description" /> */}
                            <JoditEditor
                                ref={editor}
                                value={content}
                                onChange={(values) => setContent(values)}
                            />
                        </Form.Item>

                    </div>

                    <div className="flex justify-end p-4 gap-2">
                        <Button type="primary" danger htmlType="button" onClick={handleReset}>
                            Reset
                        </Button>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Submit
                        </Button>
                    </div>

                </Form>
            </div>

        </div>
    )
}

export default FormProduct