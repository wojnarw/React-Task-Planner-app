import React from "react";
import Operation from "./Operation";

const Operations = ({ task, operations, showForm }) => {
    

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
                {operations.map((operation, index) => <Operation key={index} passedOperation={operation} />)}
                {/* onRemove={handleRemove} onStatusChange={toggleStatus} />) } */}
            </ul>
        </>
    )
}

export default Operations;