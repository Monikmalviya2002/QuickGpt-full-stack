
import validator from "validator";

    

   const validateSignUp = (req)=>{
          
          const {emailId, password} = req.body;
            if(!emailId || !password){
                 throw new Error("This field should not be empty");
            } else if(!validator.isEmail(emailId)){
                  throw new Error("Invalid emailId")     
            } 
            else if(!validator.isStrongPassword(password)){
                  throw new Error("Password is not strong");
            }
   };

   export default validateSignUp;