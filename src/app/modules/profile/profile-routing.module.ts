import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { DocumentsComponent } from './documents/documents.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProfileComponent } from './profile.component';
import { ConnectionsComponent } from './connections/connections.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: 'overview/:id',
        component: OverviewComponent,
      },
      {
        path: 'projects/:id',
        component: ProjectsComponent,
      },
      {
        path: 'campaigns/:id',
        component: CampaignsComponent,
      },
      {
        path: 'documents/:id',
        component: DocumentsComponent,
      },
      {
        path: 'connections/:id',
        component: ConnectionsComponent,
      },
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview/:id', component: OverviewComponent, },
      { path: '**', redirectTo: 'overview', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
