import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ContactsPage from './pages/ContactsPage';
import RegistrationPage from './pages/RegistrationPage';

// import { fetchContacts } from './redux/contactsOps';

import Layout from './components/Layout/Layout';
import { refreshUserThunk } from './redux/auth/operations';
import { selectError, selectLoading } from './redux/contacts/selectors';


const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(refreshUserThunk());   
    }, [dispatch]);

    const isError = useSelector(selectError);
    const isLoading = useSelector(selectLoading);

    return (
        <>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegistrationPage />} />
                    <Route index element={<HomePage />} />
                    <Route path='/contacts' element={<ContactsPage />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Route>
            </Routes>
            {isError && <h2>Something went wrong...</h2>}
            {isLoading && <h2>Loading...</h2>}
        </>
    );
};
export default App;