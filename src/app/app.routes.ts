import { Routes } from '@angular/router';
import { HomeComponent } from './feature/component/home/home.component';
import { LwxComponent } from './feature/component/lwx/lwx.component';
import { TopComponent } from './feature/component/top/top.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "weather",
    children: [
      {
        path: "LWX",
        component: LwxComponent
      },
      {
        path: "TOP",
        component: TopComponent
      }
    ]
  },
];
