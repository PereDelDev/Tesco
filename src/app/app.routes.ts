import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products/products.component';
import { CareersComponent } from './careers/careers.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

export const routes: Routes = [

    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: LandingPageComponent },
    { path: 'about', component: AboutComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'careers', component: CareersComponent },
    { path: 'contact', component: ContactUsComponent }
];
