
export default function Student({allStudent}){
    return(
        <section>
            <table>
                <h1>all Students</h1>
                <thead>

                    <tr>
                        <th>sn</th>
                        <th>name</th>
                        <th>fName</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allStudent.map((items, index)=>{
                            return(
                                <tr key={items.id}>
                                    <td>{index + 1}</td>
                                    <td>{items.name}</td>
                                    <td>{items.fName}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </section>
    );
}