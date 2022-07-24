import { combineReducers, applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import axios from 'axios'

const campusReducer = (state = [], action) => {
    if (action.type === "SET_CAMPUSES"){
        return action.campuses
    }
    return state
}

const studentReducer = (state = [], action) => {
    if (action.type === "SET_STUDENTS"){
        return action.students
    }
    return state
}

const reducer = combineReducers({
    campuses: campusReducer,
    students: studentReducer
})

export const fetchStudents = () => {
    return async(dispatch) => {
        const response = await axios.get('/api/students')
        const students = response.data
        dispatch({ type: "SET_STUDENTS", students })
    }
}

export const fetchCampuses = () => {
    return async(dispatch) => {
        const response = await axios.get('/api/campuses')
        const campuses = response.data
        dispatch({ type: "SET_CAMPUSES", campuses })
    }
}

const store = createStore(reducer, applyMiddleware(thunk, logger))

export default store