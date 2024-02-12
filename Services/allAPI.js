import { commonAPI } from "./commonAPI"
import { SERVER_URL } from "./serverURL"


// Register API
export const registerAPI = async (user) =>{
    return await commonAPI("POST",`${SERVER_URL}/register`,user,"")
}

// Login API
export const loginAPI = async (user) =>{
    return await commonAPI("POST",`${SERVER_URL}/login`,user,"")
}

// Add project API
export const addProjectAPI = async (reqBody,reqHeader) =>{
    return await commonAPI("POST",`${SERVER_URL}/add-project`,reqBody,reqHeader)
}

// View home Project API
export const getHomeProjectAPI = async () =>{
    return await commonAPI("GET",`${SERVER_URL}/home-projects`,"","")
}

// View all Project API
export const getAllProjectAPI = async (searchKey,reqHeader) =>{
    return await commonAPI("GET",`${SERVER_URL}/all-projects?search=${searchKey}`,"",reqHeader)
}

// View user Project API
export const getUserProjectAPI = async (reqHeader) =>{
    return await commonAPI("GET",`${SERVER_URL}/user-projects`,"",reqHeader)
}

// Edit project API
export const editProjectAPI = async (id,reqBody,reqHeader) =>{
    return await commonAPI("PUT",`${SERVER_URL}/project/edit/${id}`,reqBody,reqHeader)
}

// Delete project API
export const deleteProjectAPI = async(id,reqHeader) =>{
    return await commonAPI("DELETE",`${SERVER_URL}/project/delete/${id}`,{},reqHeader)
}

// Update user profile API
export const updateUserProfileAPI = async(reqBody,reqHeader) =>{
    return await commonAPI("PUT",`${SERVER_URL}/user/edit`,reqBody,reqHeader)
}