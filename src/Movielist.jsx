import { Movie } from "./Movie";
import { AddMovieField } from "./AddMovieField";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import { API } from "./global";

export function Movielist() {
  const [data, setData] = useState([])
 
  const GetMovie=()=>{
    fetch(`${API}/movies`)
    .then((data)=>data.json())
    .then((mv)=>setData(mv))
  }
 
  useEffect(()=>GetMovie(), []);

 
  const DeleteMovie=async(id)=>{
     console.log('deletinggg',id)
    //  using .then
    //  fetch(`${API}/movies/${id}`,{
    //  method: 'DELETE',
    // }).then(()=>GetMovie());

    // using await
      await fetch(`${API}/movies/${id}`,{
      method: 'DELETE',
     })
     GetMovie();

  }


const navigate=useNavigate()

  return (
    <div>
     {/* <AddMovieField data={data} setData={setData}/> */}
      <div className="movielist">
        {data.map((val) => (
          <Movie key={val.id} datas={val} id={val.id} 
          deleteButton={
          <IconButton sx={{marginLeft:'auto'}} aria-label="delete" color="error" 
          onClick={()=> DeleteMovie(val.id)}>
            <DeleteIcon ></DeleteIcon>
            </IconButton>
            }

            editButton={
              <IconButton sx={{marginLeft:'auto'}} aria-label="delete" color="primary" 
              onClick={()=> navigate(`/Movilist/edit/${val.id}`)}>
                <EditIcon ></EditIcon>
                </IconButton>
                }
        />
        ))}
      </div></div>
  );
}

