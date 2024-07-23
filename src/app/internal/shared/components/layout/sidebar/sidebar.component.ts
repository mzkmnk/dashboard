import { Component } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { Ripple } from 'primeng/ripple';
import { Button } from 'primeng/button';
import { sidebarData, SidebarDataModel } from '../../../../data/sidebar.data';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [PanelMenuModule, Ripple, Button],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  sidebarData: SidebarDataModel[] = sidebarData;

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
    });
  };
}
