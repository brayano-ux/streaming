import { Component, HostListener, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { TokenService } from '../../core/services/token';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout implements OnInit {
  private tokenService = inject(TokenService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  user = this.tokenService.getUser();

  navItems = [
    { label: 'Tableau de bord', path: '/dashboard', icon: 'fa-solid fa-chart-line' },
    { label: 'Élèves', path: '/dashboard/eleves', icon: 'fa-solid fa-graduation-cap' },
    { label: 'Inscriptions', path: '/dashboard/inscriptions', icon: 'fa-solid fa-file-signature' },
    {label:'Matieres',path:'/dashboard/matieres'},
    { label: 'Classes', path: '/dashboard/classes', icon: 'fa-solid fa-school' },
    { label: 'Enseignants', path: '/dashboard/enseignants', icon: 'fa-solid fa-chalkboard-user' },
    { label: 'Notes', path: '/dashboard/notes', icon: 'fa-solid fa-pen-to-square' },
    { label: 'Paiements', path: '/dashboard/paiements', icon: 'fa-solid fa-credit-card' },
    { label: 'Depenses', path: '/dashboard/depenses', icon: 'fa-solid fa-money-bill-wave' },
    { label: 'Recettes', path: '/dashboard/recettes', icon: 'fa-solid fa-wallet' },
    { label: 'Bulletins', path: '/dashboard/bulletins', icon: 'fa-solid fa-wallet' }

  ];

  sidebarOpen = false;
  userMenuOpen = false;
  mobileView = false; // Valeur par défaut pour le SSR

  ngOnInit() {
    // La fenêtre n'existe que côté navigateur
    if (isPlatformBrowser(this.platformId)) {
      this.mobileView = window.innerWidth < 768;
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    if (this.mobileView) {
      this.sidebarOpen = false;
    }
  }

  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
  }

  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.mobileView = window.innerWidth < 768;
      if (!this.mobileView) {
        this.sidebarOpen = false;
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative') && this.userMenuOpen) {
      this.userMenuOpen = false;
    }
  }

  logout() {
    this.tokenService.clear();
    this.router.navigate(['/login']);
  }
}
