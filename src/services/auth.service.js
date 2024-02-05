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



// to display profile details
const profile = () => {
   const email =localStorage.getItem('email');
    return http.get(`/getUser/${email}`);
    
}
// to get all user from customer table
const getUser=()=>{
return http.get('/getAll')

}

// to get all category from category table 
const getCategory=()=>{
    return http.get('/category/get')
    

    }
    // to get all address 
    const getAddress=()=>{
        return http.get('/address/get')
        
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
  //edit Vendor
    //edit category
    const editVendor = async (userData) => {
        try {
          const response = await http.put('vendors/editVendor', userData);
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


const deleteUser=async(data)=>{
try{
    const userId=data.userId
return http.remove(`/deleteUser/${userId}`);
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
    deleteSubcat,getVendor,editVendor,addVendor,deleteVendor,deleteCategory
}

export default methods;