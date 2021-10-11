import {requestMemos, createMemo, deleteMemo} from "../services/memos.js";

//actions
const GET_MEMOS_REQUEST = 'memos/memos/GET_MEMOS_REQUEST'
const GET_MEMOS_SUCCESS = 'memos/memos/GET_MEMOS_SUCCESS'
const GET_MEMOS_FAILURE = 'memos/memos/GET_MEMOS_FAILURE'

const CREATE_MEMOS_REQUEST = 'memos/memos/CREATE_MEMOS_REQUEST'
const CREATE_MEMOS_SUCCESS = 'memos/memos/CREATE_MEMOS_SUCCESS'
const CREATE_MEMOS_FAILURE = 'memos/memos/CREATE_MEMOS_FAILURE'

const DELETE_MEMOS_REQUEST = 'memos/memos/CREATE_MEMOS_REQUEST'
const DELETE_MEMOS_SUCCESS = 'memos/memos/CREATE_MEMOS_SUCCESS'
const DELETE_MEMOS_FAILURE = 'memos/memos/CREATE_MEMOS_FAILURE'

//reducer
const initialState = {
    getMemosPending: false,
    getMemosFailure: false,
    memos: [],
    createMemoPending: false,
    createMemoFailure: false,
    deleteMemoPending: false,
    deleteMemoFailure: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_MEMOS_REQUEST:
            return {...state, getMemosPending: true}

        case GET_MEMOS_SUCCESS:
            return {
                ...state,
                getMemosPending: false,
                getMemosFailure: false,
                memos: action.memos
            }

        case GET_MEMOS_FAILURE:
            return {
                ...state,
                getMemosPending: false,
                getMemosFailure: true
            }

        case CREATE_MEMOS_REQUEST:
            return {...state, createMemoPending: true}

        case CREATE_MEMOS_SUCCESS:
            return {
                ...state,
                createMemoPending: false,
                createMemoFailure: false
            }

        case CREATE_MEMOS_FAILURE:
            return {
                ...state,
                createMemoPending: false,
                createMemoFailure: true
            }

        case DELETE_MEMOS_REQUEST:
            return {...state, deleteMemoPending: true}

        case DELETE_MEMOS_SUCCESS:
            return {
                ...state,
                deleteMemoPending: false,
                deleteMemoFailure: false
            }

        case DELETE_MEMOS_FAILURE:
            return {
                ...state,
                deleteMemoPending: false,
                deleteMemoFailure: true
            }

        default:
            return state
    }
}

//action creators
export function getMemosRequest() {
    return {type:GET_MEMOS_REQUEST}
}

export function getMemosSuccess(memos) {
    return {
        type:GET_MEMOS_SUCCESS,
        memos: memos
    }
}

export function getMemosFailure() {
    return {type:GET_MEMOS_FAILURE}
}

export function createMemoFailure() {
    return {type:CREATE_MEMOS_FAILURE}
}

export function createMemoRequest() {
    return {type:CREATE_MEMOS_REQUEST}
}

export function createMemoSuccess() {
    return {
        type:CREATE_MEMOS_SUCCESS
    }
}

export function deleteMemoFailure() {
    return {type:DELETE_MEMOS_FAILURE}
}

export function deleteMemoRequest() {
    return {type:DELETE_MEMOS_REQUEST}
}

export function deleteMemoSuccess() {
    return {
        type:DELETE_MEMOS_SUCCESS
    }
}

//side effects
export function initiateGetMemos() {
    return function getMemos(dispatch, getState) {
        dispatch(getMemosRequest())
        requestMemos(getState().user.token).then(response => {
            if (!response.ok) {
                dispatch(getMemosFailure())
                return
            }

            response.json().then(json => {
                if (!json.memo_list) {
                    dispatch(getMemosFailure())
                    return
                }

                dispatch (getMemosSuccess(json.memo_list))
            }, () => dispatch(getMemosFailure()))
        }, () => dispatch(getMemosFailure()))
    }
}

export function initiateCreateMemo(memo) {
    return function createMemoDispatcher(dispatch, getState) {
        dispatch(createMemoRequest())
        createMemo(getState().user.token, memo).then(response => {
            if (!response.ok) {
                dispatch(createMemoFailure())
                return
            }

            response.json().then(json => {
                if (!json.message) {
                    dispatch(createMemoFailure())
                    return
                }

                if (json.message !== 'created') {
                    dispatch(createMemoFailure())
                    return
                }

                dispatch(createMemoSuccess())
                dispatch(initiateGetMemos())
            }, () => dispatch(createMemoFailure()))
        }, () => dispatch(createMemoFailure()))
    }
}

export function initiateDeleteMemo(memo) {
    return function deleteMemoDispatcher(dispatch, getState) {
        dispatch(deleteMemoRequest())
        deleteMemo(getState().user.token, memo).then(response => {
            if (!response.ok) {
                dispatch(deleteMemoFailure())
                return
            }

            response.json().then(json => {
                if (!json.message) {
                    dispatch(deleteMemoFailure())
                    return
                }

                if (json.message !== 'deleted') {
                    dispatch(deleteMemoFailure())
                    return
                }

                dispatch(deleteMemoSuccess())
                dispatch(initiateGetMemos())
            }, () => dispatch(deleteMemoFailure()))
        }, () => dispatch(deleteMemoFailure()))
    }
}