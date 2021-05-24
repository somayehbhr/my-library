import data from "../../info.json"
import React from "react";

function Books() {
const [list,setList]=React.useState<typeof data>([])


        return (
            <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">topic</th>
                        <th scope="col">release_date</th>
                        <th scope="col">rate</th>
                        <th scope="col">author</th>
                        <th scope="col">price</th>
                    </tr>
                </thead>
                <tbody>
                {list.map((row,index) => (
                    <tr key={row.id}>
                        <td>{index + 1}</td>
                        <td>{row.topic}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    )
                )}
                </tbody>
            </table>
        </div>
)
}
export default Books