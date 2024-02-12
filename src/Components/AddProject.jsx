import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import projectImg from '../assets/Images/image-holder.png'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addProjectAPI } from '../../Services/allAPI';
import { addProjectResponseContext } from '../Context API/ContextShare';

function AddProject() {
  // get Context 
  const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)
  const [preview,setPreview] = useState("")
  const [show, setShow] = useState(false);
  const [fileType,setFileType] = useState(false)
  const [projectData,setProjectData] = useState({
    title:"",languages:"",overview:"",github:"",website:"",projectImage:""
  })

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setProjectData({
      title:"",languages:"",overview:"",github:"",website:"",projectImage:""
    })
    setPreview("")
  }
  console.log(projectData);

  useEffect(()=>{
    if(projectData.projectImage.type==="image/png" || projectData.projectImage.type==="image/jpg" || projectData.projectImage.type==="image/jpeg"){
      setPreview(URL.createObjectURL(projectData.projectImage))
      setFileType(false)
    }else{
      setFileType(true)
      setPreview("")
      setProjectData({...projectData,projectImage:""})
    }
  },[projectData.projectImage])

  const handleAddProject = async () =>{
    const {title,languages,overview,github,website,projectImage} = projectData
    if(!title || !languages || !overview || !github || !website || !projectImage){
      toast.warning("Please fill the form completely!!")
    }else{
      // API Call - reqBody
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("projectImage",projectImage)

      // API Call - reqHeader
      const token = sessionStorage.getItem('token')
      if(token){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        // API Call
        try{
          const result = await addProjectAPI(reqBody,reqHeader)
          console.log(result);
          if(result.status===200){
            console.log(result.data);
            handleClose()
            setAddProjectResponse(result.data)
          }else{
            toast.warning(result.response.data)
          }
        }catch(err){
          console.log(result);
        }
      }
    }
  }

  return (
    <>
    <button onClick={handleShow} className="btn btn-success"><i className="fa-solid fa-plus me-2"></i>Add Project</button>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6">
              <label>
                <input type="file" style={{display:'none'}} onChange={e=>setProjectData({...projectData,projectImage:e.target.files[0]})}/>
                <img className='img-fluid mb-2' src={preview?preview:projectImg} alt="Upload Project Image" />
               </label>
               {
                fileType&& <div className="text-danger mt-2"> *Please upload files with following extensions (png,jpg,jpeg )only* </div>
                }
            </div>
            <div className="col-lg-6">
              <div className='mb-3'>
                <input type="text" placeholder='Project Title' className="form-control" value={projectData.title} onChange={e=>setProjectData({...projectData,title:e.target.value})} />
                </div>
              <div className='mb-3'>
                <input type="text" placeholder='Language Used' className="form-control" value={projectData.languages} onChange={e=>setProjectData({...projectData,languages:e.target.value})} />
                </div>
              <div className='mb-3'>
                <input type="text" placeholder='Project Github Link' className="form-control" value={projectData.github} onChange={e=>setProjectData({...projectData,github:e.target.value})} />
                </div>
              <div className='mb-3'>
                <input type="text" placeholder='Project Demo Link' className="form-control" value={projectData.website} onChange={e=>setProjectData({...projectData,website:e.target.value})} />
                </div>
              <div className='mb-3'>
                <input type="text" placeholder='Project Description' className="form-control" value={projectData.overview} onChange={e=>setProjectData({...projectData,overview:e.target.value})} />
                </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddProject}>Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={3000} theme="colored" />
    </>
  )
}

export default AddProject