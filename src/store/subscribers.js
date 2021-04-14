import store from '@/store'
// import axios from 'axios'

store.subscribe((mutations =>{
    switch (mutations.type){
        case 'auth/SET_TOKEN':
            if(mutations.payload || mutations.payload!=null ){
                localStorage.setItem('token',mutations.payload)
                
            }else{
                localStorage.removeItem('token')

            }
            
        break;

    }

}))