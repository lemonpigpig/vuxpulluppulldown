var AjaxHelper = {};

//get请求
AjaxHelper.GetRequest = function(p_router, p_actionParam, p_onSuccess, p_onFail, p_target) {
    if (!p_actionParam) {
        p_actionParam = {};
    }

    p_router.$http.get(GlobalModel.SERVER_URL, {
        params: p_actionParam
    }).then((response) => {
        if(response.data.status == GlobalModel.AJAX_STATUS_SUCCESS) {
            p_onSuccess.apply(p_target, [response.data]);
        }else{
            if(p_onFail) {
                p_onFail.apply(p_target, [response.data]);
            }else{
                alert(response.data.info);
            }
        }
    }, (response) => {
        alert("请求异常");
        //请求异常
    })
};
//post请求
AjaxHelper.PostRequest = function(p_router, p_actionParam, p_onSuccess, p_onFail, p_target) {
    if (!p_actionParam) {
        p_actionParam = {};
    }

    p_router.$http.post(GlobalModel.SERVER_URL, p_actionParam, { emulateJSON: true }).then((response) => {
        if(response.data.returncode == "0000") {
            p_onSuccess.apply(p_target, [response.data]);
        }else{
            //alert(response.data.message);
            p_onFail.apply(p_target, [response.data]);
        }
    }, (response) => {
        //请求异常
    })
};

module.exports = AjaxHelper;