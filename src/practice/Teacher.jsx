import { useState } from "react";

export default function Teacher({allStudent, setAllStudent}){
    const [name, setName] = useState("");
    const [fName, setFname] = useState("");
    const addStudent = (e)=>{
        e.preventDefault();
        if(name === "" || fName === ""){
            alert('please fill out all field first');
            return;
        }
        const newStudent = {
            id:Date.now(),
            name,
            fName
        }
        setAllStudent(pre =>[...pre, newStudent]);
        setName('');
        setFname('');
    }
    return(
        <section>
            <form onSubmit={addStudent}>
                <h1 className="text-center font-bold text-4xl m-8">Teacher as admin</h1>
                <input type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                className="border " />
                <input type="text"
                value={fName}
                onChange={(e)=> setFname(e.target.value)}
                className="border" />
                <button type="submit">add</button>
            </form>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>sn</th>
                            <th>name</th>
                            <th>f/name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allStudent.map((item, index)=>{
                                return (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.fName}</td>
                                    </tr>
                                
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
}