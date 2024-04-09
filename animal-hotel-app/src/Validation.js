function Validation(values) {

    let error = {}
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.firstName === ""){
        error.firstName = "First name should not be empty"
    }
    if(values.lastName === ""){
        error.lastName = "Last name should not be empty"
    }
    if(values.username === ""){
        error.username = "Username should not be empty"
    }
    if(values.email === ""){
        error.email = "Email should not be empty"
    }
    if(!emailPattern.test(values.email)){
        error.email = "Email didn't match"
    }
    if(values.password === ""){
        error.password = "Password should not be empty"
    }
    if(!passwordPattern.test(values.password)){
        error.password = "Password should contain at least 1 digit, 1 uppercase and lowercase letter and minimum length to be 8"
    }
    if(values.confirmPassword === "" || String(values.confirmPassword) !== String(values.password)){
        error.confirmPassword = "Password not matched"
    }
    return error;
}
export default Validation;