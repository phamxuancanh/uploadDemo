
import React, { useState } from "react"
import axios from 'axios'

function App() {
  const [name, setName] = useState("");
  const [prepare, setPrepare] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [msg, setMsg] = useState("");

  const upload = () => {
    const formData = new FormData()
    formData.append("name", name);
    formData.append("prepare", prepare);
    formData.append("price", price);
    if (file !== undefined) {
      formData.append('file', file);
    }
    axios.post('http://localhost:4000/courses/upload', formData)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setMsg("File Successfully Uploaded");
        } else {
          setMsg("Error");
        }
      })
      .catch(er => console.log(er))
  }
  return (
    <div className="container" style={{ paddingTop: 60 }}>
      <div className="row"><h1>React JS Node Express JS Upload File with Mysql Insert data</h1>
        <div className="col-12">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" placeholder='Enter Name' autoComplete='off'
            onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="col-12">
          <label className="form-label">Prepare</label>
          <input type="text" className="form-control" placeholder='Enter Prepare' autoComplete='off'
            onChange={(e) => setPrepare(e.target.value)} />
        </div>
        <div className="col-12">
          <label className="form-label">Price</label>
          <input type="text" className="form-control" placeholder='Enter Price' autoComplete='off'
            onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="col-12">
          <label className="form-label">Upload File</label>
          <input
            className="form-control form-control-lg"
            type="file"
            onChange={(e) => {
              const selectedFile = e.target.files ? e.target.files[0] : undefined;
              setFile(selectedFile);
            }}
          />
        </div>

        <button type="button" className="btn btn-primary btn-lg" onClick={upload} style={{ marginTop: '20px' }}>Upload</button>
        <h1 style={{ fontSize: '15px', textAlign: 'center', marginTop: '20px' }}>{msg}</h1>
      </div>
    </div>
  )
}

export default App;