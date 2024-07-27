import { Component, inject, Signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { sidebarSignalStore } from '../../../shared/store/sidebar/sidebar.signal-store';
import { Group } from '../../../data/task.data';
import {
  MainSignalStore,
  ProjectSignalStoreModel,
} from '../../store/main.signal-store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [MainSignalStore],
})
export class HomeComponent {
  private readonly sidebarSignalStore = inject(sidebarSignalStore);
  private readonly mainSignalStore = inject(MainSignalStore);
  $sidebarItem: Signal<string> = this.sidebarSignalStore.project.label;
  $tasks: Signal<ProjectSignalStoreModel> = this.mainSignalStore.data;
  foo: string = '';
  groups: Group[] = ['TODO', 'IN PROGRESS', 'COMPLETED'];

  constructor() {
    this.mainSignalStore.taskDataLoad();
  }
}
