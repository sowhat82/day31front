import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()

export class AuthService implements CanActivate{

    private token = ''

    constructor(private http: HttpClient, private router: Router){}

    async login(username, password): Promise<boolean>{
        // write a call to the backend
        var success = false;
        this.token = ''

        const loginData = new HttpParams()
        .set('username', username)
        .set('password', password)
    
        const httpHeaders = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')

        // "observe response" to obtain the status code in the result object
        await this.http.post('/login', loginData, {headers: httpHeaders, observe: 'response'}).toPromise().then(
            (result) => {
              // success callback

                if (result.status == 200){
                    this.token = result.body['token']
                }

              success = true
            //   status = result.status
                console.info(result.status)
            },
            function(result) {
              // failure callback,handle error here
              // response.data.message will be "This is an error!"
            //   status = result.status
              window.alert("Invalid user " + result.status.toString())
              success = false
            }
        )
        return(success)
    }

    isLogin(){
        return this.token != ''
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.isLogin()){
            return true
        }

        return this.router.parseUrl('/error')
    }
}