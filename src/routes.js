import { exact } from 'prop-types'
import React from 'react'
const Dashboard = React.lazy(() => import('./pages/dashboard/dashboard'))

const MyProfile = React.lazy(() => import('./pages/profile'))
const MyChangePassword = React.lazy(() => import('./pages/change_password'))

const MyCompanieList = React.lazy(()=> import('./pages/companies/list'))
const MyCompanieShow = React.lazy(()=> import('./pages/companies/show'))
const MyCompanieAdd = React.lazy(()=> import('./pages/companies/add'))

const MyStoreList = React.lazy(() => import('./pages/outlets/list'))
const MyStoreShow = React.lazy(()=> import('./pages/outlets/show'))
const MyStoreAdd = React.lazy(()=> import('./pages/outlets/add'))

const MyProductList = React.lazy(() => import('./pages/products/list'))
const MyProductShow = React.lazy(()=> import('./pages/products/show'))
const MyProductAdd = React.lazy(()=> import('./pages/products/add'))

const UserList = React.lazy(() => import('./pages/users/list'))
const UserAdd = React.lazy(() => import('./pages/users/add'))
const UserShow = React.lazy(() => import('./pages/users/show'))

// IMPORT
const ImportUser = React.lazy(() => import('./pages/import/user'))
const ImportOutlet = React.lazy(() => import('./pages/import/outlet'))
const ImportProduct = React.lazy(() => import('./pages/import/product'))
const ImportContent = React.lazy(() => import('./pages/import/content'))


// DEVICE
const DeviceList = React.lazy(() => import('./pages/esl/list'))
const DeviceShow = React.lazy(() => import('./pages/esl/show'))
const DeviceMonitoring = React.lazy(() => import('./pages/esl/esl_monitor'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/myprofile', name: 'My Profile', element: MyProfile },
  { path: '/change_password', name: 'Change Password', element: MyChangePassword },
  { path: '/outlet', name: 'Outlet', element: MyStoreList, exact: true },
  { path: '/outlet/add', name: 'Create Outlet', element: MyStoreAdd, exact: true },
  { path: '/outlet/add/:company_id', name: 'Create Outlet', element: MyStoreAdd, exact: true },
  { path: '/outlet/:company_id', name: 'Outlet', element: MyStoreList, exact: true },
  { path: '/outlet/show/:id/:company_id', name: 'Detail Outlet', element: MyStoreShow},
  { path: '/outlet/show/:id', name: 'Detail Outlet', element: MyStoreShow},
  { path: '/companies', name: 'Companie', element: MyCompanieList, exact: true },
  { path: '/companies/show/:id', name: 'Companie', element: MyCompanieShow},
  { path: '/companies/add', name: 'CompanieAdd', element: MyCompanieAdd},
  { path: '/user', name: 'User', element: UserList, exact: true },
  { path: '/user/:company_id', name: 'User', element: UserList, exact: true },
  { path: '/user/:company_id/:company_name', name: 'User', element: UserList, exact: true },
  { path: '/user/show/:id', name: 'Detail User', element: UserShow},
  { path: '/user/add', name: 'Create User', element: UserAdd, exact: true },
  { path: '/user/add/:company_id', name: 'Create User', element: UserAdd, exact: true },
  { path: '/user/add/:company_id/:company_name', name: 'Create User', element: UserAdd, exact: true },
  { path: '/product', name: 'Product', element: MyProductList, exact: true },
  { path: '/product/:company_id', name: 'Product', element: MyProductList, exact: true },
  { path: '/product/show/:id', name: 'Detail Product', element: MyProductShow},
  { path: '/product/show/:id/:store_id', name: 'Detail Product', element: MyProductShow},
  { path: '/product/add', name: 'Create Product', element: MyProductAdd, exact: true },
  { path: '/product/add/:company_id', name: 'Create Product', element: MyProductAdd, exact: true },
  { path: '/import/user', name: 'Impor tUser', element: ImportUser, exact: true },
  { path: '/import/outlet', name: 'Import Outlet', element: ImportOutlet, exact: true },
  { path: '/import/product', name: 'Import Product', element: ImportProduct, exact: true },
  { path: '/import/content', name: 'Import Content', element: ImportContent, exact: true },
  { path: '/device', name: 'Device', element: DeviceList, exact: true },
  { path: '/device/:company_id', name: 'Device', element: DeviceList, exact: true },
  { path: '/device/show/:id', name: 'Detail Device', element: DeviceShow},
  { path: '/monitoring', name: 'Monitoring Device', element: DeviceMonitoring, exact: true},


  // COMMING SOON
  // { path: '/iot', name: 'IOT', element: Colors, exact: true },
  // { path: '/iot/home', name: 'Home', element: IOTHOME },
  // { path: '/iot/mobility', name: 'Mobility', element: IOTHOME },
  // { path: '/iot/industrial', name: 'Industrial', element: IOTHOME },
  // { path: '/notification', name: 'Notification', element: Cards, exact: true },
  // { path: '/notification/iot_home', name: 'Iot_Home', element: Notif_IOTHOME },
  // { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  // { path: '/base/cards', name: 'Cards', element: Cards },
  // { path: '/base/carousels', name: 'Carousel', element: Carousels },
  // { path: '/base/collapses', name: 'Collapse', element: Collapses },
  // { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  // { path: '/base/navs', name: 'Navs', element: Navs },
  // { path: '/base/paginations', name: 'Paginations', element: Paginations },
  // { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  // { path: '/base/popovers', name: 'Popovers', element: Popovers },
  // { path: '/base/progress', name: 'Progress', element: Progress },
  // { path: '/base/spinners', name: 'Spinners', element: Spinners },
  // { path: '/base/tabs', name: 'Tabs', element: Tabs },
  // { path: '/base/tables', name: 'Tables', element: Tables },
  // { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  // { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  // { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  // { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  // { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  // { path: '/charts', name: 'Charts', element: Charts },
  // { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  // { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  // { path: '/forms/select', name: 'Select', element: Select },
  // { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  // { path: '/forms/range', name: 'Range', element: Range },
  // { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  // { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  // { path: '/forms/layout', name: 'Layout', element: Layout },
  // { path: '/forms/validation', name: 'Validation', element: Validation },
  // { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  // { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  // { path: '/icons/flags', name: 'Flags', element: Flags },
  // { path: '/icons/brands', name: 'Brands', element: Brands },
  // { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  // { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  // { path: '/notifications/badges', name: 'Badges', element: Badges },
  // { path: '/notifications/modals', name: 'Modals', element: Modals },
  // { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  // { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
