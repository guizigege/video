function $post(url,data,headers,success,fail){
    $.ajax({
        url: `${baseUrl}${url}`,
        type: 'POST',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: "text/plain",
        headers: headers,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success(res) {
            success(res);
        },
        fail(res) {
            fail(res);
        }
    })
}

