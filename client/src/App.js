import './styles/app.scss'
import { BrowserRouter, Route, Redirect, Routes, Navigate } from 'react-router-dom'
import { MainLayout } from './components/layout/MainLayout'

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/:id' element={<MainLayout />} />
          <Route path='*' element={<Navigate to={`f${(+new Date).toString(16)}`} replace/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
