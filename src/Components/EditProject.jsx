import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import projectImg from '../assets/Images/image-holder.png'
import { SERVER_URL } from '../../Services/serverURL';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editProjectAPI } from '../../Services/allAPI';
import { editProjectResponseContext } from '../Context API/ContextShare';

function EditProject({project}) {
  const [show, setShow] = useState(false);
  const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)
  const [projectData,setProjectData] = useState({
    id:project._id,title:project.title,languages:project.languages,overview:project.overview,github:project.github,website:project.website,projectImage:""
  })
  const [preview,setPreview] = useState("")

  console.log(projectData);
  useEffect(() =>{
    if(projectData.projectImage){
      setPreview(URL.createObjectURL(projectData.projectImage))
    }else{
      setPreview("")
    }
  },[projectData.projectImage])

  const handleClose = () => {
    setShow(false)
    setProjectData({
      id:project._id,title:project.title,languages:project.languages,overview:project.overview,github:project.github,website:project.website,projectImage:""
    })
    setPreview("")
  }
  const handleShow = () => setShow(true);

  const handleUpdate = async () =>{
    const {id,title,languages,overview,github,website,projectImage} = projectData
    if(!title || !languages || !overview || !github || !website){
      toast.warning("Please fill the form completely!!")
    }else{
      // API Call - reqBody
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)

      // API Call - reqHeader
      const token = sessionStorage.getItem('token')
      if(token){
        const reqHeader = {
          "Content-Type":preview?"multipart/form-data":"application/json",
          "Authorization":`Bearer ${token}`
        }
        // API Call
        try{
          const result = await editProjectAPI(id,reqBody,reqHeader)
          if(result.status===200){
            handleClose()
            setEditProjectResponse(result.data)
          }else{
            toast.danger(result.response.data)
          }
        }catch(err){
          console.log(err);
        }
      }
   }
  }
  return (
    <>
    <button onClick={handleShow} className="btn"><i class="fa-solid fa-pen-to-square fa-2x"></i></button>
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
                <input type="file" style={{display:'none'}} onChange={e=>setProjectData({...projectData,projectImage:e.target.files[0]})} />
                <img src={preview?preview:`${SERVER_URL}/uploads/${project.projectImage}`} className='w-100' alt="Upload Project Image" />
                </label>
            </div>
            <div className="col-lg-6">
              <div className='mb-3'>
                <input type="text" placeholder='Project Title' value={projectData.title} className="form-control" onChange={e=>setProjectData({...projectData,title:e.target.value})} />
                </div>
              <div className='mb-3'>
                <input type="text" placeholder='Language Used' value={projectData.languages} className="form-control" onChange={e=>setProjectData({...projectData,languages:e.target.value})} />
                </div>
              <div className='mb-3'>
                <input type="text" placeholder='Project Github Link' value={projectData.github} className="form-control" onChange={e=>setProjectData({...projectData,github:e.target.value})} />
                </div>
              <div className='mb-3'>
                <input type="text" placeholder='Project Demo Link' value={projectData.website} className="form-control" onChange={e=>setProjectData({...projectData,website:e.target.value})} />
                </div>
              <div className='mb-3'>
                <input type="text" placeholder='Project Description' value={projectData.overview} className="form-control" onChange={e=>setProjectData({...projectData,overview:e.target.value})} />
                </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={3000} theme="colored" />
    </>
  )
}

export default EditProject