import { Component, OnInit } from '@angular/core';
import { PortafolioService } from '../service/portafolio.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseDeleteComponent } from '../../course/course-delete/course-delete.component';
import {  Toaster } from 'ngx-toast-notifications';
import { PortafolioDeleteComponent } from '../portafolio-delete/portafolio-delete.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-portafolio-list',
  templateUrl: './portafolio-list.component.html',
  styleUrls: ['./portafolio-list.component.scss']
})
export class PortafolioListComponent implements OnInit {

  PORTAFOLIOS:any = [];
  isLoading: any = null;
  search:any= null;
  state:any= null;



  constructor(
    public portafolioService: PortafolioService,
    public modalService: NgbModal,
    public toaster: Toaster,
    private location: Location,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.isLoading = this.portafolioService.isLoading$;
    this.listarCursos();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  listarCursos(){
    this.portafolioService.listPortafolios(this.search, this.state).subscribe(
      (res:any)=>{
        // console.log(res);
        this.PORTAFOLIOS = res.portafolios.data;
        // console.log(this.PORTAFOLIOS);
      }
    )
  }

  eliminarPortafolio(portafolio:any){
    const modalRef = this.modalService.open(PortafolioDeleteComponent,{centered: true, size:'md'})
    modalRef.componentInstance.portafolio = portafolio;
    // recibe el usuario editado por medio de ouput desde editar
    modalRef.componentInstance.portafolioD.subscribe((res:any)=>{
      let INDEX =  this.PORTAFOLIOS.findIndex((item:any) => item.id == res.id)
      this.PORTAFOLIOS.splice(INDEX, 1);
      this.listarCursos();
    })

  }

  cambiarStatus(categoria:any){
    this.portafolioService.updateStatus(categoria).subscribe(
      resp =>{ console.log(resp);
        // Swal.fire('Actualizado', `actualizado correctamente`, 'success');
        this.toaster.open({
          text:'El Status se Actualizado correctamente',
          caption: 'Informe',
          type:'success'
        })
        this.listarCursos();
      }
    )
  }

}
