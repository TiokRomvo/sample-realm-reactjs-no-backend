export function request (url, method, body, headers) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method || method, url);
        if (headers) {
            Object.keys(obj.headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });
        }
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(JSON.stringify(body));
    });
};

