

//api
const url ='https://vue3-course-api.hexschool.io/';
const path ="shang";


 
 //預設變數
 let productModal = null;
let delProductModal = null;
          

Vue.createApp({
    data(){
      return{
         products:[],         
         //create temporaryProuct for edit and create

          temporaryProuct:{
                     
          }, 
          deleteProductId:""                  
      }
    },
    methods:{
     getProducts(){      
       axios.get(`${url}api/${path}/admin/products`).then(res=>{
         //把資料放進products中
         this.products = res.data.products;              
       })
     },
     showProductModal(pattern,direction){       
        if(pattern=="create"){
          //新增模式
          productModal.show();
          //預設清空temporaryProuct的資料
          this.temporaryProuct={}
        }
        else if(pattern=="edit"){
        //修改模式
        productModal.show();
        //從proudcts中取得對應proudct資料，放進temporaryProuct中        
         this.temporaryProuct  = this.products.find(product=>{
           return product.id ==direction
         });        
        }
        else if(pattern=="delete"){
         //刪除模式
         this.deleteProductId =direction;
          delProductModal.show();   
        }          
     },
     
     modifyProduct(id){ 
       
      //取得modal中的product    
      const product ={          
            ...this.temporaryProuct,
            //數字轉型
            origin_price:parseInt(this.temporaryProuct.origin_price),
            price:parseInt(this.temporaryProuct.price)
        };     
      //以id是否為undefined來判斷是新增/編輯
      if(id==undefined){
         //新增             
         //發送post請求新增
         this. postNewProduct(product);        
       }
       else{
         //編輯        
         //發送put請求新增
      this.putProduct(id,product);
       }   
    
       
               
     },
     deleteProduct(id){
      axios.delete(`${url}api/${path}/admin/product/${id}`).then(res=>{
         //刪除失敗
        if(!res.data.success){
            alert(res.data.message);  
            delProductModal.hide();
        }else{
          //刪除成功
           alert(res.data.message);       
        //清除deleteProductId的值
        this.deleteProductId="";
         //關閉modal
      delProductModal.hide();
        //重新取得product值
        this.getProducts();
        }
      

      })
     },
     postNewProduct(newProduct){
     axios.post(`${url}api/${path}/admin/product`, { data: newProduct }).then(res=>{
        //錯誤通知
      if(!res.data.success){
      
      //關閉modal
      productModal.hide();
      alert(`${res.data.message}`);
        }else{
         //建立成功
      alert("產品建立成功!!");
       
         //關閉modal
       productModal.hide();
       //重新取得商品資料
     this.getProducts(); }     
     })
     } ,
     putProduct(id,editedProduct){
       axios.put(`${url}api/${path}/admin/product/${id}`, { data: editedProduct }).then(res=>{
         alert(res.data.message);
       
         //關閉modal
       productModal.hide();
         this.getProducts();
       })
     }
    },
    mounted(){      
      //取出token
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1"); 
      //-------未登入，轉址回登入頁----
      if(token ==""){
      alert('您尚未登入請重新登入。');
      window.location = 'login.html';
      }

     //----登入狀態------
      //將token預設放進axios的header      
        axios.defaults.headers.common.Authorization = token;
        //取得product資料
      this. getProducts();
       //addProductModal實體化
 productModal = new bootstrap.Modal(document.querySelector('#productModal'));
  //deleteProductModal實體化
delProductModal = new bootstrap.Modal(document.querySelector('#delProductModal'));

    }
  }).mount('#app');

