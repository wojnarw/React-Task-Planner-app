import React, { useState, useEffect } from "react";
import {getOperations} from "../api/operations";
import Operation from "./Operation";

const Operations = ({task}) => {
    const [operations, setOperations] = useState([]);

    useEffect(() => {
        getOperations(task.id, setOperations);
        // getOperations(task.id, console.log);
    },[]);

    return (
        <>
            <div className="card-body">
                <form>
                    <div className="input-group">
                    <input type="text"
                            className="form-control"
                            placeholder="Operation description"/>

                    <div className="input-group-append">
                        <button className="btn btn-info">
                        Add
                        <i className="fas fa-plus-circle ml-1"></i>
                        </button>
                    </div>
                    </div>
                </form>
            </div>

            <ul className="list-group list-group-flush">
                { operations.map((el, index) => <Operation key={index} passedOperation={el}  />) }
                    {/* onRemove={handleRemove} onStatusChange={toggleStatus} />) } */}
            </ul>
        </>
    )
}

export default Operations;