import service  from "..";
// 获取首页轮播图的数据
export function getBanner(){
    // 返回service 里面传入的是个对象
    return service({
        method:"GET",
        url:"/banner?type=2",
    })
}
//获取发现好歌单
export function getMusicList(){
    return service({
        method:"GET",
        url:"/personalized?limit=10"
    })
}
//搜索
export function getSearchMusic(data){
    return service({
        method:"GET",
        url:`/search?keywords=${data}`
    })
}
//登录
export function getPhoneLogin(data){
    return service({
        method:"GET",
        url:`/login/cellphone?phone=${data.phone}&password=${data.password}`
    })
}
//获取用户详情
export function getLoginUser(data){
    return service({
        method:"GET",
        url:`/user/detail?uid=${data}`
    })
}
