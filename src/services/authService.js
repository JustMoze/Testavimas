let idKey = 'id';
export function saveUserId(id){
    localStorage.setItem(idKey, JSON.stringify(id));
}
export function getUserId(){
    try {
        let id = JSON.parse(localStorage.getItem(idKey));
        return id;
    } catch (ex) {
        return null;
    }
}
export function logoutUser(){
    localStorage.removeItem(idKey);
    window.location.reload();
}
export function isNewUser(){
    let result = JSON.parse(localStorage.getItem('newUser'));
    if(result){
        localStorage.removeItem('newUser');
        return result;
    } else return null;
   
}