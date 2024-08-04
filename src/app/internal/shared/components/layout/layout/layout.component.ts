import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SplitterModule } from 'primeng/splitter';

import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet, SplitterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {}
