import host from './const.js';

const authProvider = {
    buttonColor: '#426FA6',
    
    login: async ({ username , password }) => {
        const request = new Request(`https://${host}:1337/login`, {
            method: 'POST',
            body: JSON.stringify({ "username":username, "password": password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        try {
            const response = await fetch(request);
            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.statusText);
            }
            const auth = await response.json();
            localStorage.setItem('auth', auth.token); //guarda el token en el localstorage
            localStorage.setItem('identity',  JSON.stringify({"id":auth.id,"usuario":username,"nivel":auth.nivel,"region":auth.region}));
            return Promise.resolve()
        } catch {
            throw new Error('Error en usuario o password');
        }
    },
    logout: ()=>{ //borra el token y el identity del localstorage al cerrar sesion
        localStorage.removeItem("auth");
        localStorage.removeItem("identity");
        return Promise.resolve();
    },
    checkAuth: ()=>{ //verifica si hay un token en el localstorage
        return localStorage.getItem("auth")? Promise.resolve(): Promise.reject();
    },
    checkError: (error) =>{ //verifica si hay un error en el token
        const status=error.status;
        if(status===401|| status===403){
            localStorage.removeItem("auth");
            localStorage.removeItem("identity");
            return Promise.reject();
        }
        return Promise.resolve();
    },
    getIdentity: ()=>{ //obtiene el identity del localstorage
        try{
            return Promise.resolve(JSON.parse(localStorage.getItem("identity")));
        }catch{
            return Promise.reject()
        }
    },
    getPermissions: ()=>{ //obtiene el nivel del usuario del localstorage
        const role = JSON.parse(localStorage.getItem("identity")).nivel;
        //console.log(role)
        return role ? Promise.resolve(role) : Promise.reject();
    }
};

export default authProvider;