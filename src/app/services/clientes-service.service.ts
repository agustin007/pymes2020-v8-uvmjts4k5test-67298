import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ClientesServiceService {
  resourseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.resourseUrl = "https://demo3151356.mockable.io/clientes";
  }

  get() {
    return this.httpClient.get(this.resourseUrl);
  }
}
