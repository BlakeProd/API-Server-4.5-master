const apiBaseURL = "http://localhost:5000/api/images";
const host = "http://localhost:5000/";

function HEAD(successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL,
        type: 'HEAD',
        contentType: 'text/plain',
        complete: request => { successCallBack(request.getResponseHeader('ETag')) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function GET_ID(id, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/" + id,
        type: 'GET',
        success: data => { successCallBack(data); },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function GET_ALL(successCallBack, errorCallBack, queryString = null) {
    let url = apiBaseURL + (queryString ? queryString : "");
    $.ajax({
        url: url,
        type: 'GET',
        success: (data, status, xhr) => { successCallBack(data, xhr.getResponseHeader("ETag")) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function POST(data, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: (data) => { successCallBack(data) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function PUT(image, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/" + image.Id,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(image),
        success: () => { successCallBack() },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}

function collect_Id(id, errorCallBack) {
    localStorage.setItem('id', tokeninfo.Access_token);
}

function DELETE(id, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/" + id,
        type: 'DELETE',
        success: () => { successCallBack() },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}

function deleteToken() {
    localStorage.removeItem('token')
}

function storeToken(tokeninfo) {
    localStorage.setItem('token', tokeninfo.Access_token);
}

function createToken() {
    let tokenCreation = Math.random().toString(36).substr(2);
    localStorage.setItem('token', tokenCreation);
}

function getUserInfo(userId, successCallBack, errorCallBack) {
    $.ajax({
        url: host + "accounts/index/" + userId,
        type: 'GET',
        success: (userInfo) => {
            localStorage.setItem('user', JSON.stringify(userInfo));
            successCallBack();
        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    })
}
function login(credentials, successCallBack, errorCallBack) {
    $.ajax({
        url: host + "token",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(credentials),
        success: (tokenInfo) => {
            storeToken(tokenInfo);
            getUserInfo(tokenInfo.UserId, successCallBack, errorCallBack);
        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}

function logout(credentials, successCallBack, errorCallBack) {
    $.ajax({
        url: host + "token",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(credentials),
        success: (tokeninfo) => {
            deleteToken();
            successCallBack(tokeninfo)
        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}

function register(profile, successCallBack, errorCallBack) {
    $.ajax({
        url: host + "accounts/register",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(profile),
        success: (profile) => {
            successCallBack(profile)
        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}

function verify(verifyUser, successCallBack, errorCallBack) {
    $.ajax({
        url: host + "accounts/verify",
        type: 'GET',
        contentType: 'application/json',
        data: JSON.stringify(verifyUser),
        success: (verifyUser) => {
            storeToken(verifyUser);
            successCallBack(verifyUser)
        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
