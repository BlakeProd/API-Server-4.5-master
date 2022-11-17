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

function deleteToken(tokeninfo) {
    
}

function storeToken(tokeninfo) {
    localStorage.setItem('token', tokeninfo.Access_token);
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

}

function register(credentials, successCallBack, errorCallBack) {
            $.ajax({
                url: host + "token",
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(credentials),
                success: (tokeninfo) => {
                    storeToken(tokeninfo);
                    successCallBack(tokeninfo)
                },
                error: function (jqXHR) { errorCallBack(jqXHR.status) }
            });
        }

function confirm() {

        }
