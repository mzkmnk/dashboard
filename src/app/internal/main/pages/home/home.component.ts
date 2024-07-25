import { Component, inject, OnInit, Signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { sidebarSignalStore } from '../../../shared/store/sidebar/sidebar.signal-store';
import { sampleTasks, Task } from '../../../data/task.data';
import {
  GridsterComponent,
  GridsterConfig,
  GridsterItemComponent,
} from 'angular-gridster2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, GridsterComponent, GridsterItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly sidebarSignalStore = inject(sidebarSignalStore);
  $sidebarItem: Signal<string> = this.sidebarSignalStore.project.label;

  gridsterOptions: GridsterConfig = {};

  taskData: Task[] = sampleTasks;

  ngOnInit(): void {
    this.gridsterOptions = {
      draggable: {
        // ドラッグ設定
        enabled: true, // ドラッグ許可
      },
      resizable: {
        // リサイズ設定
        enabled: true, // リサイズを許可する
      },
      swap: true, // 入れ替えを許可する
      minCols: 50, // 最小列数
      maxCols: 50, // 最大列数(minCols以上はドラッグで表示される)
      minRows: 50, // 最小行数
      maxRows: 50, // 最大行数(minRows以上はドラッグで表示される)
      // 整列しない(自由)
      // compactType: 'none',
      // リサイズとドラッグでアイテムを押しのける
      pushItems: true,
      // 画面の幅が640px以下でグリッドを解除しアイテムを1列にする
      mobileBreakpoint: 640,
    };
  }
}
