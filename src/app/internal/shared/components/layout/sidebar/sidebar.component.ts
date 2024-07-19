import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [PanelMenuModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  items: MenuItem[] = [];

  ngOnInit(): void {
    this.items = [
      {
        label: 'Travel Log',
        items: [
          {
            label: 'Auth',
            items: [
              {
                label: 'Sign In',
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
