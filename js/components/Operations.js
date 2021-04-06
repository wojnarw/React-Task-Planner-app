import React, { useState, useEffect } from "react";
import { getOperationsFromDB } from "../api/operations";
import Operation from "./Operation";

const Operations = ({ task, hasOperations, showForm }) => {
    const [operations, setOperations] = useState([]);

    const prepareOperations = async () => {
        const response = await getOperationsFromDB(task.id);
        if (response.error) console.warn("Error getting operations from database!");
        else {
            setOperations(response.data);
            hasOperations(response.data.length > 0);
        }
    }

    useEffect(() => {
        prepareOperations();
    }, []);

    return (
        <>
            { showForm &&
                <div className="card-body">

                    <form>
                        <div className="input-group">
                            <input type="text"
                                className="form-control"
                                placeholder="Operation description" />

                            <div className="input-group-append">
                                <button className="btn btn-info">
                                    Add
                                    <i className="fas fa-plus-circle ml-1"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            }

            <ul className="list-group list-group-flush">
                {operations.map((el, index) => <Operation key={index} passedOperation={el} />)}
                {/* onRemove={handleRemove} onStatusChange={toggleStatus} />) } */}
            </ul>
        </>
    )
}

export default Operations;