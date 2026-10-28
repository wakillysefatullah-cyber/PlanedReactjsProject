import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Teacher from "./Teacher";
import Student from "./Student";
export default function Parent(){
    const [allStudent, setAllStudent] = useState([]);
    return(
        <Router>
            <Routes>
                <Route path="/Teacher" 
                element={<Teacher allStudent={allStudent} setAllStudent={setAllStudent}/>}/>
                <Route path="/Student" 
                element={<Student allStudent={allStudent}/>}/>
            </Routes>
        </Router>
    );
}