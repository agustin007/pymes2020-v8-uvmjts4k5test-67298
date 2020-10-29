import { Component, OnInit } from "@angular/core";
import { Cliente } from "../../models/cliente";
import { ClientesServiceService } from "../../services/clientes-service.service";

@Component({
  selector: "app-clientes",
  templateUrl: "./clientes.component.html",
  styleUrls: ["./clientes.component.css"]
})
export class ClientesComponent implements OnInit {
  Titulo = "Clientes (listado)";
  Items: Cliente[] = [];

  AccionABMC = "L";

  constructor(private servicioCliente: ClientesServiceService) {}

  ngOnInit() {
    this.GetCliente();
  }

  GetCliente() {
    this.servicioCliente.get().subscribe((res: Cliente[]) => {
      this.Items = res;
    });
  }

  Agregar() {}
}
