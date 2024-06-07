
import React, {useState} from 'react';
import axios from 'axios';

function FileUpload() {

  const [file, setFile] = useState()
  const [uploadedFileURL, setUploadedFileURL] = useState(null)

  function handleChange(event) {
    setFile(event.target.files[0])
  }

  function handleSubmit(event) {
    event.preventDefault()
    const url = 'http://localhost:3000/uploadFile';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post(url, formData, config).then((response) => {
      setUploadedFileURL(response.data.fileUrl);
    });
  }

  return (
    <div className="fileUpload">
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleChange}/>
          <button type="submit">Upload</button>
        </form>
        {uploadedFileURL && <img src={uploadedFileURL} alt="Uploaded content"/>}
    </div>
  );
}

export default FileUpload;