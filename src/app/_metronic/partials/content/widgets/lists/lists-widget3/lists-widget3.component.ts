import { Component, OnInit } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { TareaService } from 'src/app/modules/tareas/service/tarea.service';

@Component({
  selector: 'app-lists-widget3',
  templateUrl: './lists-widget3.component.html',
})
export class ListsWidget3Component implements OnInit{
  public todos;
  isLoading:any;
  tareaSelected:any =null;

  constructor(
    private tareaService : TareaService,
    public toaster: Toaster,
  ) {}

  ngOnInit(): void {
    this.isLoading = this.tareaService.isLoading$;
    this.listar();
  }

  listar(){
    this.tareaService.list().subscribe(
      (resp:any) =>{
        this.todos = resp.todos.data;
        // console.log(this.deliveries);

      }
    );
  }

  selectedTarea(todo:any){
    this.tareaSelected = todo
  }

  back(){
    this.tareaSelected = null;
    // this.rating = 0;
    // this.message = null;
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
