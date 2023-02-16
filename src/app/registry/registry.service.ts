import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Config} from "../services/config";
import {Observable} from "rxjs";
import {Page} from "../services/page";

export interface Registrar{
  id:string | null;
  tenantId:string | null;
  company:string | null;
  type:string | null;
  active:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RegistryService {
  constructor(public http: HttpClient, public config: Config) {
  }

  getById(id: string):Observable<Registrar> {
    return this.http.get<Registrar>(this.config.api + "/rest/registry/" + id);
  }

  search(term:string = '',page:number = 0,limit:number = 50):Observable<Page<Registrar>> {
    let url:string = this.config.api + "/rest/registry/search";
    console.log(this.config);
    const params = new HttpParams()
      .set('page', String(page))
      .set('term',term)
      .set('limit',limit);
    return this.http.get<Page<Registrar>>(url, {params});
  }
  public static emptyRegistrar():Registrar{
    return {
      id:'',
      tenantId:'',
      company:'',
      type:'',
      active:false
    }
  }
}
