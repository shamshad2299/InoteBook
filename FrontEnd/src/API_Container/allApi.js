const url = "http://localhost:5000"

export const allAPI ={
   Signup : {
  url : `${url}/api/auth/createuser`
},
Login : {
  url : `${url}/api/auth/login`
},
addNote : {
  url : `${url}/api/note`
},
getNoteByUser : {
  url : `${url}/api/note/usernote`
},
updateNote : {
  url : `${url}/api/note`
},
fetchUser : {
  url : `${url}/api/auth/verify`
}
}
