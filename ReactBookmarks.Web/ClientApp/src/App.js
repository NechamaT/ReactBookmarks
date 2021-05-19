import React from 'react';
import {Route} from 'react-router';
import Layout from './components/Layout';
import {BookmarkUserContextComponent} from './BookmarkUserContextComponent';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Logout from './Pages/Logout';
import AddBookmark from './Pages/AddBookmark';
import MyBookmarks from './Pages/MyBookmarks';



const App =() =>{
    return(
        <BookmarkUserContextComponent>
            <Layout>
            <Route exact path="/" component={Home} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/logout' component={Logout} />
            <Route exact path='/addbookmark' component={AddBookmark} />
            <Route exact path='/mybookmarks' component={MyBookmarks} />
            </Layout>
            </BookmarkUserContextComponent>
    )
}
export default  App;