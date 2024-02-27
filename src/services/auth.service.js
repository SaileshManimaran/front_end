import http from "../utils/http-client";


// Login user
const login = (data) => {
    return http.post('/login', data, {
        transformResponse: [(result) => {

            const parsed = JSON.parse(result).token;
            console.log(data);
            localStorage.setItem('email',data.email)
            localStorage.setItem('authUser', JSON.stringify(parsed));
            
            return parsed;
        }]

    });
}
// Register new user 
const register = (data) => {
    return http.post('/addUser', data);
}

// Add new user
const addUser=(data)=>{
    return http.post('/addUser', data);
}
// add new category
const addCategory=(data)=>{
    return http.post('/category/add', data);
}
// add new address
const addAddress=(data)=>{
    return http.post('/address/add', data);
}
// add new order 
const addOrder=(data)=>{
    return http.post('/order/add', data);
}
// add subcategory
const addSubcat=(data)=>{
    return http.post('/subcat/add', data);
}


// add service
const addService=(data)=>{
    return http.post('/service/add', data);
}

// add service
const addVendor=(data)=>{
    return http.post('/vendors/add', data);
}

// Add city
const addCity=(data)=>{
    console.log(data);
    return http.post('/city/add', data);
}



// to display profile details
const profile = () => {
   const email =localStorage.getItem('email');
    return http.get(`/getUser/${email}`);
    
}
// to get all user from customer table
const getUser=()=>{
return http.get('/getAll')

}

//to get sales

const getSales=()=>{
    return http.get('order/getSales');
    
    }

// to get all category from category table 
const getCategory=()=>{
    return http.get('/category/get')
    

    }
    // to get all address 
    const getAddress=()=>{
        return http.get('/address/get')
        
    }

   // to get all cities
   const getCity=()=>{
    return http.get('/city/get')
    
}


    const getOrder=()=>{
        return http.get('/order/get');
    }

    //to get a subcategories
    const getSubCat=()=>{
        return http.get('/subcat/get')
        
    }

     //to get a service
     const getService=()=>{
        return http.get('/service/get')
        
    }

     //to get vendor
     const getVendor=()=>{
        return http.get('/vendors/get')
        
    }

   



const getByContactNumber=()=>{
const contactNumber=localStorage.getItem("contactNumber")
console.log(contactNumber);
    return http.get(`/category/getOne/${contactNumber}`)
    
    }


const logout = () => {
    return http.get('/logout', null, {
        transformResponse: [(result) => {
            localStorage.removeItem('authUser');
            return JSON.parse(result);
        }]
    });
}

const getAuthUser = () => {
    return localStorage.getItem('authUser');
}  

const editUser = async (userData) => {
    try {
      const response = await http.put('/edituser', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };


  const editSubcat = async (userData) => {
    try {
      const response = await http.put('subcat/editSubcat', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  //edit category
  const editCategory = async (userData) => {
    try {
      const response = await http.put('category/editCategory', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

    //edit address
    const editAddress = async (userData) => {
        try {
          const response = await http.put('address/editAddress', userData);
          return response.data;
        } catch (error) {
          throw error;
        }
      };

      //editOrder
        const editOrder = async (userData) => {
            try {
         const response = await http.put('order/updateOrders', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  //edit Vendor
    
    const editVendor = async (userData) => {
        try {
          const response = await http.put('vendors/editVendor', userData);
          return response.data;
        } catch (error) {
          throw error;
        }
      };

       //edit city
    const editCity = async (userData) => {
        try {
          const response = await http.put('city/editCity', userData);
          return response.data;
        } catch (error) {
          throw error;
        }
      };




  const countUser=()=>{
    return http.get('/count')
  }


  const deleteOrder=async(data)=>{
    try{
        const orderId=data.orderId
    return http.remove(`order/delete/${orderId}`);
    }
    catch(error){
        throw error;
    }

}

//delete service
const deleteService=async(data)=>{
    try{
        const serviceId=data;
        return http.remove(`service/delete/${serviceId}`);
    }
    catch(error){
        throw error;
    }
}

//delete service
const deleteSubcat=async(data)=>{
    try{
        const subcatId=data;
        return http.remove(`subcat/delete/${subcatId}`);
    }
    catch(error){
        throw error;
    }
}

// delete city
const deleteCity=async(data)=>{
    try{
        const cityId=data;
        return http.remove(`city/delete/${cityId}`);
    }
    catch(error){
        throw error;
    }
}

//delete vendor
const deleteVendor=async(data)=>{
    try{
        const vendorId=data;
        return http.remove(`vendors/delete/${vendorId}`);
    }
    catch(error){
        throw error;
    }
}

//delete category
const deleteCategory=async(data)=>{
    try{
        const categoryId=data;
        return http.remove(`category/delete/${categoryId}`);
    }
    catch(error){
        throw error;
    }
}

//delete address
const deleteAddress=async(data)=>{
    try{
        const categoryId=data;
        return http.remove(`address/delete/${categoryId}`);
    }
    catch(error){
        throw error;
    }
}


const deleteUser=async(data)=>{
try{
    const userId=data.userId
return http.remove(`/deleteUser/${userId}`);
}
catch(error){
    throw error;
}
}

//to obtain count of orders based on order date
const getOrdersByDate=async(data)=>{
    try{
        const created_at=data.created_at;
        return http.get(`order/${created_at}`);
    }
    catch(error){
        throw error;
    }





}
  

const methods = { 
    login,
    register,
    profile,
    logout,
    getAuthUser,
    getUser,
    getCategory,addUser,addService,
    addCategory,getByContactNumber,editUser,deleteUser,
    countUser,getAddress,addAddress,getOrder,addOrder,deleteOrder,getSubCat,addSubcat,editSubcat,getService,deleteService,
    editCategory,
    deleteSubcat,getVendor,editVendor,addVendor,deleteVendor,deleteCategory,addCity,getCity,deleteCity,editCity,editAddress,deleteAddress,getSales,
    editOrder,getOrdersByDate
}

export default methods;