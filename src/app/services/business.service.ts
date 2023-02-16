import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Config} from "./config";
import {Observable} from "rxjs";
import  {Business}  from "./app-model";
import {Page} from "./page";

@Injectable()
export class BusinessService {
    constructor(public http: HttpClient,public config:Config ) { }

    search(term:string = '',page:number = 0,limit:number = 50):Observable<Page<Business>> {
        let url:string = this.config.api + "/rest/business/search";
        const params = new HttpParams()
        .set('page', String(page))
        .set('term',term)
        .set('limit',limit);
        return this.http.get<Page<Business>>(url, {params});
    }

    list():Observable<Array<Business>> {
        return this.http.get<Array<Business>>(this.config.api + "/rest/business");
    }

    save(model: Business):Observable<Business>{
        return this.http.post<Business>(this.config.api + "/rest/business", model);
    }

    getById(id: string):Observable<Business> {
        return this.http.get<Business>(this.config.api + "/rest/business/" + id);
    }

    removeById(id: string | null):Observable<any>{
        return this.http.delete<any>(this.config.api + "/rest/business/" + id);
    }
}
