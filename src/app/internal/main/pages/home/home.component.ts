import { Component, inject, OnInit, Signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { sidebarSignalStore } from '../../../shared/store/sidebar/sidebar.signal-store';
import { Group } from '../../../data/task.data';
import {
  GridsterComponent,
  GridsterConfig,
  GridsterItemComponent,
} from 'angular-gridster2';
import {
  MainSignalStore,
  ProjectSignalStoreModel,
} from '../../store/main.signal-store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, GridsterComponent, GridsterItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [MainSignalStore],
})
export class HomeComponent implements OnInit {
  private readonly sidebarSignalStore = inject(sidebarSignalStore);
  private readonly mainSignalStore = inject(MainSignalStore);
  $sidebarItem: Signal<string> = this.sidebarSignalStore.project.label;
  $tasks: Signal<ProjectSignalStoreModel> = this.mainSignalStore.data;
  groups: Group[] = ['TODO', 'IN PROGRESS', 'COMPLETED'];

  gridsterOptions: GridsterConfig = {};

  constructor() {
    this.mainSignalStore.taskDataLoad();
  }
  ngOnInit(): void {
    this.gridsterOptions = {
      // ドラッグ設定
      draggable: {
        // ドラッグ許可
        enabled: true,
      },
      // リサイズ設定
      resizable: {
        // リサイズを許可する
        enabled: true,
      },
      // 入れ替えを許可する
      swap: true,
      // 最小列数
      minCols: 50,
      // 最大列数(minCols以上はドラッグで表示される)
      maxCols: 50,
      // 最小行数
      minRows: 50,
      // 最大行数(minRows以上はドラッグで表示される)
      maxRows: 50,
      // 整列しない(自由)
      compactType: 'none',
      // リサイズとドラッグでアイテムを押しのける
      pushItems: true,
      // 画面の幅が640px以下でグリッドを解除しアイテムを1列にする
      mobileBreakpoint: 640,
    };
  }
}
