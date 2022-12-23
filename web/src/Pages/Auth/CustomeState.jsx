export const INITIAL_STATE = {
     firstName:"",
     lastName:"",
     email:"",
     password:""
}

export const SIGN_STATE = (state,action)=>{
    switch(action.type){
        case "CHANGE_INPUT":
            return{
                ...state,
                [action.payload.name]: action.payload.value,
            
        };
default :
return state
}

}


