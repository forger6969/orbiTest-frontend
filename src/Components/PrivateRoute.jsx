// components/PrivateRoute.jsx
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { checkAuth } from '../store/slices/authSlice'

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch()
  const { isAuth, isLoading } = useSelector(state => state.auth)

  // Проверяем токен при монтировании компонента
  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  if (isLoading) {
    // Можно заменить на спиннер или красивую загрузку
    return <div className='flex justify-center  my-[25%]'>
      <span className="loading bg-qizil2 loading-dots w-[40px] loading-lg"></span>
    </div>
  }

  // Если пользователь аутентифицирован — рендерим детей, иначе — редирект
  return isAuth ? children : <Navigate to="/" replace />
}

export default PrivateRoute
