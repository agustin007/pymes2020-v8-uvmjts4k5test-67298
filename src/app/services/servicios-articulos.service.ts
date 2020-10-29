import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ServiciosArticulos } from "../models/servicios-articulos";

@Injectable({
  providedIn: "root"
})
export class ServiciosArticulosService {
  resourseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.resourseUrl = "https://bitgocba.duckdns.org/api/servicios";
  }

  get() {
    return this.httpClient.get(this.resourseUrl);
  }

  post(obj: ServiciosArticulos) {
    delete obj.idservicio;
    return this.httpClient.post(this.resourseUrl, obj);
  }
}
