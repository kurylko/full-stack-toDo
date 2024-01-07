import {useState} from "react";

const Modal = ({mode, setShowModal, getData, task}) => {
    const editMode = mode === 'edit';

    const [data, setData] = useState({
        user_email: editMode ? task.user_email : 'testtest@com',
        title: editMode ? task.title : null,
        progress: editMode ? task.progress : 50,
        date: editMode ? task.date : new Date(),
    });

    const postData = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });
            if (response.status === 200) {
                console.log('Yooohoo');
                setShowModal(false);
                getData();
            }
        } catch (error) {
            console.error('Oops');
        }
    }

    const editData = async (e) => {
        e.preventDefault();
        try {
          const response =  await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${task.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });
          if(response.status === 200){
              setShowModal(false);
              getData();
              console.log('edited!');
          }
        } catch (error) {
            console.error('error!');
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData(data => ({
            ...data,
            [name]: value
        }));
        console.log(data);
    }

    return (
        <div className='overlay'>
            <div className='modal'>
                <div className='form-title-container'>
                    <h3>{mode} your task</h3>
                    <button onClick={() => setShowModal(false)}>X</button>
                </div>

                <form>
                    <input
                        required
                        maxLength={30}
                        placeholder='Your task goes here'
                        name='title'
                        value={data.title}
                        onChange={handleChange}
                    />
                    <br/>
                    <label for='range'>Drag to select current progress</label>
                    <input
                        required
                        type='range'
                        id='range'
                        min='0'
                        max='100'
                        name='progress'
                        value={data.progress}
                        onChange={handleChange}
                    />
                    <input className={mode} type='submit' onClick={editMode ? editData : postData}/>
                </form>
            </div>
        </div>
    );
}

export default Modal;