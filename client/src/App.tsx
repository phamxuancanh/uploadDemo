
import React, { useEffect, useState } from "react"
import axios from 'axios'
interface Course {
    id: number;
    name: string;
    prepare: string;
    price: number;
    file: String;
  }
function App() {
  const [name, setName] = useState("");
  const [prepare, setPrepare] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [msg, setMsg] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);  
  useEffect(() => {
    axios.get('http://localhost:4000/courses')
      .then((response) => {
        setCourses(response.data);
      })
      .catch(er => console.log(er))
  }, []);

  
  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>, filename: string) => {
    e.preventDefault();
    axios({
      url: `http://localhost:4000/courses/files/${filename}`,
      method: 'GET',
      responseType: 'blob', // Important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    });
  }
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
          setCourses(prevCourses => [...prevCourses, response.data]);
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
      <table className="table" border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Prepare</th>
            <th>Price</th>
            <th>File</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.name}</td>
              <td>{course.prepare}</td>
              <td>{course.price}</td>
              <td>{course.file}</td>
              <td><a href="/" onClick={(e) => handleDownload(e, course.file.toString())}>Download</a></td>            
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App;