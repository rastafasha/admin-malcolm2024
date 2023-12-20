import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'builder',
    loadChildren: () =>
      import('./builder/builder.module').then((m) => m.BuilderModule),
  },
  {
    path: 'crafted/pages/profile',
    loadChildren: () =>
      import('../modules/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'crafted/account',
    loadChildren: () =>
      import('../modules/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'crafted/pages/wizards',
    loadChildren: () =>
      import('../modules/wizards/wizards.module').then((m) => m.WizardsModule),
  },
  {
    path: 'delivery',
    loadChildren: () =>
      import('../modules/delivery/delivery.module').then((m) => m.DeliveryModule),
  },
  {
    path: 'crafted/widgets',
    loadChildren: () =>
      import('../modules/widgets-examples/widgets-examples.module').then(
        (m) => m.WidgetsExamplesModule
      ),
  },
  {
    path: 'apps/chat',
    loadChildren: () =>
      import('../modules/apps/chat/chat.module').then((m) => m.ChatModule),
  },
  //fin rutas template
  //rutas mias
  {
    path: 'users',
    loadChildren: () =>
      import('../modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'categorias',
    loadChildren: () =>
      import('../modules/categoria/categoria.module').then((m) => m.CategoriaModule),
  },
  {
    path: 'categoria-portafolio',
    loadChildren: () =>
      import('../modules/categoria-portafolio/categoria-portafolio.module').then((m) => m.CategoriaPortafolioModule),
  },
  {
    path: 'categoria-producto',
    loadChildren: () =>
      import('../modules/categoria-producto/categoria-producto.module').then((m) => m.CategoriaProductoModule),
  },
  {
    path: 'cursos',
    loadChildren: () =>
      import('../modules/course/course.module').then((m) => m.CourseModule),
  },
  {
    path: 'productos',
    loadChildren: () =>
      import('../modules/product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'cupones',
    loadChildren: () =>
      import('../modules/coupon/coupon.module').then((m) => m.CouponModule),
  },
  {
    path: 'descuento',
    loadChildren: () =>
      import('../modules/discount/discount.module').then((m) => m.DiscountModule),
  },
  
  {
    path: 'portafolio',
    loadChildren: () =>
      import('../modules/portafolio/portafolio.module').then((m) => m.PortafolioModule),
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('../modules/blog/blog.module').then((m) => m.BlogModule),
  },
  {
    path: 'correos',
    loadChildren: () =>
      import('../modules/correoysub/correoysub.module').then((m) => m.CorreoysubModule),
  },
  {
    path: 'ventas',
    loadChildren: () =>
      import('../modules/ventas/ventas.module').then((m) => m.VentasModule),
  },
  {
    path: 'tareas',
    loadChildren: () =>
      import('../modules/tareas/tareas.module').then((m) => m.TareasModule),
  },
  //fin rutas mias
  //rutas basicas
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
