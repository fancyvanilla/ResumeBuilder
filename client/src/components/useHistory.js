import {useState} from "react"

const useHistory=()=>{
 
    const [current,setCurrent]=useState({ name: "", position: "" })
    const [info, setInfo] = useState([{ name: "", position: "" }])

    const handleAdd = () =>{
        if (current.name.length > 0 && current.position.length > 0){
        setInfo([...info, current]);
        setCurrent({ name: "", position: "" })
        }
    }
    const handleRemove= (index) => {
        const list = [...info];
        list.splice(index, 1);
        setInfo(list);
    };

    const handleUpdate = (e) => {
        const { name, value } = e.target;
        setCurrent({...current,[name]:value})
    };

    return [handleAdd,handleRemove, handleUpdate,info]
}

export default useHistory



