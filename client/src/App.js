import {useEffect, useState} from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";

const App = () => {
    const userEmail = 'testuser@com';
    const [tasks, setTasks] = useState(null);

    const getData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/todos/${userEmail}`);
            const json = await response.json();
            setTasks(json);
        } catch (error) {
            console.error('Oops..');
        }
    }

    useEffect(() => getData, []);

    console.log(tasks);

    //sort tasks by date
    const sortedTasks = tasks?.sort((a,b)=> new Date(a.date) - new Date(b.date));

    return (
        <div className="app">
            <ListHeader listName={'⛱️ Weekend Tick List'}/>
            {sortedTasks?.map((task) => <ListItem key={task.id} task={task}/>)}
        </div>
    );
}

export default App;
