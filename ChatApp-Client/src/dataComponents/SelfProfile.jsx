import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { serverAddress } from "../Utilities/constants";

// import { useAuth } from "../../contexts/AuthContext";
// import { generateAvatar } from "../../utils/GenerateAvatar";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SelfProfile() {
  const navigate = useNavigate();

  //const [username, setUsername] = useState("");
  //const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(""); //check if i should upload the image or not
  const [isPublic, setIsPublic] = useState(false);
  const [userName, setUserName] = useState("");
  
  const fetchData = async () => {

    try {
      let token = localStorage.getItem("token");
      let response = await fetch(serverAddress + "/auth/profile/loadSelf", {
          method:'GET',
          headers:{
              'Content-Type': 'application/json',
              'Authorization' : token
          }
      });
      let responseJson = await response.json();

      console.log(responseJson)
      setFirstName(responseJson.firstName);
      setLastName(responseJson.lastName);
      setDateOfBirth(responseJson.dateOfBirth);
      setDescription(responseJson.description);
      setCurrentImage(responseJson.imageUrl);
      setIsPublic(responseJson.isPublic);
      console.log("response");
      console.log(responseJson);
      console.log(isPublic)

      if(response.ok){
        console.log("ok");
    } else {
        window.alert("could not update profile " + responseJson);
    }
  
    } catch (err) {
      console.log(err)
    }
  
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleChange =(event) => {
    console.log("public")
    console.log(event.target.value)
    if(event.target.value ==="public"){
      setIsPublic(true);
    }else{
      setIsPublic(false);
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("before try")
    console.log(isPublic)

    try {
      
      let token = localStorage.getItem("token");
      let profile = JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        description: description, 
        imageUrl: imageUrl,
        public: isPublic
      });
      console.log(profile)
      let res = await fetch(serverAddress + "/auth/profile/edit", {
          method:'PUT',
          body: profile,
          headers:{
              'Content-Type': 'application/json',
              'Authorization' : token
          }
      });
      let resJson = await res.json();
    
      // setFirstName("");
      // setLastName("");
      // setDateOfBirth("");
      // setDescription("");
      setCurrentImage(resJson.imageUrl);

      if(res.ok){
        console.log("ok");
        window.alert("profile was updated successfully");
        // need to switch form 
    } else {
        window.alert("could not update profile " + resJson);
    }
  
    } catch (e) {
      //setError("Failed to update profile");
    }
  };


  return (
        <form className="profile-form" onSubmit={handleFormSubmit}>
          <div className="profile-header">
            <h2>Edit Profile</h2>
          </div> 
          <button
                type="button"
                className="closebtn"
                data-dismiss="modal"
                aria-label="Close"
                onClick={()=> navigate("/mainPage")}
              >
                <span aria-hidden="true">&times;</span>
          </button>
          <div className="profile">
            {/* <legend> profile of + { }</legend> */}
            {/* <button class="closebtn" onclick={navigate('/mainPage')}>×</button> */}
 
            <div className="circular--portrait">
              <img src={currentImage} ></img>
            </div>
            
           
            <div className="profile-inputs">
              <div>
                <label htmlFor="firstName"> first name</label>
                <input
                id="firstName"
                name="firstName"
                type="text"
                value={firstName}
                className="form-inputs"
                placeholder="Enter an first name"
                onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            
            
              <div>
              <label htmlFor="lastName"> last name </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={lastName}
                className="form-inputs"
                placeholder="Enter an last name"
                onChange={(e) => setLastName(e.target.value)}
              />
              </div>
              <div>
              <label htmlFor="dateOfBirth"> date of birth  </label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={dateOfBirth}
                className="form-inputs"
                placeholder="Enter date of birth"
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
              </div>
              <div>
              <label htmlFor="description"> description  </label>
              <input
                id="description"
                name="description"
                type="text"
                value={description}
                className="form-inputs"
                placeholder="Enter description"
                // defaultValue={currentUser.displayName && currentUser.displayName} add that the default value will be loaded from the current user profile 
                onChange={(e) => setDescription(e.target.value)}
              />
              </div>
              <div>
              <label htmlFor="imageUrl"> image path  </label>
                <input
                  id="imageUrl"
                  name="imageUrl"
                  type="text"
                  accept=".jpg, .png"
                  //value={imageUrl}
                  href={imageUrl}
                  className="form-inputs"
                  placeholder="Enter image path"
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
            
              <div className="private-public">
              <label htmlFor="isPublic"> profile is public or private </label>
                {/* <fieldset> */}
                {/* <legend>profile :</legend> */}
                <div >
                  <input id= "isPublic" type="radio" value="public" name="profile is public" onChange={handleChange}/> public
                  <input id= "isPublic" type="radio" value="private" name="profile is public" onChange={handleChange}/> private
                </div>
                </div>
                <button type="submit" className="update-profile-btn"> Update Profile </button>
            </div>
            

             
         
            
          </div>
          
        </form>
    //   </div>
    // </div>
  );
}