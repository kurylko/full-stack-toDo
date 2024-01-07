import {useEffect, useState} from "react";
import {useCookies} from 'react-cookie';
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";

const App = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const userEmail = cookies.Email;
    const [tasks, setTasks] = useState(null);
    const authToken = cookies.AuthToken;

    const getData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${userEmail}`);
            const json = await response.json();
            setTasks(json);
        } catch (error) {
            console.error('Oops..');
        }
    }

    useEffect(() => {
        if (authToken) {
            getData();
            console.log('token:', authToken);
        }
    }, [authToken]);


    //sort tasks by date
    const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));


    return (
        <div className="app">
            {!authToken && <Auth/>}
            {authToken && <>
                <ListHeader listName={'⛱️ Weekend Tick List'} getData={getData}/>
                {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData}/>)}
            </>}

        </div>
    );
}

export default App;
