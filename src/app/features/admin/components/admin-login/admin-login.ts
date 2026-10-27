import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthStaffService, StaffUsuario } from '../../../../core/services';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.html',
  styleUrls: ['./admin-login.scss'],
  standalone: false
})
export class AdminLoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public errorMensaje: string = '';
  public cargando: boolean = false;
  public personalDisponible: StaffUsuario[] = [];
  private returnUrl: string = '/admin/dashboard';

  constructor(
    private fb: FormBuilder,
    private authStaffService: AuthStaffService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Si ya está autenticado, ir directo al panel
    if (this.authStaffService.isAuthenticated()) {
      this.router.navigate(['/admin/dashboard']);
      return;
    }

    this.personalDisponible = this.authStaffService.PERSONAL_AUTORIZADO;
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';

    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required]],
      clave: ['', [Validators.required]]
    });
  }

  public onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.errorMensaje = '';

    const { usuario, clave } = this.loginForm.value;
    const exito = this.authStaffService.login(usuario, clave);
    this.cargando = false;

    if (exito) {
      this.router.navigateByUrl(this.returnUrl);
    } else {
      this.errorMensaje = 'Credenciales no reconocidas. Usa "admin" / "1234" o uno de los accesos directos de médicos abajo.';
    }
  }

  public accesoRapido(staffId: string): void {
    this.authStaffService.loginRapido(staffId);
    this.router.navigateByUrl(this.returnUrl);
  }
}
