import React, { useState } from "react";
import { Card, Col, Modal, Row } from "react-bootstrap";
import { SERVER_URL } from "../../Services/serverURL";

function ProjectCard({ project }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {project && (
        <Card
          style={{ width: "30rem" }}
          onClick={handleShow}
          className="shadow btn mb-5 bg-success"
        >
          <Card.Img
            variant="top"
            src={`${SERVER_URL}/uploads/${project?.projectImage}`}
          />
          <Card.Body>
            <Card.Title>{project?.title}</Card.Title>
          </Card.Body>
        </Card>
      )}

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <img
                className="img-fluid"
                style={{ height: "250px" }}
                src={`${SERVER_URL}/uploads/${project?.projectImage}`}
                alt=""
              />
            </Col>
            <Col md={6}>
              <h2 className="fw-bolder">{project?.title}</h2>
              <p>
                Project Overview:
                <span className="fw-bolder" style={{ textAlign: "justify" }}>
                  {project?.overview}
                </span>
              </p>
              <p>
                Languages Used:
                <span className="fw-bolder text-danger">
                  {project?.languages}
                </span>
              </p>
            </Col>
          </Row>
          <div className="mt-3">
            <a href={project?.github} className="btn me-3" target="_blank">
              <i className="fa-brands fa-github fa-2x"></i>
            </a>
            <a href={project?.website} className="btn me-3" target="_blank">
              <i className="fa-solid fa-link fa-2x"></i>
            </a>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProjectCard;
