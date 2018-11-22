let googleAuth = null
var TOKEN_ID = "token_id"
var USER_ID = "user_id"
var USER_NAME = "User_Name"

const auth = {
    system:{
        setAuth (auth) {
            localStorage.setItem(TOKEN_ID, auth.token);
            localStorage.setItem(USER_ID, auth.userId);
            localStorage.setItem(USER_NAME, auth.userName);
        },
        isAuthenticated () {
            //alert('unauthorize')
            return localStorage.getItem(TOKEN_ID) != '' && localStorage.getItem(TOKEN_ID) != null;
        },
        currentUser () {
            return localStorage.getItem(USER_ID);
        },
        currentUserProfile () {
            return localStorage.getItem(USER_NAME);
        },
        getIdToken () {
            return localStorage.getItem(TOKEN_ID);
        },
    },
    google:{
        setAuth (auth) {
            googleAuth = auth
        },
        isAuthenticated () {
            return googleAuth !== null && googleAuth.isSignedIn.get()
        },
        currentUser () {
            return googleAuth.currentUser.get()
        },
        currentUserProfile () {
            return this.currentUser().getBasicProfile()
        },
        getIdToken () {
            return this.currentUser().getAuthResponse().id_token
        }
    }
}
export default auth 