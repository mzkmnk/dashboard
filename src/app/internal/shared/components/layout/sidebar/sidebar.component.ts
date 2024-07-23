import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [PanelMenuModule, Ripple],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  items: MenuItem[] = [];

  ngOnInit(): void {
    this.items = [
      {
        label: 'Travel Log',
        icon: 'pi pi-bolt',
        items: [
          {
            label: 'Auth',
            icon: '',
            items: [
              {
                label: 'Sign In',
                icon: 'pi pi-code',
              },
              {
                label: 'Sign Up',
              },
            ],
          },
          {
            label: 'Internal',
            items: [
              {
                label: 'Home',
              },
              {
                label: 'Calendar',
              },
            ],
          },
        ],
      },
    ];
  }
}
