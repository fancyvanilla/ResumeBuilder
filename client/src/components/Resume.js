import React,{ useRef} from "react";
import ErrorPage from "./ErrorPage";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";

const Resume = ({ result }) => {
    const componentRef = useRef()
    const navigate=useNavigate()

   //TODO: change the alert to toast
   //TODO: download option 
   //TODO: set dates for the school and work sections

    const handlePrint = useReactToPrint({
        content: ()=>componentRef.current,
        documentTitle : `${result.fullName} Resume`,
        onAfterPrint: () =>alert("Print successfull!")
       });
  
    if (JSON.stringify(result) === "{}") {
        return <ErrorPage />;
    }
    const replaceWithBr = (string) => {
        return string.replace(/\n/g, "<br />");
    };
    return (
        <>   <div className="buts">
            <button onClick={handlePrint}>Print Page</button>
            <button onClick={()=>navigate("/")}>Try Again</button>
            </div>
            <main ref={componentRef}>
            <header className='header'>
                    <div>
                        <h1>{result.fullName}</h1>
                        <p className='resumeTitle headerTitle'>
                            {result.currentPosition} ({result.currentTechnologies})
                        </p>
                        <p className='resumeTitle'>
                            {result.currentLength} year(s) work experience
                        </p>
                    </div>
                    <div>
                        <img
                            src={result.image_url}
                            alt={result.fullName}
                            className='resumeImage'
                        />
                    </div>
                </header>
                <div className="resume">
            <section className='container'>
                <div className='resumeBody'>
                    <div>
                        <h2 className='resumeBodyTitle'>Contact</h2>
                        <p> <span style={{ fontWeight: "bold" }}>Phone Number : </span>{result.phoneNumber}</p>
                        <p><span style={{ fontWeight: "bold" }}>Email : </span>{result.email}</p>
                       <p> <span style={{ fontWeight: "bold" }}>Address : </span>{result.address}</p>
                       <br/>
                    </div>
                    <div>
                        <h2 className='resumeBodyTitle'>Skills</h2>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: replaceWithBr(result.keypoints),
                            }}
                            className='resumeBodyContent'
                        />
                    </div>
                    <div>
                        <h2 className='resumeBodyTitle'>Volunteering</h2>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: replaceWithBr(result.keypoints),
                            }}
                            className='resumeBodyContent'
                        />
                    </div>
                    <div>
                        <h2 className='resumeBodyTitle'>Languages</h2>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: replaceWithBr(result.keypoints),
                            }}
                            className='resumeBodyContent'
                        />
                    </div>
                </div>
            </section>
            <section className="container">
            <div className='resumeBody'>
                       <div>
                        <h2 className='resumeBodyTitle'>About me</h2>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: replaceWithBr(result.objective),
                            }}
                            className='resumeBodyContent'
                        />
                    </div>
                    <div>
                        <h2 className='resumeBodyTitle'>Experience/projects</h2>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: replaceWithBr(result.jobResponsibilities),
                            }}
                            className='resumeBodyContent'
                        />
                    </div>
                    <div>
                        <h2 className='resumeBodyTitle'>Education</h2>
                        {result.education?.map((work) => (
                            <p className='resumeBodyContent' key={work.name}>
                                <span style={{ fontWeight: "bold" }}>{work.name}</span>-{work.position}<br/>
                                <span style={{color:"blue"}}>date to be set...</span>
                            </p>
                        ))}
                    </div>
                </div>
            </section>
            </div>
            </main>
        </>
    );
};

export default Resume;