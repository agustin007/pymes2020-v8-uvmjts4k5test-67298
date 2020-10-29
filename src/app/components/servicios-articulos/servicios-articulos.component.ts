import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  RequiredValidator,
  Validators
} from "@angular/forms";
import { ServiciosArticulos } from "../../models/servicios-articulos";
import { ModalDialogService } from "../../services/modal-dialog.service";
import { ServiciosArticulosService } from "../../services/servicios-articulos.service";

@Component({
  selector: "app-servicios-articulos",
  templateUrl: "./servicios-articulos.component.html",
  styleUrls: ["./servicios-articulos.component.css"]
})
export class ServiciosArticulosComponent implements OnInit {
  Titulo = "Servicios Articulos (listado)";
  Items: ServiciosArticulos[] = [];

  AccionABMC = "L";

  OpcionesActivo: [
    { Id: 1; Nombre: "" },
    { Id: 2; Nombre: "SI" },
    { Id: 3; Nombre: "NO" }
  ];

  Mensajes: {
    SD: "No se encontraron registros";
    RD: "Revise el estado de los datos";
  };

  FormServicios: FormGroup;
  submited = false;

  constructor(
    private seriviciosService: ServiciosArticulosService,
    public formBuilder: FormBuilder,
    private modalDialogSerivice: ModalDialogService
  ) {}

  ngOnInit() {
    this.GetSericiosArticulos();

    this.FormServicios = this.formBuilder.group({
      IdServicio: [0],
      Descripcion: [
        "",
        [Validators.required, Validators.minLength(4), Validators.maxLength(54)]
      ],
      Importe: [null, [Validators.required, Validators.pattern("")]],
      CantidadHoras: [null, [Validators.required, Validators.maxLength(4)]],
      Activo: [true]
    });
  }

  GetSericiosArticulos() {
    this.seriviciosService.get().subscribe((res: ServiciosArticulos[]) => {
      this.Items = res;
    });
  }

  Agregar() {
    this.AccionABMC = "A";
    this.Titulo = "Servicios Articulos (agregar)";
    this.submited = false;
    this.FormServicios.markAsUntouched;
  }

  Volver() {
    this.AccionABMC = "L";
    this.Titulo = "Servicios Articulos (listado)";
  }

  Grabar() {
    this.submited = true;

    if (this.FormServicios.invalid) {
      return;
    }

    const itemCopy = { ...this.FormServicios.value };

    if (itemCopy.IdServicio == 0 || itemCopy.IdServicio == null) {
      itemCopy.IdServicio = 0;
      this.seriviciosService.post(itemCopy).subscribe((res: any) => {
        this.Volver();
        this.modalDialogSerivice.Alert("Registro insertado correctamente");
        this.GetSericiosArticulos();
      });
    }
  }
}
