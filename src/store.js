import { combineReducers, applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import axios from 'axios'
import {reducer as toastrReducer} from 'react-redux-toastr'
import {toastr} from 'react-redux-toastr'

const filterSelect = (state = [], action) => {
    if (action.type === "SET_SELECT"){
        return action.campus
    }
    return state
}

const campusReducer = (state = [], action) => {
    if (action.type === "SET_CAMPUSES"){
        return action.campuses
    }
    if (action.type === "CREATE_SCHOOL"){
        return [...state, action.school]
    }
    if (action.type === "DELETE_CAMPUS"){
        return state.filter((campus) => campus.id !== action.campus)
    }
    if (action.type === "UPDATE_CAMPUS"){
        return state.map((campus) => campus.id !== action.campus.id ? campus : action.campus)
    }
    if (action.type === "GET_CAMPUS"){
        return state.map((campus) => campus.id !== action.campus.id ? campus : action.campus)
    }
    return state
}

const studentReducer = (state = [], action) => {
    if (action.type === "SET_STUDENTS"){
        return action.students
    }
    if (action.type === "CREATE_STUDENT"){
        return [...state, action.student]
    }
    if (action.type === "DELETE_STUDENT"){
        return state.filter(student => student.id !== action.id)
    }
    if (action.type === "UPDATE_STUDENT"){
        return state.map((student) => student.id !== action.student.id ? student : action.student)
    }
    return state
}
const searchReducer = (state = [], action) => {
    if (action.type === "SET_SEARCH"){
        return action.search
    }
    return state
}
const campusSearchReducer = (state = [], action) => {
    if (action.type === "SET_CAMPUS_SEARCH"){
        return action.search
    }
    return state
}

const authenticationReducer = (state = [], action) => {
    if (action.type === "SET_AUTH_TRUE"){
        return action.user
    }
    return state
}

const loginReducer = (state = [], action) => {
    if (action.type === "LOGIN_SUCCESS"){
        return action.signedInUser
    }
    return state
}

const reducer = combineReducers({
    campuses: campusReducer,
    students: studentReducer,
    toastr: toastrReducer,
    selected: filterSelect,
    search: searchReducer,
    campusSearch: campusSearchReducer,
    isAuthenticated: authenticationReducer,
    loggedInUser: loginReducer,
})

export const setAuthTrue = (email) => {
    return async(dispatch) => {
        const response = await axios.get('/users')
        const users = response.data
        let user = users.filter(user => user.email === email)
        dispatch({ type: 'SET_AUTH_TRUE', user })
    }
}

export const loginUser = (user) => {
    return async(dispatch) => {
        const response = await axios.post('/login', user)
        const data = response.data
        const signedInUser = data.user
        dispatch({ type: "LOGIN_SUCCESS", signedInUser})
    }
}

export const registerUser = (user) => {
    return async(dispatch) => {
        const email = user.email
        const password = user.password
        const response = await axios.post('/register', user)
        if (response.status === 200){
            toastr.success('User Created', 'You are now registerd and can login.')
            return
        } 
    }
}
export const setSearch = (search) => {
    return async(dispatch) => {
        dispatch({ type: "SET_SEARCH", search })
    }
}
export const setCampusSearch = (search) => {
    return async(dispatch) => {
        dispatch({ type: "SET_CAMPUS_SEARCH", search })
    }
}


export const fetchStudents = () => {
    return async(dispatch) => {
        try{
        const response = await axios.get('/api/students')
        const students = response.data
        dispatch({ type: "SET_STUDENTS", students })
        }
        catch(err){
            console.log(err)
        }
    }
}

export const fetchCampuses = () => {
    return async(dispatch) => {
        const response = await axios.get('/api/campuses')
        const campuses = response.data
        dispatch({ type: "SET_CAMPUSES", campuses })
    }
}

export const createStudent = (efe) => {
    return async(dispatch) => {
        const response = await axios.post('/api/students', efe)
        const student = response.data
        dispatch({ type: "CREATE_STUDENT", student })
        toastr.success('the title', 'hello')
    }
}



export const removeStudentFromCampus = (values, history) => {
    return async(dispatch) => {
      
        const studentReponse =  await axios.put(`/api/students/${values.studentId}`, { campusId: null })
        const student = studentReponse.data
        // // const response = await axios.get(`/api/campuses/${values.campusId}`)
        // // const campus = response.data
        dispatch({ type: "UPDATE_STUDENT", student })
        history.push('/students')
        toastr.success('Un-registered student', `${student.firstName} no longer attends the campus.`)
        // dispatch({ type: "GET_CAMPUS", campus })
    }
}

export const setTheSelect = (value) => {
    return async(dispatch) => {
        if (value === 'all'){
            const response = await axios.get(`/api/campuses/`)
            const campus = response.data
            dispatch({ type: "SET_SELECT", campus })
        } 
       else {
       const response = await axios.get(`/api/campuses/${value}`)
       const campus = response.data
       dispatch({ type: "SET_SELECT", campus })
        }
    }
}

export const removetStudent = (id) => {
    return async(dispatch) => {
        await axios.delete(`/api/students/${id}`)
        dispatch({ type: "DELETE_STUDENT", id })
        toastr.success('Unerolled Student', 'Re-enroll the student via their profile.')
    }
}

export const updateName = (update) => {
    return async(dispatch) => {
        const response = await axios.put(`/api/campuses/${update.id}`, { name: update.value })
        const campus = response.data
        dispatch({ type: "UPDATE_CAMPUS", campus })
    }
}

export const updateAddress = (update) => {
    return async(dispatch) => {
        const response = await axios.put(`/api/campuses/${update.id}`, { address: update.value })
        const campus = response.data
        dispatch({ type: "UPDATE_CAMPUS", campus })
    }
}
export const updateDescription = (update) => {
    return async(dispatch) => {
        const response = await axios.put(`/api/campuses/${update.id}`, { description: update.value })
        const campus = response.data
        dispatch({ type: "UPDATE_CAMPUS", campus })
    }
}

export const updateFirstName = (update) => {
    return async(dispatch) => {
        const response = await axios.put(`/api/students/${update.id}`, { firstName: update.value })
        const student = response.data
        dispatch({ type: "UPDATE_STUDENT", student })
    }
}

export const updatePhone = (update) => {
    return async(dispatch) => {
        const response = await axios.put(`/api/students/${update.id}`, { phone: update.value })
        const student = response.data
        dispatch({ type: "UPDATE_STUDENT", student })
        toastr.success('Updated number', `New number: ${update.value}`)
    }
}
export const updateTheName = (update) => {
    return async(dispatch) => {
        const response = await axios.put(`/api/campuses/${update.id}`, { name: update.value })
        const campus = response.data
        dispatch({ type: "UPDATE_CAMPUS", campus })
        toastr.success('Updated Campus Name', `The campus is renamed to ${campus.name}`)
    }
}

export const updateThePhoto = (update) => {
    return async(dispatch) => {
        const response = await axios.put(`/api/campuses/${update.id}`, { profilePicture: update.value })
        const campus = response.data
        dispatch({ type: "UPDATE_CAMPUS", campus })
        toastr.success('Updated Profile Picture', `The campus profile picture is updated!`)
    }
}

export const updateCampusCity = (update) => {
    return async(dispatch) => {
        const response = await axios.put(`/api/campuses/${update.id}`, { city: update.value })
        const campus = response.data
        dispatch({ type: "UPDATE_CAMPUS", campus })
        toastr.success('Updated Campus city', `The campus is renamed to ${campus.city}`)
    }
}
export const updateGPA = (update) => {
    return async(dispatch) => {
        const response = await axios.put(`/api/students/${update.id}`, { gpa: update.value })
        const student = response.data
        dispatch({ type: "UPDATE_STUDENT", student })
        toastr.success('Updated GPA', `New GPA: ${update.value}`)
    }
}

export const updateLastName = (update) => {
    return async(dispatch) => {
        const response = await axios.put(`/api/students/${update.id}`, { lastName: update.value })
        const student = response.data
        dispatch({ type: "UPDATE_STUDENT", student })
    }
}
export const updatePicture = (update) => {
    return async(dispatch) => {
        const response = await axios.put(`/api/students/${update.id}`, { imageUrl: update.value })
        const student = response.data
        dispatch({ type: "UPDATE_STUDENT", student })
        toastr.success('Updated Profile Picture', `A picture is worth a thousand words...`)
    }
}
export const updateTheEmail = (update) => {
    return async(dispatch) => {
        const response = await axios.put(`/api/students/${update.id}`, { email: update.value })
        const student = response.data
        dispatch({ type: "UPDATE_STUDENT", student })
    }
}


export const deleteCampus = (campus) => {
    return async(dispatch) => {
        await axios.delete(`/api/campuses/${campus}`)
        dispatch({ type: "DELETE_CAMPUS", campus })
        toastr.success('Deleted campus', `Campus is now deleted.`)
    }
}
export const createSchool = (efe, history) => {
    return async(dispatch) => {
        const response = await axios.post('/api/campuses', efe)
        const school = response.data
        dispatch({ type: "CREATE_SCHOOL", school })
        toastr.success('Created campus', 'Campus has been created.')
    }
}

const store = createStore(reducer, applyMiddleware(thunk, logger))

export default store