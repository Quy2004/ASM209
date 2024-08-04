
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/client/Home";
import "./App.css";
import Dashboard from "./pages/admin/Dashboard";
import WebsiteLayout from "./component/Layout/Website";
import AdminLayout from "./component/Layout/Admin";
import Detail from "./pages/client/Detail";
import AuthForm from "./pages/client/AuthForm";
import ForgotPass from "./pages/client/ForgotPass";
import ResetPassword from "./pages/client/ResetPassword";
import { useEffect, useState } from "react";
import { IProduct } from "./interface/IProduct";
import { instance } from "./instance/instance";
import { ICategory } from "./interface/ICategory";
import Categories from "./pages/admin/categories/Category";
import AddCate from "./pages/admin/categories/AddCate";
import Products from "./pages/admin/products/Products";
import AddProduct from "./pages/admin/products/Addproduct";
import EditCate from "./pages/admin/categories/EditCate";
import ShopAll from "./component/Layout/ShopAll";
import EditProduct from "./pages/admin/products/Editproduct";
import User from "./pages/admin/user/user";



function App() {
  const navigate = useNavigate()
  const [products, setProduct] = useState<IProduct[]>([])
  const [categories, setCagtegory] = useState<ICategory[]>([])

  const loadPr = async () => {
    (async () => {
      try {
        const response = await instance.get("/products");
        const { data } = response;
        // console.log(data);
        if (Array.isArray(data.data)) {
          setProduct(data.data);
        } else {
          console.error("Dữ liệu trả về không phải là mảng:", data);
          setProduct([]);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        setProduct([]);
      }
    })();
  }
  useEffect(() => {
    const fetch = async () => {
      loadPr()
    }
    fetch()
  }, []);

  // delete product-----------------------------------------------
  const handleDeletePr = async (id: string | number) => {
    if (window.confirm("Are you sure you want to delete")) {
      await instance.delete(`/products/${id}`)

      await loadPr()
      alert("delete product successfully")
    }
  }
  // add product----------------------------------------------------
  const handleAddPr = async (pr: IProduct) => {
    const { data } = await instance.post('products', pr)
    console.log(data);
    setProduct([...products, data.data])
    alert("add product successfully")
    await loadPr()
    navigate('/admin/products')
  }

  // edit product-----------------------------------------------------

    const handleEditPr = async (product: IProduct) => {
      try {
        const { data } = await instance.put(`/products/${product._id}`, product);
        setProduct(products.map((item) =>
            item._id === data.data.id ? data.data : item
        ));
        
        alert('Updated successfully');
        navigate('/admin/products');
        await loadPr()
      } catch (error) {
        console.error('Error updating product:', error);
        alert('Failed to update product');
      }
    };
  

  // categories---------------------------------------------------
  const loadData = async () => {
    const { data } = await instance.get("/category")
    setCagtegory(data)
  }
  useEffect(() => {
    const fetchData = async () => {
      await loadData()
    }
    fetchData()
  }, [])

  // delete category-----------------------------------------------
  const handleDeleteCate = async (id: string | number) => {
    if (window.confirm("Are you sure you want to delete")) {
      await instance.delete(`/category/${id}`)
      setCagtegory(categories.filter((item) => item._id !== id))
      await loadData()
      alert("delete category successfully")
    }
  }
  // add category---------------------------------------------------
  const handleAddCate = async (cate: ICategory) => {
    const { data } = await instance.post('category', cate)
    setCagtegory([...categories, data])
    alert("add category successfully")
    await loadData()
    navigate('/admin/categories')

  }
  // edit ---------------------------------------------------------------
  const handleEditCate = async (cate: ICategory) => {
    const { data } = await instance.put(`category/${cate._id}`, cate)
    setCagtegory(categories.map((item) => item._id == data.id ? item : data))
    alert("Updated successfully")
    await loadData()
    navigate('/admin/categories')
  }
  return (
    <>
      <main>
        <Routes>
          <Route path="" element={<WebsiteLayout />}>
            <Route index path="" element={<Home setProduct={products} />} />
            <Route path="detail/:id" element={<Detail />} />
            <Route path="shop" element={<ShopAll products={products} categories={categories} />} >
            </Route>
          </Route>
          <Route path="login" element={<AuthForm isLogin />} />
          <Route path="register" element={<AuthForm />} />
          <Route path="forgotpass" element={<ForgotPass />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="admin" element={<AdminLayout />}>
            <Route index path="" element={<Dashboard />} />
            <Route path="categories" element={<Categories categoris={categories} onDel={handleDeleteCate} />} />
            <Route path="categories/addcate" element={<AddCate onAdd={handleAddCate} />} />
            <Route path="categories/editcate/:id" element={<EditCate onEdit={handleEditCate} />} />
            <Route path="products" element={<Products categories={categories} products={products} onDel={handleDeletePr} />} />
            <Route path="products/addproduct" element={<AddProduct onAdd={handleAddPr} />} />
            <Route path="products/editproduct/:id" element={<EditProduct onEdit={handleEditPr}/>} />
            {/* <Route path="user" element={<User/>} /> */}
          </Route>
        </Routes>
      </main >
    </>
  );
}

export default App;