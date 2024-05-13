import './App.css';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/super-admin/Dashboard';
import Profile from './pages/Profile';
import Account from './pages/super-admin/Account';
import AccountCreate from './pages/super-admin/AccountCreate';
import DashboardVerifier from './pages/verifier/Dashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminApply from './pages/admin/AdminApply';
import AdminTracking from './pages/admin/AdminTracking';
import AdminApplyCreate from './pages/admin/AdminApplyCreate';
import AdminApplyDetail from './pages/admin/AdminApplyDetail';
import AdminApplyEdit from './pages/admin/AdminApplyEdit';
import Goverment from './pages/super-admin/Goverment/Goverment';
import GovermentDetail from './pages/super-admin/Goverment/GovermentDetail';
import Banner from './pages/super-admin/Banner/Banner';
import BannerCreate from './pages/super-admin/Banner/BannerCreate';
import UpdatePassword from './pages/UpdatePassword';
import School from './pages/super-admin/School/School';
import SchoolCreate from './pages/super-admin/School/SchoolCreate';
import Gallery from './pages/super-admin/Gallery/Gallery';
import GalleryCreate from './pages/super-admin/Gallery/GalleryCreate';
import Tracking from './pages/Tracking';
import VerifierBatch from './pages/verifier/VerifierBatch';
import VerifierBatchDetail from './pages/verifier/VerifierBatchDetail';
import History from './pages/History';
import Tutorial from './pages/Tutorial';
import Terms from './pages/Terms';
import About from './pages/About';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';
import Metadata from './pages/super-admin/Metadata/Metadata';
import Notification from './pages/Notification';
import AdminBatchDetail from './pages/admin/AdminBatchDetail';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/change-password/:token' element={<ChangePassword />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/update-password' element={<UpdatePassword />} />
          <Route path='/tracking' element={<Tracking />} />
          <Route path='/history' element={<History />} />
          <Route path='/tutorial' element={<Tutorial />} />
          <Route path='/terms' element={<Terms />} />
          <Route path='/about' element={<About />} />

          <Route path='/notification' element={<Notification />} />

          <Route path='/super-admin/dashboard' element={<Dashboard />} />
          <Route path='/super-admin/account' element={<Account />} />
          <Route path='/super-admin/account/create' element={<AccountCreate />} />
          <Route path='/super-admin/goverment' element={<Goverment />} />
          <Route path='/super-admin/goverment/:id' element={<GovermentDetail />} />
          <Route path='/super-admin/banner' element={<Banner />} />
          <Route path='/super-admin/banner/create' element={<BannerCreate />} />
          <Route path='/super-admin/gallery' element={<Gallery />} />
          <Route path='/super-admin/gallery/create' element={<GalleryCreate />} />
          <Route path='/super-admin/school' element={<School />} />
          <Route path='/super-admin/school/create' element={<SchoolCreate />} />
          <Route path='/super-admin/metadata' element={<Metadata />} />

          <Route path='/verifier/dashboard' element={<DashboardVerifier />} />
          <Route path='/verifier/batch' element={<VerifierBatch />} />
          <Route path='/verifier/batch/:id' element={<VerifierBatchDetail />} />

          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/apply' element={<AdminApply />} />
          <Route path='/admin/apply/create' element={<AdminApplyCreate />} />
          <Route path='/admin/apply/:id' element={<AdminApplyDetail />} />
          <Route path='/admin/apply/edit/:id' element={<AdminApplyEdit />} />
          <Route path='/admin/tracking' element={<AdminTracking />} />
          <Route path='/admin/apply/batch/:id' element={<AdminBatchDetail />} />

          {/* <Route index element={<Home />} />
          <Route path='about' element={<About />} /> */}

          {/* <Route path='products' element={<SharedProductLayout />}>
            <Route index element={<Products />} />
            <Route path=':productId' element={<SingleProduct />} />
          </Route> */}

          {/* <Route
            path='dashboard'
            element={
              <ProtectedRoute user={user}>
                <Dashboard user={user} />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<Error />} /> */}


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
