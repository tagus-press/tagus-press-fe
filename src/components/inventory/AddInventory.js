import React, { Component, useEffect, useState } from "react";
import { Modal, Button, Form, Select, InputNumber, notification} from "antd";
import { UploadOutlined } from '@ant-design/icons';

import axios from "axios";

// import "./main.scss"; // webpack must be configured to do this
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllInventory } from "../../actions/inventoryActions";


const { Option } = Select;

const AddInventory = (props) => {
    const dispatch = useDispatch();
    const {books} = useSelector(redux => redux.books)
    const [form] = Form.useForm();
    const [show, setShow] = useState(false);

    const onShow = () => {
        setShow(true)
    
    }
    const onClose = () => {
        setShow(false)
    }


    let bookList = (books).map(book => {
        let result = {};
        result.name = book.name;
        result.label = book.name;
        result.value = book.id;
        return result;
    });
    bookList = bookList.sort(function (a, b) {
        let x = a.name;
        let y = b.name;
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
    const locations = [
        {
            label: "Main Center",
            value: "Main Center"
        },
        {
            label: "UMassD",
            value: "UMassD"
        }
    ]

    const addInventory = (inventoryData) => {
        return axios
            .post("api/inventory", inventoryData)
            .then(res => {
                return {
                    success: true
                }
            })
            .catch(err => {
                console.log(err.response.data);
                notification['error']({
                    message: 'Error',
                    description: err.response.data.errors[0],
                });
                return {
                    success: false
                }
            });
    }

    const onSubmit = () => {
        form
            .validateFields()
            .then(values => {
                addInventory(values)
                .then(res => {
                    if (res.success === true) {
                        dispatch(getAllInventory());
                        setShow(false);
                        form.resetFields();
                        notification['success']({
                            message: 'Sucess',
                            description: "Inventory Succesfully Updated.",
                        });
                    } 
                })
                .catch(err => {
                    notification['error']({
                        message: "Error!",
                        description: "Something went wrong. Please try again.",
                    });
                });
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    }


    return (<div>
        <Button
            type="primary"
            icon={<UploadOutlined />}
            shape="round"
            onClick={onShow}
        >
            Add Inventory
        </Button>
        <Modal title={'Add Inventory'} visible={show} onCancel={onClose} onOk={onSubmit}>
            <Form
            layout="horizontal"
            form={form}
        >
            <Form.Item label="Select Book" name="bookId" 
                    rules={[{ required: true, message: "Please select a Book!" }]}>
                    <Select showSearch placeholder="Select Book" filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }>
                    {bookList.map(book => {
                        return < Option key={book.label} value={book.value}>{book.label}</Option>
                    })}
                </Select>
            </Form.Item>
            <Form.Item label="Select Center" name="location"
                rules={[{ required: true, message: "Please select a Center!" }]}>
                <Select placeholder="Select Center">
                    {locations.map(location => {
                        return < Option key={location.label} value={location.value}>{location.label}</Option>
                    })}
                </Select>
            </Form.Item>
                <Form.Item label="Select Inventory" name="inventory" defaultValue={0}
                rules={[{ required: true, message: "Please select Inventory!" }]}>
                <InputNumber min={-100000} max={100000} defaultValue={0} />
            </Form.Item>
        </Form>
    </Modal>
    </div>)
}

export default AddInventory;

// class AddInventory extends Component {
//     constructor() {
//         super();
        
//         this.state = {
//             show: false,
//             bookId: null,
//             location: null,
//             inventory: 0,
//             errors: {}
//         };

//         this.onClose = this.onClose.bind(this);
//         this.onShow = this.onShow.bind(this);
//         this.onChange = this.onChange.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);
//     }



//     onClose = (e) => {
//         this.setState({ show: false })
//     }

//     onShow = (e) => {
//         this.setState({ show: true })
//     }

//     onChange = (e) => {
//         this.setState({ [e.target.name]: e.target.value });
//     }

//     onChangeSelect = (name, value) => {
//         this.setState({ [name]: value });
//     }

//     onSubmit = (e) => {
//         e.preventDefault();

//         const inventoryData = {
//             bookId: this.state.bookId,
//             location: this.state.location,
//             inventory: this.state.inventory
//         };

//         axios
//             .post("api/inventory", inventoryData)
//             .then(res => {
//                 console.log(res.data);
                
//             })
//             .catch(err => {
//                 console.log(err.response.data);
//                 this.setState({errors: err.response.data})
//             });

        
//     }

//     render() {
//         const { books } = this.props;
//         const { show, errors } = this.state;
//         let bookList = (books).map(book => {
//             let result = {};
//             result.name = book.name;
//             result.label = book.name;
//             result.value = book.id;
//             return result;
//         });
//         bookList = bookList.sort(function (a, b) {
//             let x = a.name;
//             let y = b.name;
//             return ((x < y) ? -1 : ((x > y) ? 1 : 0));
//         });
//         const locations = [
//             {
//                 label: "Main Center",
//                 value: "Main Center"
//             },
//             {
//                 label: "UMassD",
//                 value: "UMassD"
//             }
//         ]
//         console.log(this.state);

//         return (
//             <div>
//                 <Button type="primary" onClick={this.onShow}>
//                     Add Inventory
//                 </Button>

//                 <Modal visible={show} onCancel={this.onClose} onOk={this.onSubmit}>
//                     <Form
//                         {...formItemLayout}
//                         layout="horizontal"
//                         form={}
//                         initialValues={{ layout: formLayout }}
//                         onValuesChange={onFormLayoutChange}
//                     >
//                         <Form.Item label="Form Layout" name="layout">
//                             <Radio.Group value={formLayout}>
//                                 <Radio.Button value="horizontal">Horizontal</Radio.Button>
//                                 <Radio.Button value="vertical">Vertical</Radio.Button>
//                                 <Radio.Button value="inline">Inline</Radio.Button>
//                             </Radio.Group>
//                         </Form.Item>
//                         <Form.Item label="Field A">
//                             <Input placeholder="input placeholder" />
//                         </Form.Item>
//                         <Form.Item label="Field B">
//                             <Input placeholder="input placeholder" />
//                         </Form.Item>
//                         <Form.Item {...buttonItemLayout}>
//                             <Button type="primary">Submit</Button>
//                         </Form.Item>
//                     </Form>
//                 </Modal>

//                 {/* <Modal show={show} onHide={this.onClose}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Add Inventory</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <form noValidate onSubmit={this.onSubmit} className="inventory-form">
//                             <SelectListGroup
//                                 placeholder="Select Book"
//                                 name="bookId"
//                                 value={this.state.bookId}
//                                 onChange={(value) => this.onChangeSelect("bookId", value)}
//                                 error={errors.book}
//                                 options={bookList}
//                                 info={"Select Book"}
//                             />
//                             <SelectListGroup
//                                 placeholder="Select Location"
//                                 name="location"
//                                 value={this.state.location}
//                                 onChange={(value) => this.onChangeSelect("location", value)}
//                                 error={errors.location}
//                                 options={locations}
//                                 info={"Select Location"}
//                             />
//                             <TextFieldGroup
//                                 placeholder="Count"
//                                 name="inventory"
//                                 type="number"
//                                 value={this.state.inventory}
//                                 onChange={this.onChange}
//                                 error={errors.inventory}
//                             />
//                             <input
//                                 type="submit"
//                                 className="btn btn-info btn-block mt-4"
//                             />
//                         </form>
//                     </Modal.Body>
//                 </Modal> */}
//             </div>

//         );
//     }
// }
// export default AddInventory;
