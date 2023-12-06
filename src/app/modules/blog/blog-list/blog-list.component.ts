import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { PortafolioDeleteComponent } from '../../portafolio/portafolio-delete/portafolio-delete.component';
import { BlogService } from '../services/blog.service';
import { BlogDeleteComponent } from '../blog-delete/blog-delete.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {

  BLOGS:any = [];
  isLoading: any = null;
  search:any= null;
  state:any= null;



  constructor(
    public blogService: BlogService,
    public modalService: NgbModal,
    public toaster: Toaster,
    private location: Location,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.isLoading = this.blogService.isLoading$;
    this.listarCursos();
  }
  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  listarCursos(){
    this.blogService.listBlogs(this.search, this.state).subscribe(
      (res:any)=>{
        // console.log(res);
        this.BLOGS = res.blogs.data;
        console.log(this.BLOGS);
      }
    )
  }

  eliminarBlog(blog:any){
    const modalRef = this.modalService.open(BlogDeleteComponent,{centered: true, size:'md'})
    modalRef.componentInstance.blog = blog;
    // recibe el usuario editado por medio de ouput desde editar
    modalRef.componentInstance.blogD.subscribe((res:any)=>{
      let INDEX =  this.BLOGS.findIndex((item:any) => item.id == res.id)
      this.BLOGS.splice(INDEX, 1);
      this.listarCursos();
    })

  }

  cambiarStatus(blog:any){
    this.blogService.updateStatus(blog).subscribe(
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
