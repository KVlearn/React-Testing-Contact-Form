import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';

const ContactForm = () => {
  const [data, setData] = useState();
  const [post,setPost]=useState();
  const { register, errors, handleSubmit } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (data) => {
    setData(data);
  };

  useEffect(()=>{
   axios.post("https://reqres.in/api/users",data)
    .then(res=>{
      console.log('here is post',res.data)
      setPost(res.data)
    })
    .catch(err=>console.log('error in axios call',err)) 

  },[data])

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name*</label>
          <input
            id="firstName"
            name="firstName"
            placeholder="Edd"
            ref={register({ required: true, maxLength: 15 })}
          />
          {errors.firstName && (
            <p>Looks like there was an error: {errors.firstName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName">Last Name*</label>
          <input
            id="lastName"
            name="lastName"
            placeholder="Burke"
            ref={register({ required: true })}
          />
          {errors.lastName && (
            <p>Looks like there was an error: {errors.lastName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" placeholder="bluebill1049@hotmail.com">
            Email*
          </label>
          <input 
          id="email"
          name="email" ref={register({ required: true })} />
          {errors.email && (
            <p>Looks like there was an error: {errors.email.type}</p>
          )}
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea 
          id="message"
          name="message" 
          ref={register({ required: false })} />
        </div>
        <div>
        <label htmlFor="location">Select your Location !</label>
        <select 
        id="location"
        name="location"
        ref={register({ required: false })}
        > 
        <option value="Portland">Portland</option>  
        <option value="Seattle">Seatle</option> 
        <option value="Los Angeles">Los Angeles</option>  
        </select>
        </div>
        <div>
          <label htmlFor="agree">Agree to Terms and Condition*</label>
          <input id="agree"
          name="agree"
          value="Agree"
          type="checkbox"
          ref={register({ required: true })}>
          </input>
          {errors.agree && (
            <p>Looks like there was an error: {errors.agree.type}</p>
          )}
        </div>
        {data && (
          <pre style={{ textAlign: "left", color: "white" }}>
            {JSON.stringify(post, null, 2)}
          </pre>
        )}
        
        <input type="submit" />
      </form>
    </div>
  );
};

export default ContactForm;
