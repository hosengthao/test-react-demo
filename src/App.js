import Login from './components/Login.js';
import {Container} from 'react-bootstrap';
import Memos from './components/Memos.js'
import {useState, useEffect} from "react";
import {requestLogin} from './services/user.js'
import {requestMemos, createMemo, deleteMemo} from "./services/memos.js";

function App() {
    const [token, setToken] = useState('')
    const [memos, setMemos] = useState([])

    function handleError(error) {
        console.log(error)
    }

    function handleRequestMemos() {
        requestMemos(token).then(data => data.json(), handleError).then(json => {
            console.log(json)
            setMemos(json.memo_list)
        }, handleError).catch(handleError)
    }

    useEffect(() => {if (token) {handleRequestMemos()}}, [token])

    function handleLoginRequest(username, password) {
        requestLogin({username, password}).then(data => data.json(), handleError).then(json => {
            console.log(json);

            if (json.token) {
                setToken(json.token)
            } else {
                console.log('no token')
            }
        }, handleError).catch(handleError)
    }

    function handleLogoutRequest(username, password) {
        setToken('')
    }

    async function handleCreateMemo(memo) {
        await createMemo(token, memo).then(data => data.json(), handleError).then(json => {
            console.log(json);
        }, handleError).catch(handleError)
        handleRequestMemos();
    }

    async function handleDeleteMemo(memo) {
        await deleteMemo(token, memo).then(data => data.json(), handleError).catch(handleError)
        handleRequestMemos();
    }

    return (
        <Container>
            {
                token ?
                    <Memos logout={handleLogoutRequest} handleCreateMemo={handleCreateMemo} handleDeleteMemo={handleDeleteMemo} memos={memos}/> :
                    <Login handleLoginRequest={handleLoginRequest}/>}
        </Container>
    );
}

export default App;
