// Guards
import Layout from './components/layouts/Layout'
import AlertPopup from './components/layouts/AlertPopup'

// Pages
import Home from './pages'
import Blink from './pages/blink'
import Manager from './pages/manager'
import HeaderAppBar from './components/layouts/Layout'

const routes = [
  {
    path: '/',
    children: [
      {
        path: '',
        element: (
          <>
            <AlertPopup />
            <Home />
          </>
        ),
      },
      {
        path: 'blink',
        element: (
          <>
            <HeaderAppBar />
            <AlertPopup />
            <Blink />
          </>
        ),
      },
      {
        path: 'manager',
        element: (
          <>
            <HeaderAppBar />
            <AlertPopup />
            <Manager />
          </>
        ),
      },
    ],
  },
]

export default routes
