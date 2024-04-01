import React, { useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";
import profilePicture from "../assets/Images/pp.png";
import { SERVER_URL } from "../Services/serverURL";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateUserProfileAPI } from "../Services/allAPI";

function Profile() {
  const [open, setOpen] = useState(false);
  const [userData,setUserData] = useState({
    username:"",password:"",email:"",github:"",linkedin:"",profileImage:""
  })
  const [existingImage,setExistingImage] = useState("")
  const [preview,setPreview] = useState("")

  useEffect(() =>{
    if(sessionStorage.getItem("userDetails")){
      const userDetails = JSON.parse(sessionStorage.getItem("userDetails"))
      setUserData({...userData,username:userDetails.username,password:userDetails.password,email:userDetails.email,github:userDetails.github,linkedin:userDetails.linkedin})
      setExistingImage(userDetails.profile)
    }
  },[open])

  useEffect(()=>{
    if(userData.profileImage){
      setPreview(URL.createObjectURL(userData.profileImage))
    }else{
      setPreview("")
    }
  },[userData.profileImage])

  const handleUpdateProfile = async () =>{
    const {username,password,email,github,linkedin,profileImage} = userData
    if(!github || !linkedin){
      toast.warning("Complete the form");
    }else{
      // API Call - reqBody
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("password",password)
      reqBody.append("email",email)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
      preview?reqBody.append("profileImage",profileImage):reqBody.append("profileImage",existingImage)

      // API Call - reqHeader
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type":preview?"multipart/form-data":"application/json",
          "Authorization":`Bearer ${token}`
        }
        // API Call
        try{
          const result = await updateUserProfileAPI(reqBody,reqHeader)
          if(result.status==200){
            setOpen(!open)
            sessionStorage.setItem("userDetails",JSON.stringify(result.data))
          }else{
            console.log(result);
          }
        }catch(err){
          console.log(err);
        }
      }
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between rounded p-2">
        <h2>Profile</h2>
        <button
          className="btn btn-outline-success"
          onClick={() => setOpen(!open)}
          aria-controls="profile-collapse"
          aria-expanded={open}
        >
          <i className="fa-solid fa-chevron-down"></i>
        </button>
      </div>
      <Collapse in={open}>
        <div
          className="row justify-content-center border shadow p-5 mt-3"
          id="profile-collapse"
        >
          <label className="text-center">
            <input style={{ display: "none" }} type="file" onChange={e=>setUserData({...userData,profileImage:e.target.files[0]})} />
            {
             existingImage==""? <img
              src={preview?preview:profilePicture}
              alt="Upload an image"
              width={"150px"}
              height={"150px"}
              className="rounded-circle"
            />:
            <img
              src={preview?preview:`${SERVER_URL}/uploads/${existingImage}`}
              alt="Upload an image"
              width={"150px"}
              height={"150px"}
              className="rounded-circle"
            />
            }
          </label>
          <div className="mt-3">
            <input value={userData.github} onChange={e=>setUserData({...userData,github:e.target.value})} type="text" className="form-control" placeholder="Enter your github" />
          </div>
          <div className="mt-3">
            <input value={userData.linkedin} onChange={e=>setUserData({...userData,linkedin:e.target.value})} type="text" className="form-control" placeholder="Enter your linkedin" />
          </div>
          <button onClick={handleUpdateProfile} className="btn btn-warning mt-3">Update</button>
        </div>
      </Collapse>
      <ToastContainer autoClose={3000} theme="colored" />
    </>
  );
}

export default Profile;
