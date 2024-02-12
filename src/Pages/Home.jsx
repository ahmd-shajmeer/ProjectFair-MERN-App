import React, { useEffect, useState } from "react";
import landingImage from "../assets/Images/landing-img.png";
import { Link, useNavigate } from "react-router-dom";
import ProjectCard from "../Components/ProjectCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getHomeProjectAPI } from "../../Services/allAPI";

function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allProjects, setAllProjects] = useState([]);

  const getHomeProject = async () => {
    const result = await getHomeProjectAPI();
    if (result.status === 200) {
      setAllProjects(result.data);
    } else {
      console.log(result);
    }
  };

  useEffect(() => {
    getHomeProject();
    if (sessionStorage.getItem("token")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleProjectPage = () => {
    if (sessionStorage.getItem("token")) {
      navigate("/projects");
    } else {
      toast.warning("Please login to see more!!!");
    }
  };

  return (
    <>
      {/* Landing Part */}
      <div
        style={{ width: "100%", height: "90vh", backgroundColor: "#a274c4" }}
        className="rounded-bottom"
      >
        <div style={{ height: "100%" }} className="container">
          <div style={{ height: "100%" }} className="row align-items-center">
            <div className="col-lg-5">
              <h1 style={{ fontSize: "80px" }} className="fw-bold text-light">
                <i class="fa-solid fa-code me-2"></i>Project Fair
              </h1>
              <p className="text-secondary fs-3">
                One stop destination for all Software Development Projects.
                Where user can add and manage their projects. As well as access
                all projects available in our websites... What are you waiting
                for!!!
              </p>
              {isLoggedIn ? (
                <Link className="btn btn-warning fs-4" to={"/dashboard"}>
                  Manage your Projects{" "}
                  <i className="fa-solid fa-arrow-right ms-2"></i>
                </Link>
              ) : (
                <Link className="btn btn-warning fs-4" to={"/login"}>
                  Start to Explore{" "}
                  <i className="fa-solid fa-arrow-right ms-2"></i>
                </Link>
              )}
            </div>
            <div className="col-lg-2"></div>
            <div className="col-lg-4">
              <img src={landingImage} alt="Image not found" />
            </div>
            <div className="col-lg-1"></div>
          </div>
        </div>
      </div>
      {/* Projects view */}
      <div className="projects mt-5">
        <h1 className="text-center mb-5">Explore Projects</h1>
        <marquee speed={50}>
          <div className="d-flex justify-content-between">
            {allProjects.length > 0
              ? allProjects.map((project, index) => (
                  <div key={index} className="me-5">
                    <ProjectCard project={project} />
                  </div>
                ))
              : null}
          </div>
        </marquee>
        <div className="text-center">
          <button onClick={handleProjectPage} className="btn btn-link fs-5">
            View all Projects
          </button>
        </div>
      </div>
      <ToastContainer autoClose={3000} theme="colored" />
    </>
  );
}

export default Home;
