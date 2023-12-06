import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog-delete',
  templateUrl: './blog-delete.component.html',
  styleUrls: ['./blog-delete.component.scss']
})
export class BlogDeleteComponent implements OnInit {

  
  @Input() blog:any; //recibe la data
  @Output() blogD: EventEmitter<any>  = new EventEmitter();// envia la data

  isLoading:any;

  constructor(
    public toaster: Toaster,
    public modal: NgbActiveModal,
    public blogService: BlogService,
  ) { }

  ngOnInit(): void {
    this.modal.dismiss;
    this.isLoading = this.blogService.isLoading$;
  }

  eliminar(){
    this.blogService.deleteBlog(this.blog.id).subscribe(
      (res:any)=>{
        this.blogD.emit('');//envia la data borrado del hijo al padre como borrado
        this.modal.dismiss();
        // window.location.reload();
      }
    )
  }
}
