import React, { useEffect } from 'react';
import axios from 'axios';
import {useBookmarkUserContext} from '../BookmarkUserContextComponent';
import {useHistory} from 'react-router-dom';


const Logout = () =>{
    const {logout} = useBookmarkUserContext();
    const history = useHistory();

    useEffect(() =>{
        const doLogout = async () =>{
            await axios.get('api/account/logout');
            logout();
            history.push('/');
        }
        doLogout();
    }, [])
    return(<></>)
}
export default Logout;