import { Component, inject, Signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { sidebarSignalStore } from '../../../shared/store/sidebar/sidebar.signal-store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [sidebarSignalStore],
})
export class HomeComponent {
  private readonly sidebarSignalStore = inject(sidebarSignalStore);
  $sidebarItem: Signal<string> = this.sidebarSignalStore.project.label;
}
