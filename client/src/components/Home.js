import React,{useState} from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import Loading from "./Loading"
import useHistory from "./useHistory";
import ProgressBar from "@ramonak/react-progress-bar";
import { API_BASE_URL } from "../constants";

   //TODO: complete the volunteering, languages and contact section
   //TODO: make it responsive ig
   //TODO: input control
   //TODO: depolyment(netlify??), docker


const Home=({setResult})=>{

    const [fullName, setFullname]=useState("")
    const [currentPosition, setCurrentPosition] = useState("");
    const [currentLength, setCurrentLength] = useState(1);
    const [currentTechnologies, setCurrentTechnologies] = useState("");
    const [headshot, setHeadshot] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [handleAddCompany,handleRemoveCompany, handleUpdateCompany,companyInfo]=useHistory()
    const [handleAddEducation,handleRemoveEducation, handleUpdateEducation,educationInfo]=useHistory()
    const [email,setEmail] = useState("")
    const [address,setAddress] = useState("")
    const [number,setNumber] = useState('')


    const progress=()=>{
        let cpt=0
        if (fullName!=="") cpt+=20
        if (currentPosition!=="") cpt+=20
        if (currentTechnologies!=="") cpt+=20
        if (headshot) cpt+=20
        if (educationInfo.length>1) cpt+=20
        return cpt
    }

    const handleFormSubmit=(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("headshotImage", headshot, headshot.name);
        formData.append("fullName", fullName);
        formData.append("currentPosition", currentPosition);
        formData.append("currentLength", currentLength);
        formData.append("currentTechnologies", currentTechnologies);
        formData.append("phoneNumber",number)
        formData.append("email",email);
        formData.append("address",address);
        let notEmptyCompanyInfo=companyInfo.filter(info=> info.name.length>0)
        let notEmptyEducationInfo=educationInfo.filter(info=> info.name.length>0)
        formData.append("workHistory", JSON.stringify(notEmptyCompanyInfo));
        formData.append("educationHistory", JSON.stringify(notEmptyEducationInfo));

        axios
            .post(`${API_BASE_URL}/resume/create`, formData, {})
            .then((res) => {
                if (res.data.message) {
                    setResult(res.data.data)
                    navigate("/resume");
                }
            })
            .catch((err) => console.error(err));
        setLoading(true);
    }

    if (loading)
        return <Loading/>
    return(
        <div className='app'>
            <h1> 🌟🌟Resume Builder🌟🌟</h1>
            <p>Generate a resume with Groq in few seconds !</p>
                <div className="progress">
                <ProgressBar completed={progress()} />
                </div>
            <form
            method="POST" 
            onSubmit={handleFormSubmit} 
            encType='multipart/form-data'>
            <label htmlFor="fullname" >Enter your full name </label>
            <input
            name="fullName"
            id="fullName"
            type="text" 
            required
            value={fullName}
            onChange={(e)=>setFullname(e.target.value)}
            />
             <div className="nestedContainer">
                <div>
                    <label htmlFor="currentposition" >Email</label>
                    <input
                    name="email" 
                    id="email"
                    type="text"
                    required
                    className='currentInput'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="currentLength" >Phone Number</label>
                    <input 
                    name="number" 
                    id="number"
                    type="text"
                    required
                    className='currentInput'
                    value={number}
                    onChange={(e)=>setNumber(e.target.value)}
                     pattern="[0-9()-]+"
                    maxLength="15"
                    />
                </div>
                <div>
                    <label htmlFor="currentTechnologies" >Address</label>
                    <input
                    name="address"
                    type="text"
                    id="address"
                    className='currentInput'
                    required
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}
                    />
                </div>
                </div>
            <div className="nestedContainer">
                <div>
                    <label htmlFor="currentposition" >Current Position</label>
                    <input
                    name="currentPosition" 
                    id="currentPosition"
                    type="text"
                    required
                    className='currentInput'
                    value={currentPosition}
                    onChange={(e)=>setCurrentPosition(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="currentLength" >For how long? (year)</label>
                    <input 
                    name="currentLength" 
                    id="currentLength"
                    type="number"
                    required
                    className='currentInput'
                    value={currentLength}
                    onChange={(e)=>setCurrentLength(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="currentTechnologies" >Technologies used</label>
                    <input
                    name="currentTechnologie"
                    type="text"
                    id="currentTechnologie"
                    className='currentInput'
                    required
                    value={currentTechnologies}
                    onChange={(e)=>setCurrentTechnologies(e.target.value)}
                    />
                </div>
                </div>
                    <label htmlFor="photo" >Upload your headshot image </label>
                    <input 
                    name="photo"
                    type="file"
                    required
                    id="photo"
                    accept='image/x-png,image/jpeg'
                    onChange={(e)=>setHeadshot(e.target.files[0])}
                    />
                  <h3>Schools and universities you've attended</h3>
                
                {educationInfo.map((company,index)=>(

                <div className="nestedContainer" key={company.name}>
                    <div className="companies">
                        <label htmlFor="name" >Institution name</label>
                        <input 
                        name="name" 
                        id="name"
                        type="text"
                        className='companyName'
                        onChange={(e) => handleUpdateEducation(e, index)}
                        />
                    </div>
                    <div className="companies">
                        <label htmlFor="position" >Studies</label>
                        <input 
                        name="position" 
                        id="position"
                        type="text"
                        className='currentInput'
                        onChange={(e) => handleUpdateEducation(e, index)}
                        />
                    </div>
                    <div className="btn__group">
                        {educationInfo.length >1 && educationInfo.length -1>index &&(
                                <button id='deleteBtn' onClick={() => handleRemoveEducation(index)} type="button">
                                    Del
                        </button>
                        )}
                        { educationInfo.length-1===index &&
                        <button id="addBtn" onClick={handleAddEducation} type="button">
                        Add
                    </button>
                      }
                    </div>
                </div>))}       

                <h3>Companies you've worked at</h3>
                
                {companyInfo.map((company,index)=>(

                <div className="nestedContainer" key={company.name}>
                    <div className="companies">
                        <label htmlFor="name" >Company Name</label>
                        <input 
                        name="name" 
                        id="name"
                        type="text"
                        className='companyName'
                        onChange={(e) => handleUpdateCompany(e, index)}
                        />
                    </div>
                    <div className="companies">
                        <label htmlFor="position" >Position Held</label>
                        <input 
                        name="position" 
                        id="position"
                        type="text"
                        className='currentInput'
                        onChange={(e) => handleUpdateCompany(e, index)}
                        />
                    </div>
                    <div className="btn__group">
                        {companyInfo.length >1 && companyInfo.length -1>index &&(
                                <button id='deleteBtn' onClick={() => handleRemoveCompany(index)} type="button">
                                    Del
                        </button>
                        )}
                        { companyInfo.length-1===index &&
                        <button id="addBtn" onClick={handleAddCompany} type="button">
                        Add
                    </button>
                      }
                    </div>
                </div>))}
                <h3>Soft skills</h3>
                <div className="nestedContainer">
                <div>
                    <label htmlFor="currentposition" >Email</label>
                    <input
                    name="langues" 
                    id="email"
                    type="text"
                    required
                    className='currentInput'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                    <select>
                        <option>
                            
                        </option>
                    </select>
                </div>
                <div>
                    <label htmlFor="currentLength" >Phone Number</label>
                    <input 
                    name="number" 
                    id="number"
                    type="text"
                    required
                    className='currentInput'
                    value={number}
                    onChange={(e)=>setNumber(e.target.value)}
                     pattern="[0-9()-]+"
                    maxLength="15"
                    />
                </div>
                <div>
                    <label htmlFor="currentTechnologies" >Address</label>
                    <input
                    name="address"
                    type="text"
                    id="address"
                    className='currentInput'
                    required
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}
                    />
                </div>
                </div>       
            <button type="submit">CREATE RESUME</button>
            </form>
        </div>
)}

export default Home;