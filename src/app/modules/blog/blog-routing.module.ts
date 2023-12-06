import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogAddComponent } from './blog-add/blog-add.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';


const routes: Routes = [
  { path: '', component: BlogComponent, 
      children:[
        { path: 'registro', component: BlogAddComponent},
        
        { path: 'list', component: BlogListComponent},
        { path: 'list/editar/:id', component: BlogEditComponent},
      ]
  },
  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
