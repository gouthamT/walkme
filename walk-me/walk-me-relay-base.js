import { Subject, of, fromEvent } from 'rxjs';
import { concatMap, delay, tap, takeUntil, map } from 'rxjs/operators';
import $ from "jquery";

import { TYPE_OF_OBSERVABLE, TYPE_OF_FUNCTION } from './constants';
import css from './css';
import './dndTree.js';

export default class WalkMeRelayBase {

  constructor() {
    let self = this;
    this.sub$ = new Subject();
    this.end$ = new Subject();
    this.shadowHost = document.createElement('section');
    this.shadowHost.id = `shadow-hosted-WalkMe-app`;
    this.modalHolder = document.createElement('div');
    $(document).ready(function () {
      let shadowRoot = self.shadowHost.attachShadow({ mode: 'open' }),
        style = document.createElement('style');
      style.appendChild(document.createTextNode(css));
      shadowRoot.appendChild(style);
      shadowRoot.appendChild(self.modalHolder);
      document.body.appendChild(self.shadowHost);
    });

    this.sub$.pipe(
      takeUntil(this.end$),
      concatMap(obj => {
        if (!obj) { return; }
        switch (obj.type) {

          case TYPE_OF_OBSERVABLE: return obj.delegate();

          case TYPE_OF_FUNCTION: return of(obj.delegate).pipe(delay(obj.delay || 0), tap(() => obj.delegate()));

          default: break;
        }
      })
    ).subscribe();

    /**Global Events */
    fromEvent(window, 'message').pipe(
      map(event => {
        console.log(event);
        if (!event || !event.data || event.origin !== "http://localhost:2079") return;
        return event.data;
      }),
      tap(source => {
        if (!source) return;
        for (var value of source) {
          value && value.target && self[value.target] && self[value.target](...value.arguments);
        }
      })
    ).subscribe();
  }

}