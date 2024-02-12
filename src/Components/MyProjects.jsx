import React, { useContext, useEffect, useState } from "react";
import AddProject from "./AddProject";
import EditProject from "./EditProject";
import { deleteProjectAPI, getUserProjectAPI } from "../../Services/allAPI";
import { addProjectResponseContext, editProjectResponseContext } from "../Context API/ContextShare";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyProjects() {
  const { addProjectResponse, setAddProjectResponse } = useContext(
    addProjectResponseContext
  );
  const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)
  const [userProject, setUserProject] = useState([]);

  const getUserProjects = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };
      const result = await getUserProjectAPI(reqHeader);
      if (result.status === 200) {
        setUserProject(result.data);
      } else {
        console.log(result);
      }
    }
  };

  useEffect(() => {
    getUserProjects();
  }, [addProjectResponse,editProjectResponse]);

  const handleDeleteProject = async (pid) =>{
    const token = sessionStorage.getItem("token");
    if(token){
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      try{
        const result = await deleteProjectAPI(pid,reqHeader)
        if(result.status===200){
          getUserProjects()
        }else{
          toast.warning(result.response.data)
        }
      }catch(err){
        console.log(err);
      }
    }
  }

  return (
    <>
      <div className="card shadow p-3">
        <div className="d-flex justify-content-between">
          <h2>My Projects</h2>
          <div>
            <AddProject />
          </div>
        </div>
        <div className="mt-4">
          {userProject.length > 0 ? (
            userProject.map((project, index) => (
              <div
                key={index}
                className="d-flex justify-content-between align-items-center border rounded text-danger mb-3 p-2"
              >
                <h5>{project.title}</h5>
                <div className="d-flex align-items-center icons">
                  <EditProject project={project} />
                  <a href={project.github} target="_blank" className="btn">
                    <i className="fa-brands fa-github fa-2x"></i>
                  </a>
                  <button onClick={()=>handleDeleteProject(project._id)} className="btn">
                    <i className="fa-solid fa-trash fa-2x"></i>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-danger">
              <h1>No projects to show, Upload one</h1>
            </div>
          )}
        </div>
      </div>
      <ToastContainer autoClose={3000} theme="colored" />
    </>
  );
}

export default MyProjects;
