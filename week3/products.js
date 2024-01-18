// import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

// let productModal = null;
// let delProductModal = null;

// createApp({
//   data() {
//     return {
//       apiUrl: 'https://vue3-course-api.hexschool.io/v2',
//       apiPath: 'hexschoolvue',
//       products: [],
//       isNew: false,
//       tempProduct: {
//         imagesUrl: [],
//       },
//     }
//   },
//   mounted() {
//     productModal = new bootstrap.Modal(document.getElementById('productModal'), {
//       keyboard: false
//     });

//     delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
//       keyboard: false
//     });

//     // 取出 Token
//     const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
//     axios.defaults.headers.common.Authorization = token;

//     this.checkAdmin();
//   },
//   methods: {
//     checkAdmin() {
//       const url = `${this.apiUrl}/api/user/check`;
//       axios.post(url)
//         .then(() => {
//           this.getData();
//         })
//         .catch((err) => {
//           alert(err.response.data.message)
//           window.location = 'login.html';
//         })
//     },
//     getData() {
//       const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`;
//       axios.get(url).then((response) => {
//         this.products = response.data.products;
//       }).catch((err) => {
//         alert(err.response.data.message);
//       })
//     },
//     updateProduct() {
//       let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
//       let http = 'post';

//       if (!this.isNew) {
//         url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
//         http = 'put'
//       }

//       axios[http](url, { data: this.tempProduct }).then((response) => {
//         alert(response.data.message);
//         productModal.hide();
//         this.getData();
//       }).catch((err) => {
//         alert(err.response.data.message);
//       })
//     },
//     openModal(isNew, item) {
//       if (isNew === 'new') {
//         this.tempProduct = {
//           imagesUrl: [],
//         };
//         this.isNew = true;
//         productModal.show();
//       } else if (isNew === 'edit') {
//         this.tempProduct = { ...item };
//         this.isNew = false;
//         productModal.show();
//       } else if (isNew === 'delete') {
//         this.tempProduct = { ...item };
//         delProductModal.show()
//       }
//     },
//     delProduct() {
//       const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;

//       axios.delete(url).then((response) => {
//         alert(response.data.message);
//         delProductModal.hide();
//         this.getData();
//       }).catch((err) => {
//         alert(err.response.data.message);
//       })
//     },
//     createImages() {
//       this.tempProduct.imagesUrl = [];
//       this.tempProduct.imagesUrl.push('');
//     },
//   },
// }).mount('#app');

import {createApp} from "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
let delProduct=null
let productModal=null
const app=createApp({
data(){
return{
   url:"https://vue3-course-api.hexschool.io/v2",
   path:"powei",
   tempProduct:{
    imagesUrl:[]
   },
   products:[],
   isNew:false,

}
},
methods:{
 checkAdmin(){
  axios.post(`${this.url}/api/user/check`).then((res)=>{//驗證產品如果成功就會進入getProduct產品訂購畫面，如果驗證不成功跳回原來登入畫面
    this.getProduct()
    
})
  .catch((error)=>{console.log(error)
window.location="login.html"
}
  
  )
 },
 getProduct(){
  axios.get(`${this.url}/api/${this.path}/admin/products`).then((res)=>{
  this.products=res.data.products
  }).catch((error)=>{console.log(error)})
 },openProduct(item){
    this.tempProduct=item   //產品訂購區等同於指定的訂購
 }
 ,updateProduct(){
  let http="post"
  let web=`${this.url}/api/${this.path}/admin/product`
  //4.第116行data裡的isNew原本就是false，然後!this.isNew不就負負得正，所以是true，所以http=應該是"post"才對
  if(!this.isNew){
    http="put"
    web=`${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`
  }
  //1.為何不是{data:this.tempProduct.id}或是{data:this.tempProduct.imagesUrl},另外為何要加{data:this.tempProduct}?
  axios[http](web,{data:this.tempProduct}).then((res)=>{
    console.log(res)
    productModal.hide()
    this.getProduct()
  }).catch((error)=>{
    console.log(error)
  })
 }
 ,delProduct(){
  axios.delete(`${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`).then((res)=>{
    console.log(res)
    delProduct.hide()
    this.getProduct()
  }).catch((error)=>{console.log(error)})
 },
 openModal(isNew,item){
  if(isNew=="new"){
    //2.這樣寫 this.tempProduct.push("")為何不行?
    //3.為何第162和163 isNew前面沒有加this?

    this.tempProduct={
      imagesUrl:[]
    }
    this.isNew=true
    productModal.show()

  }else if(isNew=="edit"){
    this.tempProduct={...item}
    this.isNew=false
    productModal.show()
    
  }else if(isNew=="delete"){
    this.tempProduct={...item}
    delProduct.show()
  }
 },
 createImages(){
   this.tempProduct.imagesUrl=[]
   this.tempProduct.imagesUrl.push("")
 }

},
mounted(){ //元件週期，token可以進入到cookie紀錄裡，然後也可以取出cookie紀錄
    const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hasVueToken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1",
      );    
     axios.defaults.headers.common.Authorization = token;
     this.checkAdmin()
     delProduct=new bootstrap.Modal(document.getElementById("delProduct"),{
      keyboard:false
     })
     productModal=new bootstrap.Modal(document.getElementById("productModal"),{
      keyboard:false
     })
}




})
app.mount("#app")