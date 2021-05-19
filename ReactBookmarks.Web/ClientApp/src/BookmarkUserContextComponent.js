import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

const BookmarkUserContext = createContext();

const BookmarkUserContextComponent =({children}) =>{
    const[user, setUser] = useState(null);


useEffect(() =>{
    const getUser = async () =>{
        const {data} = await axios.get('api/account/getcurrentuser');
        setUser(data);
    }
getUser()
}, [])

const logout =() => setUser(null);
return(
    <BookmarkUserContext.Provider value={{user, logout, setUser}}>
        {children}
    </BookmarkUserContext.Provider>
)
}
const useBookmarkUserContext =() => useContext(BookmarkUserContext);
export{useBookmarkUserContext, BookmarkUserContextComponent}