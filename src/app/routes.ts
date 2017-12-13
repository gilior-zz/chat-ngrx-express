import {Route} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';

export const routes:Route[]=[
  {path:'home',component:HomeComponent},
  {path:'about',component:AboutComponent},
  {path:'',pathMatch:'full', redirectTo:'home'}
]
