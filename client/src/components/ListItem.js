import {useState} from "react";
import ProgressBar from "./ProgressBar";
import TickIcon from "./TickIcon";
import Modal from "./Modal";

const ListItem = ({getData, task}) => {
    const [showModal, setShowModal] = useState(false);

    const deleteItem = async () => {
        try {
            const response = await fetch(`http://localhost:8000/todos/${task.id}`, {
                method: 'DELETE',
            });
            if (response.status === 200) {
                getData();
            }
        } catch (error) {
            console.error('error');
        }
    }

    return (
        <div className='list-item'>

            <div className='info-container'>
                <TickIcon/>
                <p className='task-title'>{task.title}</p>
                <ProgressBar/>
            </div>

            <div className='button-container'>
                <button className='edit' onClick={() => setShowModal(true)}>EDIT</button>
                <button className='delete' onClick={deleteItem}>DELETE</button>
            </div>
            {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} task={task}/>}
        </div>
    );
}

export default ListItem;