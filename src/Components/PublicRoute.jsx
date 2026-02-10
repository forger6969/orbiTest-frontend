// components/PublicRoute.jsx
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { checkAuth } from '../store/slices/authSlice'

const PublicRoute = ({ children }) => {
  const dispatch = useDispatch()
  const { isAuth, isLoading } = useSelector(state => state.auth)

  // Проверяем токен при монтировании
  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  if (isLoading) {
    return <div className='flex justify-center  my-[25%]'>
<span className="loading bg-qizil2 loading-dots w-[40px] loading-lg"></span>
    </div>
  }

  // Если пользователь авторизован — редирект на защищённую страницу, иначе рендерим детей
  return isAuth ? <Navigate to="/dashboard" replace /> : children
}

export default PublicRoute
