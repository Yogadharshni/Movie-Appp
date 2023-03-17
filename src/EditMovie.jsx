import { useState,useEffect } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import {useFormik} from 'formik'; 
import { API } from "./global";

const formValidationSchema=yup.object(
  {
    name:yup.string().required().min(1),
    poster:yup.string().required().url(),
    rating:yup.number().required().min(0).max(10),
    summary:yup.string().required().min(20),
    trailer:yup.string().required().url(),

  }
)

export function EditMovie() {
  const { num } = useParams();
  const [datas, setDatas] = useState(null)

  useEffect(()=>{
    fetch(`${API}/movies/${num}`)
    .then((data)=>data.json())
    .then((mv)=>setDatas(mv))
  }, [num]);

console.log(datas)
return datas ? <EditMovieForm datas={datas}/> : <h1>Loading..</h1>;

}
 
function EditMovieForm({datas}){
  const {handleSubmit,handleChange,handleBlur,touched,values,errors}=
  useFormik({
    initialValues:{
      name: datas.name ,
      poster:datas.poster ,
      rating:datas.rating  ,
      summary:datas.summary  ,
      trailer:datas.trailer ,
     },
    validationSchema: formValidationSchema ,
    onSubmit:(updatedMovie)=>{
      console.log(updatedMovie)
      UpdateMovie(updatedMovie)
    }
  })
  const navigate=useNavigate();
  const UpdateMovie= async (updatedMovie)=>{
  console.log(updatedMovie)
  await fetch(`${API}/movies/${datas.id}` ,{
     method: 'PUT',
     body: JSON.stringify(updatedMovie),
     headers:{
      "Content-Type": "application/json",
    },
    });
    navigate('/Movielist')
  }

  return (
    <form onSubmit={handleSubmit} className="add-movie-form">

      <TextField id="outlined-basic" label="Name" variant="outlined" 
      name="name"
      onChange={handleChange} 
      onBlur={handleBlur}
      value={values.name}
      type='text' placeholder="Name" 
      error={touched.name && errors.name}
      helperText={touched.name && errors.name ? errors.name : null} />


      <TextField id="outlined-basic" label="Poster" variant="outlined"
       name="poster"
       onChange={handleChange} 
       onBlur={handleBlur}
       value={values.poster}
       type='text' placeholder="Poster" 
       error={touched.poster && errors.poster}
       helperText={touched.poster && errors.poster ? errors.poster : null}/>


      <TextField id="outlined-basic" label="Rating" variant="outlined"
       name="rating"
       onChange={handleChange} 
       onBlur={handleBlur}
       value={values.rating}
        type='text' placeholder="Rating" 
        error={touched.rating && errors.rating}
       helperText={touched.rating && errors.rating ? errors.rating : null} />


      <TextField id="outlined-basic" label="Summary" variant="outlined"
       name="summary"
       onChange={handleChange} 
       onBlur={handleBlur}
       value={values.summary}
        type='text' placeholder="Summary" 
        error={touched.summary && errors.summary}
       helperText={touched.summary && errors.summary ? errors.summary : null} />


      <TextField id="outlined-basic" label="trailer" variant="outlined"
       name="trailer"
       onChange={handleChange} 
       onBlur={handleBlur}
       value={values.trailer}
        type='text' placeholder="trailer" 
        error={touched.trailer && errors.trailer }
       helperText={touched.trailer && errors.trailer ? errors.trailer : null} />


      <Button color='success' variant="contained" type="submit" >
        Save
        </Button>
    </form>
  );
}
