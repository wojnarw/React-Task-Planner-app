import React, { useState } from "react";
import useInput from "../useInput";
import { updateOperationInDB } from "../api/operations";

const Operation = ({ passedOperation, onRemoveOperation }) => {
    const [operation, setOperation] = useState(passedOperation);
    const [showAddTimeForm, setShowAddTimeForm] = useState(false);
    const [time, propsTime, setTime] = useInput("0");

    const style = {
        width: "12rem"
    }

    const refactorTime = () => {
        if (+operation.timeSpent / 60 >= 1) {
            let hours = Math.floor(+operation.timeSpent / 60);
            let minutes = +operation.timeSpent % 60;
            return `${hours}h ${minutes}m`;
        }
        else return operation.timeSpent + "m";
    }

    const toggleAddTimeForm = () => {
        setShowAddTimeForm(prevState => !prevState);
        setTime(0);
    }

    const updateTimeState = (updatedOperation) => {
        setOperation(updatedOperation);
        toggleAddTimeForm();
    }

    const addTimeToOperation = (e) => {
        e.preventDefault();
        if(isNaN(time)) alert("Podaj czas w minutach!");
        else if(+time !== 0 && (+operation.timeSpent + +time) >= 0 ) {
            const updatedOperation = {
                ...operation,
                timeSpent: +operation.timeSpent + +time
            };

            updateOperationInDB(updatedOperation, updateTimeState);
        }
        else alert("Czas musi być dodatni!");
    }

    return (
        <>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    {operation.description}

                    {+operation.timeSpent > 0 && (
                        <span className="badge badge-success badge-pill ml-2">
                            { refactorTime()}
                        </span>
                    )}
                </div>


                {/* <!-- Formularz wyświetlany po naciśnięciu "Add time", po zapisie czasu znika --> */}
                {showAddTimeForm &&
                    <form onSubmit={addTimeToOperation}>
                        <div className="input-group input-group-sm">
                            <input type="number"
                                className="form-control"
                                placeholder="Spent time in minutes"
                                style={style} {...propsTime} />
                            <div className="input-group-append">
                                <button type="submit" className="btn btn-outline-success"><i className="fas fa-save"></i></button>
                                <button type="button" onClick={toggleAddTimeForm} className="btn btn-outline-dark"><i className="fas fa-times false"></i></button>
                            </div>
                        </div>
                    </form>
                }

                {/* <!-- div wyświetlany domyślnie, znika po wciśnięciu "Add time" --> */}
                {!showAddTimeForm &&
                    <div>
                        {/* <!-- Przycisk widoczny tylko jeżeli status zadania jest "open" --> */}
                        <button onClick={toggleAddTimeForm} className="btn btn-outline-success btn-sm mr-2">
                            Add time
                            <i className="fas fa-clock ml-1"></i>
                        </button>

                        <button onClick={_ => onRemoveOperation(operation)} className="btn btn-outline-danger btn-sm"><i className="fas fa-trash"></i></button>
                    </div>
                }
            </li>
        </>
    )
}

export default Operation;