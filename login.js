
//api
const url ='https://vue3-course-api.hexschool.io/';
const path ="shang";
//引入vue createApp
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

const app = Vue.createApp({
  data(){
      return{
        username:"",
        password:""
      }
  },methods:{
    login(){
      let user ={
    username: this.username,
    password: this.password
    } ;
     axios.post(`${url}admin/signin`,user).then((res)=>{
         if (res.data.success) {
           //把token存入cookie
            const { token, expired } = res.data;            
            document.cookie = `hexToken=${token};expires=${new Date(expired)}`;
           //轉址到後台葉面
           window.location="index.html"
            
          }
          //帳號錯誤
          else{
            alert("你的帳號錯誤窩窩")
          }
    
      
    
   }) 
    }
  }
}).mount('#app')

