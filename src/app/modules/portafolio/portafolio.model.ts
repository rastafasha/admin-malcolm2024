import { CategoriaPortafolio } from "../categoria-portafolio/categoria-portafolio.model";

export class Portafolio {

    id: number;
       title: string;
       description: string;
       introhome: string;
       categorias: CategoriaPortafolio;
       slug: string;
       popup: string;
       youtubeurl: string;
       isFeatured: boolean;
       createdAt: Date;
       updatedAt: Date;
       status?: 'PUBLISHED' | 'PENDING' | 'REJECTED';
       image?: string;
       user_id?: string;
  
  
  }