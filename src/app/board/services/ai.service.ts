import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Color } from '../pieces/piece';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private readonly aiWorker;

  constructor() {
    if (typeof Worker != 'undefined') {
      this.aiWorker = new Worker('../worker/ai.worker', { type: 'module' });
    }
  }

  public calculateBestMove(fen: string, moveColor: Color, depth: number): Observable<string> {
    const response$: Subject<string> = new Subject();
    this.aiWorker.onmessage = ({ data }) => {
      response$.next(data);
      response$.complete();
    }
    this.aiWorker.postMessage({
      fen,
      moveColor,
      depth
    });

    return response$.asObservable();
  }
}
