import { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import './App.css'

function App() {
  //for saving state
  let [state, setstate] = useState({
    uName: "",
    uEmail: "",
    uPassword: "",
    uMessage: "",
    index: ''
  });

  let formhandle = (e) => {


    let name = e.target.name;
    let value = e.target.value;

    setstate({
      ...state,
      [name]: value
    });
  }
  // for saving data in table
  let [data, setdata] = useState([]);

  let Formdata = (e) => {
    e.preventDefault();

    let currentdata = {
      uName: state.uName,
      uEmail: state.uEmail,
      uPassword: state.uPassword,
      uMessage: state.uMessage
    };

    // Check if we're in UPDATE mode (index is a number, including 0)
    let isUpdateMode = typeof state.index === 'number';

    if (isUpdateMode) {
      // UPDATE MODE
      let emailconflict = data.filter((v, i) => v.uEmail === state.uEmail && i !== state.index);

      if (emailconflict.length > 0) {
        toast.error("Email already exists in another record");
        return;
      }

      let updatedData = data.map((item, i) => {
        if (i === state.index) {
          return currentdata;
        }
        return item;
      });

      setdata(updatedData);
      toast.success("Data updated successfully");

      setstate({
        uName: "",
        uEmail: "",
        uPassword: "",
        uMessage: "",
        index: ''
      });
    } else {
      // ADD NEW MODE
      let userdata = data.filter((v) => v.uEmail === state.uEmail);

      if (userdata.length >= 1) {
        toast.error("Email already exists");
        return;
      }

      let olddata = [...data, currentdata];
      setdata(olddata);

      setstate({
        uName: "",
        uEmail: "",
        uPassword: "",
        uMessage: "",
        index: ''
      });

      toast.success("Form submitted successfully!");
    }
  }

  const show = () => toast("form deleted successfully");

  //update function
  let updateform = (indexnum) => {
    let updatedata = data[indexnum];
    setstate({
      uName: updatedata.uName,
      uEmail: updatedata.uEmail,
      uPassword: updatedata.uPassword,
      uMessage: updatedata.uMessage,
      index: indexnum
    });
  }

  return (
    <div className="container-fluid">
      <ToastContainer />
      <div className="row">
        <div className="col-lg-4 col-md-12 col-sm-12 ">
          <Form className="mx-4 pt-4" onSubmit={Formdata}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-white">Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" name="uName" value={state.uName} onChange={formhandle} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label className="text-white">Email</Form.Label>
              <Form.Control type="text" placeholder="Enter your email" name="uEmail" value={state.uEmail} onChange={formhandle} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label className="text-white">Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your password" name="uPassword" value={state.uPassword} onChange={formhandle} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className="text-white">Message</Form.Label>
              <Form.Control as="textarea" rows={3} name="uMessage" value={state.uMessage} onChange={formhandle} />
            </Form.Group>
            <button className="btn btn-primary" type="submit">{typeof state.index === 'number' ? "Update" : "Submit"}</button>
          </Form>
        </div>

        <div className="col-lg-8 col-md-12 col-sm-12 mt-5 pe-4">
          <h4 className='text-center mb-2 text-light'>Table of contents(TOC)</h4>
          <Table striped bordered hover className='me-6'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody >
              {data.map((items, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{items.uName}</td>
                  <td>{items.uEmail}</td>
                  <td>{items.uMessage}</td>
                  <td>
                    <button onClick={() => {
                      show();
                      let newData = data.filter((_, i) => i !== index);
                      setdata(newData);
                    }} className="btn btn-danger me-2">Delete </button>
                    <button onClick={() => { updateform(index) }} className="btn btn-primary">Update </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default App;