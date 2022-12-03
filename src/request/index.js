//创建实例
import axios from 'axios';
let service=axios.create({
    // 服务器返回的地址
    baseURL:"http://localhost:3000/",
    timeout:1000
})

export default service