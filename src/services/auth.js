// import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
// import { auth } from "./config"
// import { Alert } from "react-native";

// export const signUp = async (email,password) =>{
//     try {
//         const userCredentials = await createUserWithEmailAndPassword(auth,email,password);
//         console.log(userCredentials)
//         await emailVerification()
//     } catch (error) {
//         console.log(error)
//     }
// }
// export const registerWithEmail= async (email,password) => {
//     try {
//       const {user} = await auth().createUserWithEmailAndPassword(email, password)
//       await user.sendEmailVerification()
//       return true
//     } catch (e) {
//       console.log(e)
//       return false
//     }
// }

// export const emailVerification = async() =>{
// const user = auth.currentUser
// try {
//     await sendEmailVerification(auth.currentUser,{
//         handleCodeInApp:true,
//         url:''
//     }).then(()=>{
//         Alert.alert(user.email)
//     } )
// } catch (error) {
//     console.log(error)
// }
    
// }