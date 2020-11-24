export const checkValidity = (value, rules) => {
    //check validity and return boolean
    //rules is validation object
    let isValid = false;
    if(!rules){
      return true; 
    }
    if(rules.required){
      isValid = value.trim() !== '';

    }
    //add rules neccessary
    if (rules.minLength){
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength){
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }
