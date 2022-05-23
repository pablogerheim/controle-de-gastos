const email = 'admin'
const password = 'admin'
function signInEndpoint(email, password){
    return fetch(`http://localhost:3001/login`, {
        credentials: "include",
        method: "POST",
        headers: {
            "X-Powered-By": "Express",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application / json; charset = utf - 8",
            "Content-Length": "213",
            "ETag": 'W / "d5-9RZwLJBymwx4vnDLofrylLSREIs"'
        },
        body: JSON.stringify({ email, password }),
    }).then(handleResponse);
}
signInEndpoint(email, password)