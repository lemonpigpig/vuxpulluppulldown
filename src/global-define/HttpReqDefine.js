/**
 * @content: 全局的基于Vue-Resource的ajax预处理
 * @export
 * @param {any} request
 * @param {any} next
 * @returns
 */
// import store from './vuex/store'
// 全局错误处理，全局loading
// import { setLoading, setTip } from './vuex/actions/doc_actions'
export default function(request, next) {
    // if (request.tip !== false) {
    //   setLoading(store, true)
    // }
    var cookieUserInfo = common.getCookie(GlobalModel.Local_User_Info);
    var userInfo = cookieUserInfo ? JSON.parse(cookieUserInfo) : null;
    if (request.method == "POST") {
        request.url = request.url + 'm=' + request.body.m + '&a=' + request.body.a;
        request.body.token = (!userInfo || userInfo == undefined) ? "" : userInfo.tokenId;
    } else {
        request.params.token = (!userInfo || userInfo == undefined) ? "" : userInfo.tokenId;
    }

    next((res) => {
        // setLoading(store, false)
        //if(res.data){
        //  let data = JSON.parse(res.data);
        //
        //}
        // console.log(data);
        //  console.log('after ajax')
        if (res.status === 0) {
            console.log('网络不给力')
                // setTip(store, {
                //   text: '网络不给力，请稍后再试'
                // })
        }

        if (res.data.status == -1) {
            console.log(res.data.info);
        }
        // if (!data.success) {
        //   // setTip(store, {
        //   //   text: data.error_msg
        //   // })
        // }
        return res;
    })
}
