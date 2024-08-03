import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../env/environment';
import { Observable } from 'rxjs';
import { SuccessCode } from '../../shared/interfaces/messages.interface';
export interface Sidebar {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: number;
  title: string;
  description: string | null;
  progress: string;
  createdAt: Date;
  updatedAt: Date;
  startedAt: Date;
  endedAt: Date;
  sidebar: string;
  status: string;
}

export interface PostGetSidebarsResponse {
  code: SuccessCode;
  sidebarLabels: Sidebar[];
}

export interface PostGetTasksRequest {
  sidebarLabel: string;
}

export interface PostGetTasksResponse {
  code: SuccessCode;
  tasks: Task[];
}

@Injectable({
  providedIn: 'root',
})
export class InternalAPI {
  private readonly http = inject(HttpClient);

  /**
   * サイドバーを取得する
   */
  postGetSidebars = (): Observable<PostGetSidebarsResponse> => {
    return this.http.post<PostGetSidebarsResponse>(
      `${environment.API.base}/internal/getSidebars`,
      {},
    );
  };

  /**
   * サイドバーに紐づくアイテムを取得する
   * @param request
   */
  postGetTasks = (
    request: PostGetTasksRequest,
  ): Observable<PostGetTasksResponse> => {
    console.log('postgetTaskAPI');
    return this.http.post<PostGetTasksResponse>(
      `${environment.API.base}/internal/getTasks`,
      request,
    );
  };
}
