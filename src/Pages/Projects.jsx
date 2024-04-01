import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import ProjectCard from "../Components/ProjectCard";
import { Col, Row } from "react-bootstrap";
import { getAllProjectAPI } from "../Services/allAPI";

function Projects() {
  const [searchKey,setSearchKey] = useState('')
  const [allProjects, setAllProjects] = useState([]);

  const getAllProjects = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };
      const result = await getAllProjectAPI(searchKey,reqHeader);
      if (result.status === 200) {
        setAllProjects(result.data);
      } else {
        console.log(result);
      }
    }
  };

  useEffect(() => {
    getAllProjects();
  }, [searchKey]);

  return (
    <>
      <Header />
      <div style={{ marginTop: "100px" }} className="project-page">
        <div className="d-flex justify-content-between m-5">
          <h1>All Projects</h1>
          <input
          onChange={e=>setSearchKey(e.target.value)}
            style={{ width: "300px" }}
            type="text"
            className="rounded p-2"
            placeholder="Search by Languages"
          />
        </div>
        <div className="container">
          <Row className="mt-5 conatiner-fluid">
            {allProjects.length > 0 ? (
              allProjects.map((project, index) => (
                <Col
                  className="d-flex justify-content-between"
                  key={index}
                  sm={12}
                  md={6}
                  lg={4}
                >
                  <ProjectCard project={project} />
                </Col>
              ))
            ) : (
              <div className="text-danger">
                <h1>Nothing to display</h1>
              </div>
            )}
          </Row>
        </div>
      </div>
    </>
  );
}

export default Projects;
