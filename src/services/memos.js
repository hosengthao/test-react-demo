const base_url = 'http://localhost:3000/api/'

export function requestMemos(token) {
    console.log(token);
    return fetch(base_url + 'memo', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
}

export function createMemo(token, memo) {
    console.log(token);
    console.log(memo);
    return fetch(base_url + 'memo', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(memo)
    })
}

export function deleteMemo(token, memo) {
    console.log(token);
    console.log(memo);
    return fetch(base_url + 'memo/' + memo.id, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            create_timestamp: memo.create_timestamp
        })
    })
}
