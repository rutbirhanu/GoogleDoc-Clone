import { Link, useNavigate } from "react-router-dom"
import {useEffect, useState} from "react"
import "./landing.css"

function LandingPage() {

  const [docs, setDocs] = useState([])
  const [displayContent, setDisplayContent] = useState(true)
  const navigate= useNavigate()
  
  useEffect(() => {
    const fetchData = async () => {
        try {
            const req = await fetch("http://localhost:5001/doc/get_all", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json" // Correct way to set headers
              },
              credentials: "include" 
                
            });
            
          if (!req.ok) {
              setDisplayContent(false)
                throw new Error(`HTTP error! Status: ${req.status}`);
            }
            
          const data = await req.json();
          setDocs(data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
  }, []);

  if (!displayContent) {
    navigate("/signin")
  }
  
  return (
    <div className="landing-parent-cont">
    <div className="landing-container">
      <div className="new-doc">
          <p>New doc</p>
          <Link to="/doc">
          <div className="rectangle">
            <img src="https://thumbs.dreamstime.com/b/plus-sign-isolated-white-background-clip-art-addition-rainbow-colorful-illustration-flat-lay-math-symbol-icon-to-add-176776532.jpg"/>
            </div>
          </Link>
    
        </div>
        <p>Existing doc</p>
        <div className="existing-doc">
          {docs.map(doc => {
            console.log(doc._id)
            return <Link key={doc._id} to={`/document/${doc._id}`}>
              <div className="recent-doc" >
            <img src={`http://localhost:5001/${doc.image}`}
              alt="previw pic"
              width="100px"
              height="150px"
               />
            </div>
            </Link>
          })}
         
      </div>
      </div>
      </div>
  )
}

export default LandingPage