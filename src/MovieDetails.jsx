import { useParams, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useState , useEffect} from "react";
import { API } from "./global";

export function MovieDetails() {
  const { num } = useParams();

  const [datas, setDatas] = useState({})
  useEffect(()=>{
    fetch(`${API}/movies/${num}`)
    .then((data)=>data.json())
    .then((mv)=>setDatas(mv))
  }, []);


  // const datas = data[num]; //getting particular array using index
  console.log(datas);

  const styles = {
    color: datas.rating > 8.5 ? "green" : "red"
  };
  const navigate = useNavigate();

  return (
    <div>
      <iframe
        width='100%'
        height="650"
        src={datas.trailer}
        // title="VIKRAM - Official Trailer | Kamal Haasan | VijaySethupathi, FahadhFaasil | LokeshKanagaraj | Anirudh" 
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen>
      </iframe>
      <div className="Movie-popout">
        <div className="sub-div">
          <h2 className="mname">{datas.name}</h2>
          <p style={styles} className="mrating">⭐{datas.rating}</p>
        </div>
        <p className="summary">{datas.summary}</p>
        {/* <IconButton color='primary' aria-label="Toggle Summary" onClick={()=>(navigate(-1))}>
                     <ArrowBackIcon /> Back <ArrowBackIcon />
                  </IconButton> */}
        <Button startIcon={<KeyboardBackspaceIcon />} variant="contained" onClick={() => (navigate(-1))}>Back to Home Page</Button>

      </div>
    </div>
  );
}
