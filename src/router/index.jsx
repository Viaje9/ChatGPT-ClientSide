import { Route, Routes } from 'react-router-dom'
import { lazy } from 'react'
import { Suspense } from 'react'
const Chat = lazy(() => import('../pages/Chat/Chat'))

export default function Router() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='' element={<Chat />}>
        </Route>
      </Routes>
    </Suspense>
  )
}