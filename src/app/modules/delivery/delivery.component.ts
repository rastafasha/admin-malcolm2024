import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeliveryService } from 'src/app/services/delivery.service';
import { DeliveryDeleteComponent } from './delivery-delete/delivery-delete.component';
import { Toaster } from 'ngx-toast-notifications';
import { Location } from '@angular/common';


@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {

  
  public deliveries;
  public identity;
  isLoading:any;
  titulo:any =null;
  tiempo:any =null;
  precio:any =null;
  dias:any =null;

  constructor(
    private deliveryService : DeliveryService,
    public modalService: NgbModal,
    public toaster: Toaster,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.isLoading = this.deliveryService.isLoading$;
    window.scrollTo(0,0);
    this.listar();
    
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


  onSubmit(){
    let formData = new FormData();
    formData.append('titulo', this.titulo);
    formData.append('tiempo', this.tiempo);
    formData.append('precio', this.precio);
    formData.append('dias', this.dias);

    this.deliveryService.registro(formData).subscribe(
      resp =>{
        console.log(resp);
        if(resp.message == 403){
          this.toaster.open({
            text: resp.message,
            caption: 'Validación',
            type: 'danger'
          })
        }else{
          this.toaster.open({
            text:'El Usuario se Registró correctamente',
            caption: 'Informe',
            type:'success'
          })
          this.titulo = null;
          this.tiempo = null;
          this.precio = 0;
          this.dias = 0;
        }
        this.listar();
      }
      
    );
  }

  listar(){
    this.deliveryService.listar().subscribe(
      (resp:any) =>{
        this.deliveries = resp.deliveries;
        console.log(this.deliveries);

      }
    );
  }

  eliminarDelivery(delivery:any){
    const modalRef = this.modalService.open(DeliveryDeleteComponent,{centered: true, size:'md'})
    modalRef.componentInstance.delivery = delivery;
    // recibe el usuario editado por medio de ouput desde editar
    modalRef.componentInstance.deliveryD.subscribe((res:any)=>{
      let INDEX =  this.deliveries.findIndex((item:any) => item.id == res.id)
      this.deliveries.splice(INDEX, 1);
      this.listar();
    })

  }
}
