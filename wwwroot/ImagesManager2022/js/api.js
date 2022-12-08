const apiBaseURL = "http://localhost:5000/api/images";
const host = "http://localhost:5000/";

function retrieveAccessToken() {
    return localStorage.getItem('token');
}

function getBearerAuthorizationToken() {
    return { 'Authorization': 'Bearer ' + retrieveAccessToken() };
}

function HEAD(successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL,
        type: 'HEAD',
        contentType: 'text/plain',
        headers: getBearerAuthorizationToken(),
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
        headers: getBearerAuthorizationToken(),
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: (userCreated) => {
            successCallBack(userCreated)
        },
        error: function (jqXHR) {
            errorCallBack(jqXHR.status)
        }
    });
}
function PUT(image, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/" + image.Id,
        type: 'PUT',
        headers: getBearerAuthorizationToken(),
        contentType: 'application/json',
        data: JSON.stringify(image),
        success: () => { successCallBack() },
        error: function (jqXHR) {
            errorCallBack(jqXHR.status)
        }
    });
}

function collect_Id(id, errorCallBack) {
    localStorage.setItem('id', tokeninfo.Access_token);
}

function DELETE(id, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/" + id,
        type: 'DELETE',
        headers: getBearerAuthorizationToken(),
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

function createToken() { // pas besoin
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

function remove(userId, successCallBack, errorCallBack) {
    $.ajax({
        url: host + "accounts/remove/" + userId,
        type: 'GET',
        headers: getBearerAuthorizationToken(),
        contentType: 'application/json',
        success: () => {
            successCallBack();
        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    })
}

function modify(userInfo, successCallBack, errorCallBack) {
    let BearerToken = getBearerAuthorizationToken();
    console.log(BearerToken);
    $.ajax({
        url: host + "accounts/modify",
        type: 'PUT',
        headers: getBearerAuthorizationToken(),
        contentType: 'application/json',
        data: JSON.stringify(userInfo),
        success: (userInfo) => {
            getUserInfo(userInfo, successCallBack, errorCallBack);
        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
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
        error: function (jqXHR) {
            errorCallBack(jqXHR.status)
        }
    });
}

function verifyEmail(verifyUser, successCallBack, errorCallBack) {
    $.ajax({
        url: host + "accounts/verify?id=" + verifyUser.Id + "&code=" + verifyUser.VerifyCode,
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
