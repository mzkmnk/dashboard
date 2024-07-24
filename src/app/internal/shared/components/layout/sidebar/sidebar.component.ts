import { Component, effect, inject } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { Ripple } from 'primeng/ripple';
import { Button } from 'primeng/button';
import { sidebarData, SidebarDataModel } from '../../../../data/sidebar.data';
import { sidebarSignalStore } from '../../../store/sidebar/sidebar.signal-store';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [PanelMenuModule, Ripple, Button],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  providers: [sidebarSignalStore],
})
export class SidebarComponent {
  private readonly sidebarSignalStore = inject(sidebarSignalStore);

  sidebarData: SidebarDataModel[] = sidebarData;

  constructor() {
    //fixme labelはstringだが存在するlabelの型に変更する。
    this.sidebarSignalStore.onClickSidebar({ label: 'travel log' });
  }

  /**
   * @param {number} idx - クリックされたサイドバーのアイテム
   * @returns {void}
   *
   * @description
   * サイドバーがクリックされた時の処理を行う関数
   */
  onClickSidebarItem = (idx: number): void => {
    this.sidebarData.map((_, index: number) => {
      this.sidebarData[index].clicked = index == idx;
      if (idx === index) {
        this.sidebarSignalStore.onClickSidebar({
          label: this.sidebarData[index].label,
        });
      }
    });
  };
}
