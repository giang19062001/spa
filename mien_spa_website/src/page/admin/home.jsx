import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Menu from "../../component/admin/menu";
import { PageForbidden } from "../../component/admin/pageForbidden";
import { selectUser } from "../../redux/auth/authSelector";
import { fetchAllRole } from "../../redux/auth/authThunk";

const HomeAdmin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(()=>{
    dispatch(fetchAllRole())
  },[])
  const user = useSelector(selectUser);
 
  useEffect(()=>{
    if(user){
      if(user?.listRole?.length >= 2){
        navigate('/admin')
      }else{
        navigate("/")
      }
    }else{
      navigate("/")
    }
  },[ user])

  return (
    <>
      {user === null || user?.listRole === 1 ? (
        <PageForbidden></PageForbidden>
      ) : (
        <Menu></Menu>
     )}  
    </>
  );
};
export default HomeAdmin;
