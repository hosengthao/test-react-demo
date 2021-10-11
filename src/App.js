import Login from './components/Login.js';
import {Container} from 'react-bootstrap';
import Memos from './components/Memos.js'
import {connect} from "react-redux";
import {initiateLogin, logout} from "./modules/user";
import {initiateCreateMemo, initiateDeleteMemo} from "./modules/memos";

function App({
                 dispatch,
                 loginPending,
                 loginFailure,
                 token,
                 getMemosPending,
                 getMemosFailure,
                 memos,
                 createMemoPending,
                 createMemoFailure,
                deleteMemoPending,
                deleteMemoFailure}) {


    return (
        <Container>
            {
                token ?
                    <Memos
                        logout={() => dispatch(logout())}
                        handleCreateMemo={memo => dispatch(initiateCreateMemo(memo))}
                        handleDeleteMemo={memo => dispatch(initiateDeleteMemo(memo))}
                        memos={memos}
                        getMemosPending={getMemosPending}
                        getMemosFailure={getMemosFailure}
                        createMemoPending={createMemoPending}
                        createMemoFailure={createMemoFailure}
                        deleteMemoPending={deleteMemoPending}
                        deleteMemoFailure={deleteMemoFailure}
                    /> :
                    <Login
                        handleLoginRequest={(username, password) => dispatch(initiateLogin({username,password}))}
                        loginFailure={loginFailure}
                        loginPending={loginPending}
                    />
            }
        </Container>
    );
}

function mapStateToProps(state) {
    return {...state.user, ...state.memos}
}

export default connect(mapStateToProps)(App);
