import { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState('')
  const [filename, setFilename] = useState('')
  const [resolution, setResolution] = useState('')
  const [convertedFileurl, setConvertedFileurl] = useState('')

  const updateFileInfo = (e) =>{
    e.preventDefault()
    setFile(e.target.files[0])
    setFilename(e.target.files[0].filename)
  }

  const updateSelectedResolution = (e) => {
    e.preventDefault()
    setResolution(e.target.value)
  }

  const convertImage = async (e) => {
    e.preventDefault()
    setConvertedFileurl('')
    let formData = new FormData()
    formData.append('resolution', resolution)
    formData.append('file', file)
    const res = await fetch('https://image-resize-server.onrender.com/', {
      method: 'POST',
      body: formData
    });
    res.json()
    .then(data => setConvertedFileurl(data.url))
    .catch(err => console.log({err}))
  }

  return (
    <div className='App'>
      <div className='Container'>
        <form onSubmit={convertImage}>
          <div><input type='file' value={filename} onChange={updateFileInfo} className='input-field'/></div>
          <div><select value={resolution} onChange={updateSelectedResolution} className='drop-dwn'>
          <option value="Select Resolution" >Select Resolution</option>
          <option value="10X10">10X10</option>
          <option value="20X20">20X20</option>
          <option value="50X50">50X50</option>
          </select></div>
          <div id='thum'><button className="btn btn-primary m-3">Generate Thumbnail</button></div>
        </form>
        <a href={convertedFileurl}>{convertedFileurl}</a>
      </div>
    </div>
  )
}

export default App;