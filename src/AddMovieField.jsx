import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import {useFormik} from 'formik'; 

const formValidationSchema=yup.object(
  {
    name:yup.string().required().min(1),
    poster:yup.string().required().url(),
    rating:yup.number().required().min(0).max(10),
    summary:yup.string().required().min(20),
    trailer:yup.string().required().url(),

  }
)

export function AddMovieField() {

  const {handleSubmit,handleChange,handleBlur,touched,values,errors}=useFormik({
    initialValues:{
      name:'' ,
      poster:'',
      rating:'' ,
      summary:'' ,
      trailer:'' ,
     },
    validationSchema: formValidationSchema ,
    onSubmit:(newMovie)=>{
      console.log(newMovie)
      addMovie(newMovie)
    }
  })
  const navigate=useNavigate();
  const addMovie= async (newMovie)=>{
  console.log(newMovie)
  await fetch('https://640055b59f844910298e4cd4.mockapi.io/movies' ,{
     method: 'POST',
     body: JSON.stringify(newMovie),
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


      <Button variant="contained" type="submit" >
        Add Movie
        </Button>
    </form>
  );
}
