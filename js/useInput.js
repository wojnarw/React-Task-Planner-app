import React, {useState} from "react"

const useInput = (valueOnStart) => {
    const [value, setValue] = useState(valueOnStart);
    const onChange = (e) => setValue(e.target.value);
    
    return ([
        value,
        {
            value, 
            onChange
        },
        setValue
    ])
}
export default useInput;