import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { DeliveryService } from 'src/app/services/delivery.service';
import { DeliveryDeleteComponent } from '../delivery/delivery-delete/delivery-delete.component';
import { TareaService } from './service/tarea.service';
import { Location } from '@angular/common';
import { TareaDeleteComponent } from './tarea-delete/tarea-delete.component';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss']
})
export class TareasComponent implements OnInit {

  
  public todos;
  public identity;
  isLoading:any;
  titulo:any =null;
  status:any =null;
  description:any='<p>Hello World!</p>';
  tareaSelected:any =null;

  constructor(
    private tareaService : TareaService,
    public modalService: NgbModal,
    public toaster: Toaster,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.isLoading = this.tareaService.isLoading$;
    window.scrollTo(0,0);
    this.listar();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


  onSubmit(){
    let formData = new FormData();
    formData.append('titulo', this.titulo);
    formData.append('description', this.description);
    formData.append('status', this.status);

    this.tareaService.registro(formData).subscribe(
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
          
        }
        this.titulo = null;
          this.status = null;
          this.description = null;
        this.listar();
      }
      
    );
  }

  listar(){
    this.tareaService.list().subscribe(
      (resp:any) =>{
        this.todos = resp.todos.data;
        // console.log(this.deliveries);

      }
    );
  }
  public onChange(event: any) {
    this.description = event.editor.getData();
  }

  eliminarTarea(todo:any){
    const modalRef = this.modalService.open(TareaDeleteComponent,{centered: true, size:'md'})
    modalRef.componentInstance.todo = todo;
    // recibe el usuario editado por medio de ouput desde editar
    modalRef.componentInstance.todoD.subscribe((res:any)=>{
      let INDEX =  this.todos.findIndex((item:any) => item.id == res.id)
      this.todos.splice(INDEX, 1);
      this.listar();
    })

  }

  back(){
    this.tareaSelected = null;
    // this.rating = 0;
    // this.message = null;
  }
selectedDireccion(todo:any){
    this.tareaSelected = todo
  }


  cambiarStatus(todo:any){
    this.tareaService.updateStatus(todo).subscribe(
      resp =>{ console.log(resp);
        // Swal.fire('Actualizado', `actualizado correctamente`, 'success');
        this.toaster.open({
          text:'El Status se Actualizado correctamente',
          caption: 'Informe',
          type:'success'
        })
        
        this.listar();
      }
    )
  }
}
