import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa el ReactiveFormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { RegistrarComponent } from './COMPONENTES/registrar/registrar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IniciarSesionComponent } from './COMPONENTES/iniciar-sesion/iniciar-sesion.component';
import { WelcomeAdminComponent } from './COMPONENTES/admin/welcome-admin/welcome-admin.component';
import { DashboardComponent } from './COMPONENTES/admin/dashboard/dashboard.component';
import { ProfileAdminComponent } from './COMPONENTES/admin/profile-admin/profile-admin.component';
import { ViewCategoriasComponent } from './COMPONENTES/admin/view-categorias/view-categorias.component';
import { AddCategoriaComponent } from './COMPONENTES/admin/add-categoria/add-categoria.component';
import { ViewExamenesComponent } from './COMPONENTES/admin/view-examenes/view-examenes.component';
import { AddExamenComponent } from './COMPONENTES/admin/add-examen/add-examen.component';
import { AddPreguntaComponent } from './COMPONENTES/admin/add-pregunta/add-pregunta.component';
import { ViewExamenPreguntasComponent } from './COMPONENTES/admin/view-examen-preguntas/view-examen-preguntas.component';
import { ViewUsuariosComponent } from './COMPONENTES/admin/view-usuarios/view-usuarios.component';
import { ViewPerfilUsuarioComponent } from './COMPONENTES/admin/view-perfil-usuario/view-perfil-usuario.component';
import { SidebarRComponent } from './COMPONENTES/reclutador/sidebar-r/sidebar-r.component';
import { DashboardRComponent } from './COMPONENTES/reclutador/dashboard-r/dashboard-r.component';
import { WelcomeReclutadorComponent } from './COMPONENTES/reclutador/welcome-reclutador/welcome-reclutador.component';
import { ProfileRComponent } from './COMPONENTES/reclutador/profile-r/profile-r.component';
import { ViewPerfilUsuarioRComponent } from './COMPONENTES/reclutador/view-perfil-usuario-r/view-perfil-usuario-r.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatosPersonalesComponent } from './COMPONENTES/datos-personales/datos-personales.component';
import { HerramientasTecnologiasComponent } from './COMPONENTES/herramientas-tecnologias/herramientas-tecnologias.component';
import { ToastrModule } from 'ngx-toastr';
import { InformacionLaboralComponent } from './COMPONENTES/informacion-laboral/informacion-laboral.component';
import { InformacionAcademicaComponent } from './COMPONENTES/informacion-academica/informacion-academica.component';
import { CargoUsuarioComponent } from './COMPONENTES/cargo-usuario/cargo-usuario.component';
import { AppNavbarComponent } from './COMPONENTES/shared/app-navbar/app-navbar.component';
import { AppSidebarComponent } from './COMPONENTES/shared/app-sidebar/app-sidebar.component';
import { AppFooterComponent } from './COMPONENTES/shared/app-footer/app-footer.component';
import { SidebarUserComponent } from './COMPONENTES/shared/sidebar-user/sidebar-user.component';
import { TableHerramientasComponent } from './COMPONENTES/shared/table-herramientas/table-herramientas.component';
import { SidebarUserDeskComponent } from './COMPONENTES/shared/sidebar-userdesk/sidebar-userdesk.component';
import { AppSidebar2Component } from './COMPONENTES/shared/app-sidebar2/app-sidebar2.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { NumericOnlyDirective } from './directives/numeric-only.directive';
import { ValidarMailComponent } from './COMPONENTES/validar-mail/validar-mail.component';
import { PeticionRestaurarPassComponent } from './COMPONENTES/peticion-restaurar-pass/peticion-restaurar-pass.component';
import { RestaurarPassComponent } from './COMPONENTES/restaurar-pass/restaurar-pass.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserDashboardComponent } from './COMPONENTES/pages/user/user-dashboard/user-dashboard.component';
import { SidebarComponent as UserSidebar } from './COMPONENTES/pages/user/sidebar/sidebar.component';
import { LoadExamenComponent } from './COMPONENTES/pages/user/load-examen/load-examen.component';
import { InstruccionesComponent } from './COMPONENTES/pages/user/instrucciones/instrucciones.component';
import { StartComponent } from './COMPONENTES/pages/user/start/start.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import { SidebarRResponsiveComponent } from './COMPONENTES/reclutador/sidebar-r-responsive/sidebar-r-responsive.component';
import { MatSortModule } from '@angular/material/sort';
import { AddUsuariosComponent } from './COMPONENTES/admin/add-usuarios/add-usuarios.component';
import { EstadisticasComponent } from './COMPONENTES/reclutador/estadisticas/estadisticas.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatSliderModule } from '@angular/material/slider';
import { ExamenModalComponent } from './COMPONENTES/admin/examen-modal/examen-modal.component';
import {TextFieldModule} from '@angular/cdk/text-field';
import { AdvertenciaEliminarComponent } from './COMPONENTES/shared/advertencia-eliminar/advertencia-eliminar.component';
import { EditUserDialogComponent } from './COMPONENTES/admin/view-usuarios/edit-user-dialog/edit-user-dialog.component';
import { CaracterOnlyDirective } from './directives/caracter-only-directive';
import { MatDialogModule } from '@angular/material/dialog';
import { WelcomeEntrevistadorComponent } from './COMPONENTES/entrevistador/welcome-entrevistador/welcome-entrevistador.component';
import { DashboardEComponent } from './COMPONENTES/entrevistador/dashboard-e/dashboard-e.component';
import { SidebarEComponent } from './COMPONENTES/entrevistador/sidebar-e/sidebar-e.component';
import { ObservacionesComponent } from './COMPONENTES/entrevistador/observaciones/observaciones.component';
import { SidebarEResponsiveComponent } from './COMPONENTES/entrevistador/sidebar-e-responsive/sidebar-e-responsive.component';
import { NavbarResponsiveExamenComponent } from './COMPONENTES/pages/user/navbarexamen-responsive/navbarexamen-responsive.component';
import { AñadirEstudioComponent } from './COMPONENTES/shared/añadir-estudio/añadir-estudio.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { EditarAcademicaComponent } from './COMPONENTES/shared/editar-academica/editar-academica.component';
import { CerrarSesionComponent } from './COMPONENTES/shared/cerrar-sesion/cerrar-sesion.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { UploadFilesComponent } from './COMPONENTES/upload-files/upload-files.component';
import { AddLaboralComponent } from './COMPONENTES/shared/add-laboral/add-laboral.component';
import { EditLaboralComponent } from './COMPONENTES/shared/edit-laboral/edit-laboral.component';
import { ViewFilesComponent } from './COMPONENTES/view-files/view-files.component';
import { ViewPerfilUsuarioEComponent } from './COMPONENTES/entrevistador/view-perfil-usuario-e/view-perfil-usuario-e.component';
import { CurrencyFormatPipe } from './COMPONENTES/cargo-usuario/currency-format.pipe';
import {MatStepperModule} from '@angular/material/stepper';
import { EditPerfilUsuarioRComponent } from './COMPONENTES/reclutador/edit-perfil-usuario-r/edit-perfil-usuario-r.component';
import { SendMailToUsersDialogueComponent } from './COMPONENTES/reclutador/send-mail-to-users-dialogue/send-mail-to-users-dialogue.component';
import { ViewUsuariosRComponent } from './COMPONENTES/reclutador/view-usuarios-r/view-usuarios-r.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrarComponent,
    IniciarSesionComponent,
    WelcomeAdminComponent,
    DashboardComponent,
    ProfileAdminComponent,
    ViewCategoriasComponent,
    AddExamenComponent,
    ViewUsuariosComponent,
    ViewPerfilUsuarioComponent,
    SidebarRComponent,
    DashboardRComponent,
    WelcomeReclutadorComponent,
    ProfileRComponent,
    ViewPerfilUsuarioRComponent,
    DatosPersonalesComponent,
    HerramientasTecnologiasComponent,
    InformacionLaboralComponent,
    InformacionAcademicaComponent,
    CargoUsuarioComponent,
    AppNavbarComponent,
    EditPerfilUsuarioRComponent,
    AppSidebarComponent,
    CerrarSesionComponent,
    AppSidebar2Component,
    AppFooterComponent,
    SidebarUserDeskComponent,
    TableHerramientasComponent,
    ValidarMailComponent,
    PeticionRestaurarPassComponent,
    RestaurarPassComponent,
    UserDashboardComponent,
    AddCategoriaComponent,
    ViewExamenesComponent,
    EditUserDialogComponent,
    CurrencyFormatPipe,
    ViewExamenPreguntasComponent,
    CaracterOnlyDirective,
    AddPreguntaComponent,
    UserSidebar,
    LoadExamenComponent,
    InstruccionesComponent,
    StartComponent,
    SidebarUserComponent,
    SidebarRResponsiveComponent,
    ExamenModalComponent,
    AddUsuariosComponent,
    EstadisticasComponent,
    AdvertenciaEliminarComponent,
    CaracterOnlyDirective,
    CurrencyFormatPipe,
    AñadirEstudioComponent,
    EditarAcademicaComponent,
    UploadFilesComponent,
    EditLaboralComponent,
    ViewFilesComponent,
    AddLaboralComponent,
    WelcomeEntrevistadorComponent,
    DashboardEComponent,
    SidebarEComponent,
    ObservacionesComponent,
    SidebarEResponsiveComponent,
    ViewPerfilUsuarioEComponent,
    NumericOnlyDirective,
    ViewUsuariosRComponent,
    SendMailToUsersDialogueComponent,
  ],
  imports: [
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    MatBottomSheetModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatMenuModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatListModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatSortModule,
    MatNativeDateModule,
    HttpClientModule,
    MatDialogModule,
    MatTabsModule,
    NavbarResponsiveExamenComponent,
    MatSliderModule,
    RouterOutlet,
    MatChipsModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    TextFieldModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center'
    }),

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
