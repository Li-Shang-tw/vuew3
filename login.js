
//api
const url ='https://vue3-course-api.hexschool.io/';
const path ="shang";


Vue.createApp({
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

